import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const supabase = createClient();

  const { data: users, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const supabase = createClient();
  const json = await request.json();

  // In a real application, you'd handle user registration/creation securely,
  // possibly involving Supabase Auth or a secure admin process.
  // For this example, we'll directly insert into a 'users' table.
  const { data: newUser, error } = await supabase
    .from('users')
    .insert([json])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(newUser[0], { status: 201 });
} 