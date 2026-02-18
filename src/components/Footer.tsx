import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="gradient-text font-semibold">nimShot</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400 text-sm">Free & Open Source</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/GitNimay/nimShot-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
