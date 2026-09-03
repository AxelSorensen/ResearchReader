# 📄 ResearchReader

A PDF viewer for research papers that saves your highlights and annotations back to the cloud, so you can pick up reading where you left off.

## Features

- 📝 **Annotate PDFs in the browser** — full PDF viewer/annotator powered by PDFTron WebViewer
- ☁️ **Cloud-synced papers** — PDFs and saved annotations are stored in Supabase storage, keyed by paper ID
- 💾 **One-click save** — a save button in the viewer header exports your annotations (XFDF) and re-uploads the annotated PDF
- ✅ **Read tracking** — checkmarks to mark papers as read (per the commit history)
- 📱 **PWA-ready** — configured with `next-pwa` for installable/offline use

## Installation

```bash
git clone <this repo>
cd ResearchReader
npm install
```

You'll need your own Supabase project (with a `papers` storage bucket) and to point `src/lib/supabaseClient.js` at it.

## Usage

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then navigate to `/pdf-viewer?id=<paper-name>` to open a specific PDF from storage.

## Built with

- [Next.js](https://nextjs.org/) (Pages Router)
- [PDFTron WebViewer](https://www.pdftron.com/webviewer)
- [Supabase](https://supabase.com/) (storage + client)
- [Tailwind CSS](https://tailwindcss.com/)

## Status

🚧 Personal-use prototype — the Supabase project URL/bucket is hardcoded, there's no auth on paper access, and navigation into the viewer is by manually building the `?id=` URL rather than a paper library UI.
