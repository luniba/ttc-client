"use client"

import { useEffect, useState } from "react"

// value, once it has stopped changing for `delay` ms; for search boxes that query the API.
export function useDebouncedValue<T>(value: T, delay = 300) {
  const [settled, setSettled] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setSettled(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return settled
}
