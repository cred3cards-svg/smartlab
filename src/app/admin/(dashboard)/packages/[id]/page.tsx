import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PackageEditForm } from "./PackageEditForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PackageEditPage({ params }: Props) {
  const { id } = await params;
  
  const pkg = await prisma.checkupPackage.findUnique({
    where: { id },
  });

  if (!pkg) notFound();

  return (
    <div className="space-y-6">
      <Link 
        href="/admin/packages" 
        className="flex items-center gap-2 text-sm text-text-muted hover:text-brand-blue transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Package Catalog
      </Link>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Edit Package: {pkg.name}</h1>
          <p className="text-text-secondary font-mono text-xs">ID: {pkg.id}</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <PackageEditForm pkg={pkg} />
      </div>
    </div>
  );
}
