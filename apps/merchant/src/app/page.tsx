import { UserButton } from "@clerk/nextjs";

export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="h-screen p-4">
      <UserButton afterSignOutUrl="/" />
    </main>
  );
}
