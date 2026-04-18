import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { TestEditForm } from "./TestEditForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TestEditPage({ params }: Props) {
  const { id } = await params;
  
  const test = await prisma.test.findUnique({
    where: { id },
    include: { categories: true }
  });

  if (!test) notFound();

  return (
    <div className="space-y-6">
      <Link 
        href="/admin/tests" 
        className="flex items-center gap-2 text-sm text-text-muted hover:text-brand-blue transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Test Catalog
      </Link>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Edit Test: {test.name}</h1>
          <p className="text-text-secondary font-mono text-xs">ID: {test.id}</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <TestEditForm test={test} />
      </div>
    </div>
  );
}
