import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;

  const { data: vendor, error } = await supabase
    .from('vendors')
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

  if (!vendor) {
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
  }

  return NextResponse.json(vendor);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;
  const json = await request.json();

  const { data: updatedVendor, error } = await supabase
    .from('vendors')
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

  return NextResponse.json(updatedVendor);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;

  const { error } = await supabase
    .from('vendors')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
} 