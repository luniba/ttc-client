"use client"

import { Menu } from "@base-ui/react/menu"
import { cn } from "cn"
import { Logout, Setting2, type Icon } from "iconsax-reactjs"
import Link from "next/link"

import { routes } from "@/config/routes"
import { useLogout } from "@/features/auth/services/logout"
import type { User } from "@/features/auth/services/me"

const itemClass =
  "flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-foreground outline-none transition-colors data-highlighted:bg-secondary"

function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground",
        className
      )}
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  )
}

const Separator = () => (
  <div className="my-1 border-t border-dashed border-neutral-200" />
)

const ItemIcon = ({ icon: I }: { icon: Icon }) => (
  <I size={16} color="currentColor" aria-hidden />
)

export function UserMenu({ user }: { user: User }) {
  const logout = useLogout()

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Account menu"
        className="cursor-pointer rounded-full transition outline-none focus-visible:ring-4 focus-visible:ring-ring"
      >
        <Avatar name={user.name} className="size-10 hover:opacity-90" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" sideOffset={10} className="z-60">
          <Menu.Popup className="w-64 origin-(--transform-origin) rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
            <div className="flex items-center gap-3 px-2.5 py-2">
              <Avatar name={user.name} className="size-10 shrink-0" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {user.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <Separator />
            <Menu.LinkItem
              render={<Link href={routes.admin("settings")} />}
              className={itemClass}
            >
              <ItemIcon icon={Setting2} /> {"Settings"}
            </Menu.LinkItem>
            <Separator />
            <Menu.Item
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className={cn(
                itemClass,
                "text-destructive data-highlighted:bg-destructive/5"
              )}
            >
              <ItemIcon icon={Logout} /> {"Log out"}
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
