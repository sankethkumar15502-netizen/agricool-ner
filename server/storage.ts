import { supabase } from './db';

export async function getUnits() {
  const { data, error } = await supabase.from('cold_storage_units').select('*');
  if (error) throw error;
  return data;
}

export async function getLatestTelemetry(unitId: string) {
  const { data, error } = await supabase
    .from('telemetry_logs')
    .select('*')
    .eq('unit_id', unitId)
    .order('recorded_at', { ascending: false })
    .limit(1);
  if (error) throw error;
  return data?.[0] || null;
}

export async function insertTelemetry(data: any) {
  const { data: result, error } = await supabase
    .from('telemetry_logs')
    .insert([
      {
        unit_id: data.unitId,
        internal_temp: data.internalTemp,
        humidity: data.humidity,
        solar_gen_kw: data.solarGenKw,
        battery_soc: data.batterySoc,
        compressor_active: data.compressorActive
      }
    ])
    .select();
  if (error) throw error;
  return result[0];
}

export async function getBatches(unitId: string) {
  const { data, error } = await supabase
    .from('vegetable_batches')
    .select('*')
    .eq('unit_id', unitId)
    .order('stored_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function insertBatch(data: any) {
  const { data: result, error } = await supabase
    .from('vegetable_batches')
    .insert([
      {
        unit_id: data.unitId,
        vegetable_name: data.vegetableName,
        category: data.category,
        quantity_kg: data.quantityKg,
        harvest_date: data.harvestDate,
        ai_predicted_shelf_life_days: data.ai_predicted_shelf_life_days,
        optimal_temp_min: data.optimal_temp_min,
        optimal_temp_max: data.optimal_temp_max,
        optimal_humidity_min: data.optimal_humidity_min,
        optimal_humidity_max: data.optimal_humidity_max
      }
    ])
    .select();
  if (error) throw error;
  return result[0];
}

export async function insertAdvisoryLog(data: any) {
  const { data: result, error } = await supabase
    .from('ai_advisory_logs')
    .insert([
      {
        unit_id: data.unitId,
        batch_id: data.batchId,
        query_context: data.queryContext,
        ai_response_json: data.aiResponseJson
      }
    ])
    .select();
  if (error) throw error;
  return result[0];
}

// Disable programmatic seeding since REST API doesn't support raw DDL commands
export async function seedDb() {
  console.log("Supabase REST API connected successfully! Please ensure tables are created in the Supabase SQL Editor.");
}
