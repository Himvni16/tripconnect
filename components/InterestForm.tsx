'use client';
import { useState } from 'react';
import { trips } from '@/lib/trips';

export default function InterestForm() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus(''); setBusy(true);
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/interests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.');
      form.reset(); setStatus('Thanks! Your school’s interest has been recorded.');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  }
  return <form className="interest-form" onSubmit={submit}>
    <div className="form-title"><span>INTEREST FORM</span><span>~ 2 MIN</span></div>
    <div className="field-row"><label>Teacher’s full name<input name="teacher_name" autoComplete="name" required minLength={2} maxLength={100} placeholder="e.g. Priya Sharma" /></label><label>School name<input name="school_name" required minLength={2} maxLength={160} placeholder="Your school" /></label></div>
    <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@school.edu" /></label>
    <label>Phone number <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} pattern="[+0-9() .-]{7,30}" placeholder="+91 98765 43210" /></label>
    <label>Which trip are you interested in?<select name="trip_id" required defaultValue=""><option value="" disabled>Select a trip</option>{trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
    <label>Approximate number of students<input name="student_count" type="number" required min="1" max="10000" step="1" placeholder="e.g. 45" /></label>
    <button className="submit-button" disabled={busy} type="submit">{busy ? 'Sending…' : 'Submit interest'} <span>↗</span></button>
    <p className="form-foot">Your details will only be used to follow up about school trips.</p>
    {status && <p className={status.startsWith('Thanks') ? 'status success' : 'status error'} role="status">{status}</p>}
  </form>;
}
