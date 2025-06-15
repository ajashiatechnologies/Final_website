import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;

  const { data: customer, error } = await supabase
    .from('customers')
    .select(`
      *,
      orders (
        id,
        order_date,
        total_amount
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!customer) {
    return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
  }

  return NextResponse.json(customer);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;
  const json = await request.json();

  const { data: updatedCustomer, error } = await supabase
    .from('customers')
    .update(json)
    .eq('id', id)
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

  return NextResponse.json(updatedCustomer);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = supabaseAdmin;
  const { id } = params;

  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
} 