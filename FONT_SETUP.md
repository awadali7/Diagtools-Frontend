# Font Setup Instructions

## Fonts Configured

1. **Bricolage Grotesque** - Used for all headings (h1, h2, h3, h4, h5, h6)
   - ✅ Already set up via Google Fonts
   - No additional files needed

2. **Onset Regular** - Used for paragraphs, lists, links, and body text
   - ⚠️ Needs font files to be added

## Setting Up Onset Font

Since Onset is not available on Google Fonts, you'll need to add the font files manually:

### Step 1: Get Onset Font Files

1. Download the Onset font files (.woff2 and/or .woff formats)
2. Place them in the `public/fonts/` directory

### Step 2: Font File Structure

Your font files should be organized like this:

```
frontend/
└── public/
    └── fonts/
        ├── Onset-Regular.woff2  (preferred format)
        └── Onset-Regular.woff   (fallback format)
```

### Step 3: Font File Naming

The font files should be named exactly:
- `Onset-Regular.woff2` (or `.woff`)

If your files have different names, update the paths in `app/layout.tsx`:

```typescript
const onsetRegular = localFont({
    src: [
        {
            path: "../public/fonts/YOUR-FONT-FILE-NAME.woff2",
            weight: "400",
            style: "normal",
        },
    ],
    variable: "--font-body",
});
```

### Alternative: Use a Different Font for Body Text

If you don't have Onset font files, you can temporarily use a Google Font for body text. Update `app/layout.tsx`:

```typescript
import { Bricolage_Grotesque, Inter } from "next/font/google";

const bodyFont = Inter({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400"],
});
```

## Testing

After adding the font files:
1. Restart your Next.js development server
2. Check the browser console for any font loading errors
3. Inspect elements to verify fonts are applied correctly

## Current Font Usage

- **Headings** (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`): Bricolage Grotesque
- **Body text** (`p`, `li`, `a`, `span`, etc.): Onset Regular (or fallback: Arial)

