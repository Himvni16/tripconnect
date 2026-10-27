import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { trips } from '@/lib/trips';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+0-9() .-]{7,30}$/;
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Please submit a valid form.' }, { status: 400 }); }
  const teacher_name = typeof body.teacher_name === 'string' ? body.teacher_name.trim() : '';
  const school_name = typeof body.school_name === 'string' ? body.school_name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const trip_id = typeof body.trip_id === 'string' ? body.trip_id : '';
  const student_count = typeof body.student_count === 'string' || typeof body.student_count === 'number' ? Number(body.student_count) : NaN;
  if (teacher_name.length < 2 || teacher_name.length > 100) return NextResponse.json({ error: 'Enter a name between 2 and 100 characters.' }, { status: 400 });
  if (school_name.length < 2 || school_name.length > 160) return NextResponse.json({ error: 'Enter a school name between 2 and 160 characters.' }, { status: 400 });
  if (email.length > 254 || !emailPattern.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  if (phone && !phonePattern.test(phone)) return NextResponse.json({ error: 'Enter a valid phone number or leave it blank.' }, { status: 400 });
  if (!trips.some(t => t.id === trip_id)) return NextResponse.json({ error: 'Choose one of the listed trips.' }, { status: 400 });
  if (!Number.isInteger(student_count) || student_count < 1 || student_count > 10000) return NextResponse.json({ error: 'Student count must be a whole number between 1 and 10,000.' }, { status: 400 });
  const supabase = await createClient();
  const { error } = await supabase.from('trip_interests').insert({ teacher_name, school_name, email, phone: phone || null, trip_id, student_count });
  if (error) { console.error('Could not save trip interest:', error.message); return NextResponse.json({ error: 'We could not save your response right now. Please try again later.' }, { status: 500 }); }
  return NextResponse.json({ ok: true }, { status: 201 });
}
