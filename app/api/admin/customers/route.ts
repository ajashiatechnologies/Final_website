import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = supabaseAdmin;

  const { data: customers, error } = await supabase
    .from('customers')
    .select(`
      *,
      orders (
        id,
        order_date,
        total_amount
      )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin;
  const json = await request.json();

  const { data: newCustomer, error } = await supabase
    .from('customers')
    .insert([json])
    .select(`
      *,
      orders (
        id,
        order_date,
        total_amount
      )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(newCustomer[0], { status: 201 });
} 