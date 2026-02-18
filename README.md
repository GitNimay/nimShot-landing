# nimShot Landing Page

Landing page for nimShot - a fast, beautiful screenshot tool for Windows.

## Features

- Displays latest version from GitHub Releases
- Download links for installer and MSI
- Auto-update API endpoint for the desktop app

## Development

```bash
npm install
npm run dev
```

## Deployment

This project is designed to be deployed on Vercel (free tier).

### Environment Variables

Set these in Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `GITHUB_REPO` | GitHub repo path (e.g., `username/nimShot-app`) |
| `GITHUB_TOKEN` | Optional: GitHub token for higher rate limits |

### Deploy to Vercel

1. Push this repo to GitHub
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy!

## API Endpoints

### `GET /api/update/:target/:arch/:current_version`

Used by Tauri's auto-updater to check for updates.

**Parameters:**
- `target`: Platform (windows, darwin, linux)
- `arch`: Architecture (x64, x86_64)
- `current_version`: Current app version

**Response:**
- `200`: Update available with download URL
- `204`: No update available
- `404`: No matching asset found
