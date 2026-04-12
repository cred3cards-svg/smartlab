"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      // @ts-ignore - Pathname types are dynamic
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <select
      value={locale}
      onChange={handleLanguageChange}
      disabled={isPending}
      className={`bg-transparent text-sm font-medium focus:outline-none cursor-pointer transition-opacity ${
        isPending ? "opacity-50" : "opacity-100"
      }`}
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी (Hindi)</option>
      <option value="bn">বাংলা (Bengali)</option>
    </select>
  );
}
