import { readCsrf } from "@/lib/access-token"

export type SessionEvent = "signed-in" | "signed-out"

const NAME = "session"

let channel: BroadcastChannel | null | undefined

// Lazily created; null where BroadcastChannel is missing, which degrades to same-tab only.
const broadcast = () => {
  if (channel === undefined)
    channel =
      typeof BroadcastChannel === "undefined"
        ? null
        : new BroadcastChannel(NAME)
  return channel
}

// Tells every tab, including this one (a channel never delivers to its own sender).
export const publishSession = (event: SessionEvent) => {
  broadcast()?.postMessage(event)
  window.dispatchEvent(new CustomEvent<SessionEvent>(NAME, { detail: event }))
}

export const onSession = (listener: (event: SessionEvent) => void) => {
  const local = (e: Event) => listener((e as CustomEvent<SessionEvent>).detail)
  const remote = (e: MessageEvent<SessionEvent>) => listener(e.data)
  window.addEventListener(NAME, local)
  broadcast()?.addEventListener("message", remote)
  return () => {
    window.removeEventListener(NAME, local)
    broadcast()?.removeEventListener("message", remote)
  }
}

// The CSRF cookie doubles as the "probably signed in" hint; read inside effects or query
// functions, never during render.
export const hasSessionHint = () => !!readCsrf()
