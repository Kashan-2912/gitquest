# Security Policy

## Supported versions
Only the latest version of GitQuest on the `main` branch is supported.

## Reporting a problem
Please do not open a public issue for a security problem.

Instead, report it privately through GitHub: go to the repository's
**Security** tab and choose **Report a vulnerability**, or contact the
project owner through GitHub (@Kashan-2912).

Please include:
- What the problem is and where you found it.
- Steps to repeat it.
- What someone could do with it.

We aim to reply within 7 days. Please give us time to fix the problem
before you share it in public.

## Secrets
Never commit real keys. The app reads `GEMINI_API`, `DATABASE_URL`, and
`BLOB_READ_WRITE_TOKEN` from `.env.local`, which is not tracked by Git.
If a key leaks, rotate it at once and tell the maintainers.
