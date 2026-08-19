export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--color-ivory)" }}
      aria-label="Memuat halaman..."
    >
      <div className="flex flex-col items-center gap-4">
        {/* Elegant spinner using CSS */}
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--color-sage-light)", borderTopColor: "transparent" }}
          aria-hidden
        />
        <p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--color-warm-gray-light)" }}
        >
          Memuat...
        </p>
      </div>
    </div>
  );
}
