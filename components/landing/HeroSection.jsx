import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden bg-blue-950 px-5 py-12 text-center text-white sm:px-8 lg:px-12"
      style={{
        backgroundImage: "url('https://i.pinimg.com/1200x/bb/79/50/bb79509ae6429fee28787c612c31db0f.jpg')",
        backgroundPosition: "center 48%",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 -z-10 bg-blue-950/60" aria-hidden="true" />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center py-12 sm:py-16">
        <div className="max-w-4xl">
          <p className="mb-6 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200 sm:text-sm">
            <BookOpen size={17} strokeWidth={1.8} />
            A little room for wonder
          </p>
          <h1 id="hero-title" className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Where the next <span className="font-serif font-normal italic text-sky-200">great story</span> begins.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Follow a new idea, revisit an old favorite, or find the words you didn’t know you needed.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/books"
              className="inline-flex min-h-12 items-center gap-3 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-200"
            >
              Find your next read <ArrowRight size={17} />
            </Link>
            <Link
              href="/register"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-white/90 underline decoration-white/40 underline-offset-4 transition hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Make yourself at home
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl justify-center border-t border-white/25 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/70">
          BookHub <span className="px-2 text-sky-200">·</span> Turn the page
        </p>
      </div>
    </section>
  )
}

export default HeroSection
