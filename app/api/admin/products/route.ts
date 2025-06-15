import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = supabaseAdmin;

  const { data: products, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin;
  const json = await request.json();

  const { data: newProduct, error } = await supabase
    .from('products')
    .insert([json])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(newProduct[0], { status: 201 });
} 