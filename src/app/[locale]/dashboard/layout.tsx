import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  
  // In real app, we verify PATIENT role or PatientAccount existence
  // if (!session) redirect("/login");

  return (
    <div className="flex h-screen bg-surface-soft overflow-hidden">
      {/* Dashboard Side Navigation */}
      <DashboardSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <DashboardHeader />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-surface-soft scrollbar-hide">
          <div className="container-site py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
