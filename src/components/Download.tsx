import { useState, useEffect } from "react";
import { Download, ExternalLink, Loader2, Monitor } from "lucide-react";

interface Release {
  tag_name: string;
  name: string;
  published_at: string;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
}

const GITHUB_REPO = "GitNimay/nimShot-app";

export default function DownloadSection() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchLatestRelease() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRelease(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestRelease();
  }, []);

  const exeAsset = release?.assets.find(
    (a) => a.name.endsWith(".exe") && !a.name.includes("nsis")
  ) || release?.assets.find((a) => a.name.endsWith(".exe"));

  const msiAsset = release?.assets.find((a) => a.name.endsWith(".msi"));

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="relative py-20 px-6" id="download">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Download for Windows
        </h2>
        <p className="text-gray-400 mb-10">
          Free forever. No account required.
        </p>

        <div className="glass rounded-2xl p-8">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              <span className="text-gray-400">Checking for updates...</span>
            </div>
          )}

          {error && (
            <div className="py-8">
              <p className="text-gray-400 mb-4">Unable to fetch latest release</p>
              <a
                href={`https://github.com/${GITHUB_REPO}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                View Releases on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {release && (
            <>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Monitor className="w-5 h-5 text-blue-400" />
                <span className="text-lg font-medium">
                  Version {release.tag_name.replace("v", "")}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-8">
                Released on {formatDate(release.published_at)}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {exeAsset && (
                  <a
                    href={exeAsset.browser_download_url}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-medium hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-purple-500/25"
                  >
                    <Download className="w-5 h-5" />
                    Download Installer
                    <span className="text-sm opacity-75">
                      ({formatBytes(exeAsset.size)})
                    </span>
                  </a>
                )}

                {msiAsset && (
                  <a
                    href={msiAsset.browser_download_url}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 glass rounded-xl font-medium hover:bg-white/10 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download MSI
                    <span className="text-sm opacity-75">
                      ({formatBytes(msiAsset.size)})
                    </span>
                  </a>
                )}
              </div>

              <p className="mt-6 text-gray-500 text-sm">
                Windows 10/11 (64-bit) • Auto-updates included
              </p>
            </>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="glass rounded-xl p-6">
            <h3 className="font-medium mb-2">Quick Install</h3>
            <p className="text-gray-400 text-sm">
              Download and run the installer. No admin rights needed for current user installation.
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-medium mb-2">Auto-Update</h3>
            <p className="text-gray-400 text-sm">
              nimShot automatically checks for updates and prompts you to install them.
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-medium mb-2">Keyboard Shortcut</h3>
            <p className="text-gray-400 text-sm">
              Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">Alt</kbd> + <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">S</kbd> to capture anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
