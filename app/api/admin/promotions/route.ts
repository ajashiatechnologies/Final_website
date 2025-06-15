import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = supabaseAdmin;

  const { data: promotions, error } = await supabase
    .from('promotions')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(promotions);
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin;
  const json = await request.json();

  const { data: newPromotion, error } = await supabase
    .from('promotions')
    .insert([json])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(newPromotion[0], { status: 201 });
} 