// Invitation pages have their own layout — no navigation, no footer, full screen

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-ivory)" }}
    >
      {children}
    </div>
  );
}
