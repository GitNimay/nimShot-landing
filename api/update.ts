import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_REPO = process.env.GITHUB_REPO || "GitNimay/nimShot-app";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { target, arch, current_version } = req.query;

  if (!target || !arch || !current_version) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "nimShot-Updater",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const release: GitHubRelease = await response.json();

    const latestVersion = release.tag_name.replace("v", "");
    const currentVersion = (current_version as string).replace("v", "");

    const versionCompare = (a: string, b: string): number => {
      const aParts = a.split(".").map(Number);
      const bParts = b.split(".").map(Number);
      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aVal = aParts[i] || 0;
        const bVal = bParts[i] || 0;
        if (aVal > bVal) return 1;
        if (aVal < bVal) return -1;
      }
      return 0;
    };

    if (versionCompare(latestVersion, currentVersion) <= 0) {
      return res.status(204).send(null);
    }

    const platform = target as string;
    const architecture = arch as string;

    let assetPattern: RegExp;
    if (platform === "windows") {
      assetPattern = architecture === "x86_64" || architecture === "x64"
        ? /.*x64.*\.(exe|msi)$/i
        : /.*x86.*\.(exe|msi)$/i;
    } else if (platform === "darwin") {
      assetPattern = /\.app\.tar\.gz$/i;
    } else {
      assetPattern = /\.AppImage$/i;
    }

    const asset = release.assets.find((a) => assetPattern.test(a.name));

    if (!asset) {
      console.error(`No asset found for ${platform}-${architecture}`);
      console.error("Available assets:", release.assets.map((a) => a.name));
      return res.status(404).json({ error: "No matching asset found" });
    }

    const updateResponse = {
      version: latestVersion,
      notes: release.body || `Release ${release.tag_name}`,
      pub_date: release.published_at,
      platforms: {
        [`${platform}-${architecture}`]: {
          signature: "",
          url: asset.browser_download_url,
        },
      },
    };

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(updateResponse);
  } catch (error) {
    console.error("Update check error:", error);
    return res.status(500).json({ error: "Failed to check for updates" });
  }
}
