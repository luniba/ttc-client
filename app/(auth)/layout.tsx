// Login and password pages share the public site's dark theme.
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return <div className="site-dark">{children}</div>
}
