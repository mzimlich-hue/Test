# Pocket Calculator

A simple, responsive calculator inspired by the Calculator app included with iPhone. This is a first app project, built with Next.js and deployed on Vercel, with source code managed in GitHub.

## Project goals

- Make the familiar everyday calculator easy to use on a phone and desktop.
- Keep the interface clear, quick, and accessible.
- Build the project in small steps so the app and the tools behind it are understandable.

## Planned features

The first version will focus on a standard calculator:

- Addition, subtraction, multiplication, and division
- Decimal numbers and negative values
- Percent and clear controls
- A readable display and responsive button layout
- Basic keyboard input on devices with a physical keyboard

The exact behavior of percent, repeated equals, and clearing will be settled during implementation. The goal is familiar iPhone-style behavior, without copying Apple's branding or assets.

## Technology

- **UI and app framework:** Next.js (App Router) with TypeScript
- **Backend and database:** Supabase
- **Hosting and deployment:** Vercel
- **Version control:** Git and GitHub

Basic calculator operations can run in the browser and do not require a server or database. Supabase is part of the chosen stack and can support a later feature such as saved calculation history or user preferences. We can decide whether to include that in the first release before creating the database or asking users to sign in.

## Getting started

Setup instructions will be added once the Next.js project has been created. The expected local workflow will be:

1. Install the project dependencies.
2. Configure any required environment variables in a local .env.local file.
3. Start the development server.
4. Open the local URL shown in the terminal.

Never commit Supabase secrets or other private credentials to GitHub. A .env.example file should document variable names without containing real values.

## Development roadmap

1. Confirm the first-release behavior and visual direction.
2. Create the Next.js app and initialize Git.
3. Build and refine the calculator interface and calculation logic.
4. Decide whether the first release needs Supabase-backed history or preferences.
5. Push the project to GitHub and connect the repository to Vercel.
6. Configure production environment variables and deploy.

## Deployment

The planned deployment is through Vercel, connected to the GitHub repository. Changes pushed to the main branch can be deployed to production; other branches can be previewed before merging. Any Supabase environment variables needed by the app will be configured in Vercel's project settings.

## Questions to settle

These choices are not blockers for getting started; the defaults below provide a reasonable first version:

- **Name:** “Pocket Calculator” is a working title.
- **Look and feel:** A clean, dark, phone-friendly layout inspired by familiar mobile calculators.
- **First release:** A basic calculator with no account requirement. Saved history can be added later with Supabase if wanted.
- **Calculator details:** Standard arithmetic, with iPhone-like percent and clear behavior to be confirmed while building.

## License

No license has been selected yet. Choose one before making the repository public if you want others to reuse or contribute to the code.
