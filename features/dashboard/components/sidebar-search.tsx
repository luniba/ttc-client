"use client"

import { SearchNormal1 } from "iconsax-reactjs"

type Props = {
  value: string
  onChange: (value: string) => void
  label: string
  shortcut: string
  id?: string
}

export function SidebarSearch({ value, onChange, label, shortcut, id }: Props) {
  return (
    <label className="flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 focus-within:border-white/30 focus-within:ring-4 focus-within:ring-white/10">
      <SearchNormal1
        size={16}
        color="currentColor"
        aria-hidden
        className="shrink-0 text-white/50"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        aria-label={label}
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50 [&::-webkit-search-cancel-button]:hidden"
      />
      <kbd className="shrink-0 font-sans text-xs text-white/40">{shortcut}</kbd>
    </label>
  )
}
