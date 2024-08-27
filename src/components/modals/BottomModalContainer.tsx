export function BottomModalContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="fixed bottom-0 left-0 w-full">{children}</div>
}
