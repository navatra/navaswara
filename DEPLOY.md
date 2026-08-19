# Navaswara — Panduan Deploy ke Vercel

## Prasyarat

1. Akun [Vercel](https://vercel.com) (gratis)
2. Akun [Supabase](https://supabase.com) (gratis)
3. Repository di GitHub / GitLab / Bitbucket

---

## Step 1 — Setup Supabase

1. Buat project baru di [supabase.com/dashboard](https://supabase.com/dashboard)
2. Catat:
   - `Project URL` (contoh: `https://xyz.supabase.co`)
   - `anon key` (public key)
   - `service_role key` (secret — jangan expose)
3. Buka **SQL Editor** di Supabase dashboard
4. Copy isi file `supabase/migrations/001_initial_schema.sql` dan jalankan

---

## Step 2 — Setup Environment Variables Lokal

Buat file `.env.local` di folder `navaswara/`:

```bash
cp .env.example .env.local
```

Isi dengan nilai dari Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key

NEXT_PUBLIC_WHATSAPP_NUMBER=6285123099276
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Step 3 — Test Lokal

```bash
cd navaswara
npm run dev
```

Buka:
- **Marketing page:** `http://localhost:3000`
- **Demo undangan:** `http://localhost:3000/invitation/demo-ivory`
- **404:** `http://localhost:3000/any-invalid-path`

---

## Step 4 — Push ke GitHub

```bash
# Di root /Portofolio
git init
git add .
git commit -m "feat: initial Navaswara implementation"
git remote add origin https://github.com/username/navaswara.git
git push -u origin main
```

---

## Step 5 — Deploy ke Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import repository GitHub
3. **Root Directory:** set ke `navaswara` (karena project ada di subfolder)
4. **Framework:** Next.js (auto-detected)
5. Tambahkan **Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL         → dari Supabase dashboard
   NEXT_PUBLIC_SUPABASE_ANON_KEY    → dari Supabase dashboard
   SUPABASE_SERVICE_ROLE_KEY        → dari Supabase dashboard
   NEXT_PUBLIC_WHATSAPP_NUMBER      → 6285123099276
   NEXT_PUBLIC_SITE_URL             → https://your-vercel-domain.vercel.app
   ```
6. Klik **Deploy**

---

## Step 6 — Custom Domain (Opsional)

Setelah deploy berhasil, di Vercel:
1. **Settings → Domains**
2. Tambahkan domain kamu (contoh: `navaswara.id`)
3. Update DNS sesuai instruksi Vercel
4. Update `NEXT_PUBLIC_SITE_URL` ke domain baru

---

## Menambahkan Undangan Baru

1. Buat file data di `src/data/` (contoh: `sinta-dimas.ts`)
2. Isi sesuai struktur `InvitationData` (lihat `src/types/invitation.ts`)
3. Daftarkan di `src/app/invitation/[slug]/page.tsx` dalam `invitationRegistry`
4. Push & Vercel auto-deploy

Contoh:
```typescript
// src/data/sinta-dimas.ts
export const sintaDimasInvitation: InvitationData = {
  slug: "sinta-dimas",
  templateId: "ivory",
  bride: { name: "Sinta", ... },
  ...
};
```

```typescript
// src/app/invitation/[slug]/page.tsx
const invitationRegistry = {
  "demo-ivory": demoIvoryInvitation,
  "sinta-dimas": sintaDimasInvitation, // ← tambahkan ini
};
```

---

## URL Struktur

| Route | Keterangan |
|-------|-----------|
| `/` | Marketing page |
| `/invitation/demo-ivory` | Demo undangan (Ivory template) |
| `/invitation/[slug]` | Undangan custom per klien |
| `/sitemap.xml` | Sitemap (auto-generated) |
| `/robots.txt` | Robots config |

---

## Troubleshooting

**RSVP/Wishes tidak tersimpan?**
→ Cek Supabase keys di environment variables

**Build error di Vercel?**
→ Pastikan Root Directory di Vercel di-set ke `navaswara`

**WhatsApp URL salah?**
→ Cek `NEXT_PUBLIC_WHATSAPP_NUMBER` di env (format: `62xxxxxxxxxx`)
