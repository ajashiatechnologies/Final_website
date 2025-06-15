import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = supabaseAdmin;

  const { data: inventory, error } = await supabase
    .from('inventory')
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

  return NextResponse.json(inventory);
}

export async function POST(request: Request) {
  const supabase = supabaseAdmin;
  const json = await request.json();

  const { data: newInventoryItem, error } = await supabase
    .from('inventory')
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

  return NextResponse.json(newInventoryItem[0], { status: 201 });
} 