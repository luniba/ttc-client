"use client"

import { CloseCircle, SearchNormal1 } from "iconsax-reactjs"

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  clearLabel: string
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  clearLabel,
}: Props) {
  return (
    <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 shadow-xs focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-ring sm:max-w-xs">
      <SearchNormal1
        size={18}
        color="currentColor"
        aria-hidden
        className="shrink-0 text-neutral-500"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        maxLength={100}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-500 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={clearLabel}
          className="grid size-6 shrink-0 place-items-center rounded-full text-neutral-400 hover:text-foreground"
        >
          <CloseCircle size={18} color="currentColor" aria-hidden />
        </button>
      )}
    </label>
  )
}
