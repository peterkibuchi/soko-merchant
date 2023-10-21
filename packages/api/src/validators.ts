import { z } from "zod";

/**
 * Shared validators used both in the frontend and backend
 */
export const createStoreSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(64, "Name cannot exceed 64 characters"),
});
export type createStoreType = z.infer<typeof createStoreSchema>;
