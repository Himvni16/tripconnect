import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient, isAdminEmail } from '@/lib/supabase/admin';
import { trips, getTripName } from '@/lib/trips';
import { signOut } from './actions';
import TripFilter from '@/components/TripFilter';

type Search = { trip?: string };
type Interest = { id: string; teacher_name: string; school_name: string; email: string; phone: string | null; trip_id: string; student_count: number; created_at: string };
export default async function AdminPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { trip = 'all' } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  if (!isAdminEmail(user.email)) redirect('/login?error=This%20account%20is%20not%20authorised%20for%20admin%20access');
  const adminDb = createAdminClient();
  let query = adminDb.from('trip_interests').select('*').order('created_at', { ascending: false });
  if (trips.some(t => t.id === trip)) query = query.eq('trip_id', trip);
  const [{ data, error }, { data: allData }] = await Promise.all([
    query,
    adminDb.from('trip_interests').select('trip_id, student_count'),
  ]);
  const interests = (data ?? []) as Interest[];
  const totals = trips.map(t => ({ ...t, submissions: (allData ?? []).filter((r: { trip_id: string }) => r.trip_id === t.id).length, students: (allData ?? []).filter((r: { trip_id: string }) => r.trip_id === t.id).reduce((sum: number, r: { student_count: number }) => sum + r.student_count, 0) }));
  return <main className="admin-page"><header className="admin-header"><Link className="brand" href="/">TripConnect</Link><div className="admin-user"><span>{user.email}</span><form action={signOut}><button className="signout-button">Sign out ↗</button></form></div></header><section className="admin-content"><p className="eyebrow">OVERVIEW / ADMIN</p><h1>Trip interest dashboard.</h1><p className="muted">Review school enquiries and estimate student participation.</p>
    <div className="stats-grid">{totals.map((t, i) => <article className={`stat-card stat-${i + 1}`} key={t.id}><p>{t.name}</p><strong>{t.students.toLocaleString('en-IN')}</strong><span>estimated students</span><div className="stat-bottom">{t.submissions} {t.submissions === 1 ? 'submission' : 'submissions'}</div></article>)}</div>
    <div className="table-heading"><div><h2>All submissions</h2><p>{interests.length} {interests.length === 1 ? 'record' : 'records'} shown</p></div><TripFilter /></div>
    {error ? <p className="status error">Could not load submissions. Check the Supabase table and Row Level Security policies.</p> : <div className="table-wrap"><table><thead><tr><th>Teacher</th><th>School</th><th>Contact</th><th>Trip</th><th>Students</th><th>Submitted</th></tr></thead><tbody>{interests.map(row => <tr key={row.id}><td>{row.teacher_name}</td><td>{row.school_name}</td><td><a href={`mailto:${row.email}`}>{row.email}</a>{row.phone && <small>{row.phone}</small>}</td><td>{getTripName(row.trip_id)}</td><td>{row.student_count}</td><td>{new Date(row.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td></tr>)}{interests.length === 0 && <tr><td className="empty" colSpan={6}>No submissions yet for this selection.</td></tr>}</tbody></table></div>}
    <p className="admin-footnote">Trip totals always include all submissions; the filter only changes the table below.</p></section></main>;
}
