import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import { appRouter } from "~/server/api/root";
import { createCallerFactory, createTRPCContext } from "~/server/api/trpc";

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  return createTRPCContext({
    headers: new Headers({
      cookie: cookies().toString(),
      "x-trpc-source": "rsc",
    }),
  });
});

export const api = createCaller(createContext);
