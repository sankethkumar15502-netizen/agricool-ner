import { z } from "zod";

export const insertBatchSchema = z.object({
  unitId: z.string().uuid(),
  vegetableName: z.string().min(2, "Vegetable name is required"),
  category: z.string().min(2, "Category is required"),
  quantityKg: z.number().positive("Quantity must be greater than zero"),
  harvestDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  targetMarket: z.string().optional(),
});

export const telemetryPayloadSchema = z.object({
  unitId: z.string().uuid(),
  internalTemp: z.number().min(-10).max(40),
  humidity: z.number().min(0).max(100),
  solarGenKw: z.number().min(0),
  batterySoc: z.number().min(0).max(100),
  compressorActive: z.boolean(),
});

export const advisoryQuerySchema = z.object({
  unitId: z.string().uuid(),
  batchId: z.string().uuid().optional(),
  queryContext: z.string().min(5)
});
