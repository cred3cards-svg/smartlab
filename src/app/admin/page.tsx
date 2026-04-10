import React from "react";
import { redirect } from "next/navigation";

export default function AdminPage() {
  // For now, just redirect to referrals as it's the main focus
  redirect("/admin/referrals");
}
