import { Sidebar } from "@/components/admin/sidebar";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "@/app/globals.css";

export const metadata = {
  title: 'Admin Panel | SMARTLAB247',
  description: 'Enterprise Administrative Dashboard',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
