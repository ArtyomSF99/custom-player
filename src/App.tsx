import { VideoPlayer } from "./player/components/video-player/VideoPlayer";
import { testPlayerSource } from "./player/data/source";

export function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.92),transparent_28%),linear-gradient(180deg,#eef2fb_0%,#e9eef8_100%)] p-4 font-sans text-slate-900 antialiased sm:p-6 lg:p-[clamp(1.5rem,4vw,4.5rem)]">
      <section className="w-full max-w-[1180px]">
        <VideoPlayer source={testPlayerSource} />
      </section>
    </main>
  );
}
