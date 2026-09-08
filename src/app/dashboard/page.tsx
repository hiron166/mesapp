"use client";

import { useRouteGuard } from "../_hooks/useRouteGuard";
export default function DashboardPage() {
  const {session} = useRouteGuard();
  if (!session) return null;

  return <div>Dashboard Page</div>;
}
