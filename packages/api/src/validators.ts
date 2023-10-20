import { z } from "zod";

/**
 * Shared validators used both in the frontend and backend
 */
export const createStoreSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters"),
});
export type createStoreType = z.infer<typeof createStoreSchema>;
