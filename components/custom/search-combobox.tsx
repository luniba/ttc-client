"use client"

import { useState, type ReactNode } from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { useDebouncedValue } from "@/hooks/use-debounced-value"

export type Option = { value: string; label: string; hint?: string }

// Looks up options for what was typed; the server does the filtering.
export type OptionSearch<T extends Option> = (query: string) => {
  items: T[]
  loading: boolean
}

type Common<T extends Option> = {
  id: string
  label: ReactNode
  placeholder?: string
  description?: ReactNode
  error?: string
  // Must be a hook (it is called during render).
  useSearch: OptionSearch<T>
}

// What's typed, debounced, and the matches for it.
function useMatches<T extends Option>(useSearch: OptionSearch<T>) {
  const [query, setQuery] = useState("")
  const results = useSearch(useDebouncedValue(query.trim()))
  return { setQuery, ...results }
}

const same = (a: Option, b: Option) => a.value === b.value
const labelOf = (o: Option) => o.label

// Picks one record from a server search (shadcn Combobox).
export function SearchSelect<T extends Option>({
  value,
  onChange,
  ...p
}: Common<T> & { value: T | null; onChange: (value: T | null) => void }) {
  const m = useMatches(p.useSearch)
  return (
    <FieldShell {...p}>
      <Combobox<T>
        items={m.items}
        filter={null}
        value={value}
        onValueChange={onChange}
        onInputValueChange={m.setQuery}
        itemToStringLabel={labelOf}
        isItemEqualToValue={same}
      >
        <ComboboxInput
          id={p.id}
          placeholder={p.placeholder}
          aria-invalid={!!p.error || undefined}
          className="h-11 w-full bg-background shadow-xs"
          showClear={!!value}
        />
        <Results loading={m.loading} />
      </Combobox>
    </FieldShell>
  )
}

// Picks several records from a server search; the picks show as removable chips.
export function SearchMultiSelect<T extends Option>({
  value,
  onChange,
  ...p
}: Common<T> & { value: T[]; onChange: (value: T[]) => void }) {
  const m = useMatches(p.useSearch)
  const anchor = useComboboxAnchor()
  return (
    <FieldShell {...p}>
      <Combobox<T, true>
        multiple
        items={m.items}
        filter={null}
        value={value}
        onValueChange={onChange}
        onInputValueChange={m.setQuery}
        itemToStringLabel={labelOf}
        isItemEqualToValue={same}
      >
        <ComboboxChips
          ref={anchor}
          className="min-h-11 bg-background px-2 py-1.5 text-base shadow-xs"
        >
          {value.map((o) => (
            <ComboboxChip key={o.value} className="h-7 px-2 text-sm">
              {o.label}
            </ComboboxChip>
          ))}
          <ComboboxChipsInput
            id={p.id}
            placeholder={value.length ? undefined : p.placeholder}
            aria-invalid={!!p.error || undefined}
            className="h-7 px-1.5"
          />
        </ComboboxChips>
        <Results loading={m.loading} anchor={anchor} />
      </Combobox>
    </FieldShell>
  )
}

function Results({
  loading,
  anchor,
}: {
  loading: boolean
  anchor?: ReturnType<typeof useComboboxAnchor>
}) {
  return (
    <ComboboxContent anchor={anchor}>
      <ComboboxEmpty>{loading ? "Searching…" : "No matches"}</ComboboxEmpty>
      <ComboboxList>
        {(o: Option) => (
          <ComboboxItem key={o.value} value={o} className="py-2">
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">{o.label}</span>
              {o.hint && (
                <span className="truncate text-xs text-muted-foreground">
                  {o.hint}
                </span>
              )}
            </span>
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  )
}

function FieldShell({
  id,
  label,
  description,
  error,
  children,
}: Pick<Common<Option>, "id" | "label" | "description" | "error"> & {
  children: ReactNode
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      {error ? (
        <FieldError id={`${id}-hint`}>{error}</FieldError>
      ) : (
        description && (
          <FieldDescription id={`${id}-hint`}>{description}</FieldDescription>
        )
      )}
    </Field>
  )
}
