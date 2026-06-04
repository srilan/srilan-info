export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex-1">{children}</main>;
}
