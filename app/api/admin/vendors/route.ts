import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = supabaseAdmin;

  const { data: vendors, error } = await supabase
    .from('vendors')
    .select(`
      *,
      products (
        id,
        name,
        sku
      )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(vendors);
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin;
  const json = await request.json();

  const { data: newVendor, error } = await supabase
    .from('vendors')
    .insert([json])
    .select(`
      *,
      products (
        id,
        name,
        sku
      )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(newVendor[0], { status: 201 });
} 