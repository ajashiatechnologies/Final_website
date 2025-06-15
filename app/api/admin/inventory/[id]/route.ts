import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;

  const { data: inventoryItem, error } = await supabase
    .from('inventory')
    .select(`
      *,
      products (
        id,
        name,
        sku
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!inventoryItem) {
    return NextResponse.json({ error: 'Inventory item not found' }, { status: 404 });
  }

  return NextResponse.json(inventoryItem);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;
  const json = await request.json();

  const { data: updatedInventoryItem, error } = await supabase
    .from('inventory')
    .update(json)
    .eq('id', id)
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

  return NextResponse.json(updatedInventoryItem);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;

  const { error } = await supabase
    .from('inventory')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
} 