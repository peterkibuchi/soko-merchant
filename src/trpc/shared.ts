import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "~/server/api/root";

export const transformer = superjson;

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // Browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use Vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // Dev SSR should use localhost
};

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
