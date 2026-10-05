import express from 'express';
import { getUnits, getLatestTelemetry, insertTelemetry, getBatches, insertBatch, insertAdvisoryLog } from './storage';
import { insertBatchSchema, telemetryPayloadSchema, advisoryQuerySchema } from '../shared/schema';
import { getAiAdvisory } from './services/gemini';

export const registerRoutes = (app: express.Express) => {
  app.get('/api/units', async (req, res) => {
    try {
      const units = await getUnits();
      res.json(units);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/telemetry/latest/:unitId', async (req, res) => {
    try {
      const { unitId } = req.params;
      const data = await getLatestTelemetry(unitId);
      if (!data) return res.status(404).json({ error: 'Not found' });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/telemetry', async (req, res) => {
    try {
      const parsed = telemetryPayloadSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error });
      const record = await insertTelemetry(parsed.data);
      res.json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/batches/:unitId', async (req, res) => {
    try {
      const { unitId } = req.params;
      const batches = await getBatches(unitId);
      res.json(batches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/batches', async (req, res) => {
    try {
      const parsed = insertBatchSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error });
      
      // Attempt to get AI advisory for optimal conditions on batch creation
      // We will mock current conditions for initial registration if not provided
      const advisory = await getAiAdvisory({
        vegetableName: parsed.data.vegetableName,
        quantityKg: parsed.data.quantityKg,
        harvestDate: parsed.data.harvestDate,
        currentTemp: 10,
        currentHumidity: 90,
        batterySoc: 100
      });

      const batchData = {
        ...parsed.data,
        ai_predicted_shelf_life_days: advisory?.predictedShelfLifeDays || null,
        optimal_temp_min: advisory?.optimalTempMin || null,
        optimal_temp_max: advisory?.optimalTempMax || null,
        optimal_humidity_min: advisory?.optimalHumidityMin || null,
        optimal_humidity_max: advisory?.optimalHumidityMax || null,
      };

      const record = await insertBatch(batchData);
      res.json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.post('/api/ai/advisory', async (req, res) => {
    try {
      const parsed = advisoryQuerySchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error });
      
      // In real scenario, we'd fetch actual telemetry and batch details to feed to AI
      const advisory = await getAiAdvisory({
        vegetableName: req.body.vegetableName || "Mixed",
        quantityKg: req.body.quantityKg || 100,
        harvestDate: new Date().toISOString().split('T')[0],
        currentTemp: req.body.currentTemp || 12,
        currentHumidity: req.body.currentHumidity || 85,
        batterySoc: req.body.batterySoc || 50
      });

      await insertAdvisoryLog({
        unitId: parsed.data.unitId,
        batchId: parsed.data.batchId,
        queryContext: parsed.data.queryContext,
        aiResponseJson: JSON.stringify(advisory)
      });

      res.json(advisory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  app.get('/api/market/insights', async (req, res) => {
    // Mock regional NER market price trends
    const trends = [
      { market: "Guwahati", pricePerKg: 150, trend: "up", vegetable: "King Chilli" },
      { market: "Shillong", pricePerKg: 80, trend: "stable", vegetable: "Local Cabbage" },
      { market: "Imphal", pricePerKg: 120, trend: "down", vegetable: "Bamboo Shoots" }
    ];
    res.json(trends);
  });
};
