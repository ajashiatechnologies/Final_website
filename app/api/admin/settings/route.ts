import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  const supabase = supabaseAdmin;

  // For simplicity, we'll use a single row in a 'settings' table.
  // In a real application, you might have different types of settings
  // or a more complex configuration management system.
  const { data: settings, error } = await supabase
    .from('settings')
    .select('*')
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is 'No rows found'
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(settings || {}); // Return empty object if no settings found
}

export async function PUT(request: Request) {
  const supabase = supabaseAdmin;
  const json = await request.json();

  // Assuming settings are stored in a single row with a known ID or unique key
  // For this example, let's assume there's always one settings row (id=1)
  const { data: updatedSettings, error } = await supabase
    .from('settings')
    .update(json)
    .eq('id', 1) // Assuming a fixed ID for the settings row
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(updatedSettings[0]);
} 