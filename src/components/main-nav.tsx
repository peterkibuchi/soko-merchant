"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "~/lib/utils";

export function MainNav({
  className,
  storeItems = [],
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  storeItems?: Record<string, string>[];
}) {
  const pathname = usePathname();
  const params = useParams();

  const currentStore = storeItems.find(
    (storeItem) => storeItem.id === params.storeId,
  )!;
  const currentStoreId = currentStore.id;

  const routes = [
    {
      label: "Overview",
      href: `/${currentStoreId}`,
      active: pathname === `/${currentStoreId}`,
    },
    {
      label: "Billboards",
      href: `/${currentStoreId}/billboards`,
      active: pathname === `/${currentStoreId}/billboards`,
    },
    {
      label: "Categories",
      href: `/${currentStoreId}/categories`,
      active: pathname === `/${currentStoreId}/categories`,
    },
    {
      label: "Colors",
      href: `/${currentStoreId}/colors`,
      active: pathname === `/${currentStoreId}/colors`,
    },
    {
      label: "Sizes",
      href: `/${currentStoreId}/sizes`,
      active: pathname === `/${currentStoreId}/sizes`,
    },
    {
      label: "Products",
      href: `/${currentStoreId}/products`,
      active: pathname === `/${currentStoreId}/products`,
    },
    {
      label: "Orders",
      href: `/${currentStoreId}/orders`,
      active: pathname === `/${currentStoreId}/orders`,
    },
    {
      label: "Settings",
      href: `/${currentStoreId}/settings`,
      active: pathname === `/${currentStoreId}/settings`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
