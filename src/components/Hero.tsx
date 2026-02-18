import { Camera, Sparkles, Zap, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-500/25">
            <Camera className="w-10 h-10 text-white" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">nimShot</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Fast, beautiful screenshots for Windows
        </p>

        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Capture screenshots with a single keyboard shortcut. Annotate, organize, 
          and share instantly. Free and open source.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm">Instant Capture</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Beautiful UI</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm">Privacy First</span>
          </div>
        </div>

        <div className="animate-float">
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-30" />
            <div className="relative glass rounded-2xl p-2">
              <div className="bg-gray-900/80 rounded-xl p-4 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-500">Screenshot Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
