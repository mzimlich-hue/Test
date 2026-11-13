# Pocket Calculator

A simple, responsive calculator inspired by the Calculator app included with iPhone. This is a first app project, built with Next.js and deployed on Vercel, with source code managed in GitHub.

## Project goals

- Make the familiar everyday calculator easy to use on a phone and desktop.
- Keep the interface clear, quick, and accessible.
- Build the project in small steps so the app and the tools behind it are understandable.

## First version

The first version includes a standard calculator:

- Addition, subtraction, multiplication, and division
- Decimal numbers and negative values
- Percent and clear controls
- A readable display and responsive button layout
- Basic keyboard input on devices with a physical keyboard

The calculator supports chained operations, repeated equals, percent, sign change, and clear. Percent follows the familiar calculator pattern: for example, 10% of 200 can be added to 200. The goal is a familiar mobile-calculator feel, without copying Apple's branding or assets.

## Technology

- **UI and app framework:** Next.js (App Router) with TypeScript
- **Backend and database:** Supabase
- **Hosting and deployment:** Vercel
- **Version control:** Git and GitHub

Basic calculator operations can run in the browser and do not require a server or database. Supabase is part of the chosen stack and can support a later feature such as saved calculation history or user preferences. We can decide whether to include that in the first release before creating the database or asking users to sign in.

## Getting started

You need Node.js 20.9 or later and npm. From the project folder, run:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The first version does not need Supabase credentials because its calculations happen in the browser. If we add a database feature later, keep secrets in a local `.env.local` file and configure production values in Vercel. Never commit private credentials to GitHub.

## Development roadmap

1. Refine the calculator behavior and visual details.
2. Commit the local project and push it to the existing GitHub repository.
3. Decide whether to add saved history or preferences with Supabase.
4. Connect GitHub to Vercel and deploy the app.

## Deployment

The planned deployment is through Vercel, connected to the GitHub repository. Changes pushed to the main branch can be deployed to production; other branches can be previewed before merging. Any Supabase environment variables needed by the app will be configured in Vercel's project settings.

## Questions to settle

These choices are not blockers; the defaults below provide a reasonable first version:

- **Name:** “Pocket Calculator” is a working title.
- **Look and feel:** A clean, dark, phone-friendly layout inspired by familiar mobile calculators.
- **First release:** A basic calculator with no account requirement. Saved history can be added later with Supabase if wanted.
- **Calculator details:** Standard arithmetic, iPhone-like percent behavior, and a clear button.

## License

No license has been selected yet. Choose one before making the repository public if you want others to reuse or contribute to the code.
