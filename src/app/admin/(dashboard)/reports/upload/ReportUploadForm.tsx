"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { uploadReport } from "../actions";
import { Building2, User, FileText, Send } from "lucide-react";

interface ReportUploadFormProps {
  bookings: any[];
}

export default function ReportUploadForm({ bookings }: ReportUploadFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [reportUrl, setReportUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !reportUrl) return;

    setLoading(true);
    try {
      const result = await uploadReport({
        bookingId: selectedBooking,
        reportUrl,
      });

      if (result.success) {
        router.push("/admin/reports");
        router.refresh();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload report. Check logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking Selection */}
        <div className="space-y-3">
          <label className="text-xs font-black text-text-muted uppercase tracking-widest pl-1">
            Assign to Booking
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-teal transition-colors pointer-events-none">
              <Building2 size={18} />
            </div>
            <select
              value={selectedBooking}
              onChange={(e) => setSelectedBooking(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 bg-surface-soft border-2 border-transparent rounded-[1.25rem] text-sm font-bold text-text-primary focus:bg-white focus:border-brand-teal focus:ring-0 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a pending booking...</option>
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bookingId} — {b.patient.name} ({b.tests.length} tests)
                </option>
              ))}
            </select>
          </div>
          <p className="text-[10px] text-text-muted px-1 font-medium">
            Only bookings with 'Collected' or 'Assigned' status appear here.
          </p>
        </div>

        {/* Report Link */}
        <div className="space-y-3">
          <label className="text-xs font-black text-text-muted uppercase tracking-widest pl-1">
            Report PDF URL
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-brand-teal transition-colors pointer-events-none">
              <FileText size={18} />
            </div>
            <input
              type="url"
              placeholder="https://storage.provider.com/report.pdf"
              value={reportUrl}
              onChange={(e) => setReportUrl(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 bg-surface-soft border-2 border-transparent rounded-[1.25rem] text-sm font-bold text-text-primary focus:bg-white focus:border-brand-teal focus:ring-0 transition-all shadow-input-soft"
            />
          </div>
          <p className="text-[10px] text-text-muted px-1 font-medium">
            Ensure this is a direct Link to the PDF results.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-surface-border">
        <Button
          type="submit"
          disabled={loading || !selectedBooking || !reportUrl}
          variant="teal"
          size="xl"
          className="w-full md:w-auto min-w-[200px]"
          leftIcon={<Send className="h-4 w-4" />}
        >
          {loading ? "Processing..." : "Publish Final Report"}
        </Button>
      </div>
    </form>
  );
}
