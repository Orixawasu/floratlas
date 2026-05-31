"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/LanguageProvider";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
};

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder,
  className,
}: SearchBarProps) {
  const id = useId();
  const { t } = useI18n();

  return (
    <form
      className={cn(
        "flex w-full flex-col items-stretch gap-3 rounded-3xl border border-white/40 bg-white/70 px-4 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-md sm:flex-row sm:items-center sm:px-6",
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <label htmlFor={id} className="sr-only">
        {t.searchBar.label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t.searchBar.placeholder}
        className="w-full flex-1 bg-transparent text-base text-emerald-950 placeholder:text-emerald-900/40 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
      >
        {t.searchBar.button}
      </button>
    </form>
  );
}
