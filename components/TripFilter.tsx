'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { trips } from '@/lib/trips';
export default function TripFilter() {
  const router = useRouter(); const params = useSearchParams(); const current = params.get('trip') ?? 'all';
  return <div className="filter-controls"><label htmlFor="trip-filter">Filter by trip</label><select id="trip-filter" value={current} onChange={e => router.push(`/admin?trip=${encodeURIComponent(e.target.value)}`)}><option value="all">All trips</option>{trips.map(t => <option value={t.id} key={t.id}>{t.name}</option>)}</select></div>;
}
