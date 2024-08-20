export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full h-dvh pt-[3.75rem] pb-[4.5rem] px-5">{children}</div>
  )
}
