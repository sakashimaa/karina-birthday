"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowDown, Cpu, Pause, Play, Terminal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const stack = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16 },
  },
};

const easeSoft = [0.16, 1, 0.3, 1] as const;

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeSoft },
  },
};

const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(16,185,129,0.15)",
      "0 0 50px rgba(16,185,129,0.35)",
      "0 0 20px rgba(16,185,129,0.15)",
    ],
    transition: { duration: 2.8, repeat: Infinity, ease: easeSoft },
  },
};

const floaty = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 0.4, 0],
    transition: { duration: 5, repeat: Infinity, ease: easeSoft },
  },
};

const heroGlitch = {
  animate: {
    x: [0, -1, 2, -2, 1, 0],
    y: [0, 1, -1, 2, -1, 0],
    rotate: [0, 0.2, -0.2, 0.1, 0, 0],
    transition: {
      duration: 2.6,
      repeat: Infinity,
      repeatDelay: 1.8,
      ease: easeSoft,
    },
  },
};

const heroTransition = { duration: 0.8, ease: easeSoft };
const heroImages = [
  "/karina.jpg",
  "/karina1.jpg",
  "/karina2.jpg",
  "/karina3.jpg",
  "/karina4.jpg",
];
const trackStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const trackItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeSoft },
  },
};

function GlitchHeader() {
  return (
    <motion.header variants={item} className="flex flex-col gap-6">
      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-emerald-400/80">
        <Cpu className="h-4 w-4" />
        archive protocol
      </p>
      <motion.h1
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: easeSoft }}
        className="glitch text-4xl font-[var(--font-geist-sans)] font-semibold tracking-tight text-zinc-100 md:text-6xl"
        data-text="KARINA v.18.0"
      >
        KARINA v.18.0
      </motion.h1>
      <p className="max-w-xl text-sm text-zinc-400 md:text-base">
        Are you happy?
      </p>
    </motion.header>
  );
}

function HeroImage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 5200);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      variants={item}
      className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-zinc-900/40 p-6 md:p-10"
    >
      <div className="absolute right-8 top-8 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-emerald-400/70">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        signal locked
      </div>
      <motion.div
        {...floaty}
        className="noise relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 md:mt-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImages[activeIndex]}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05, filter: "grayscale(1)" }}
            animate={{ opacity: 1, scale: 1, filter: "grayscale(1)" }}
            exit={{ opacity: 0, scale: 0.98, filter: "grayscale(1)" }}
            transition={heroTransition}
          >
            <motion.div {...heroGlitch} className="absolute inset-0">
              <Image
                src={heroImages[activeIndex]}
                alt="Karina memory"
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover object-[50%_20%] grayscale contrast-125"
              />
              <Image
                src={heroImages[activeIndex]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="pointer-events-none object-cover object-[50%_20%] opacity-30 mix-blend-screen saturate-150 hue-rotate-[110deg] translate-x-[1.5px]"
                aria-hidden
              />
              <Image
                src={heroImages[activeIndex]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="pointer-events-none object-cover object-[50%_20%] opacity-25 mix-blend-screen saturate-150 hue-rotate-[-25deg] -translate-x-[1.5px]"
                aria-hidden
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_65%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/10 via-transparent to-zinc-950/40" />
      </motion.div>
    </motion.div>
  );
}

function CodeBlock() {
  return (
    <motion.div
      variants={item}
      {...glowPulse}
      className="rounded-2xl border border-emerald-500/30 bg-zinc-900/50 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Terminal className="h-3.5 w-3.5" />
          traits.js
        </div>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-sm leading-6 text-zinc-300">
        <code className="font-mono">
          <span className="text-zinc-500">{"// karina.spec"}</span>
          {"\n"}
          <span className="text-violet-400">const</span>{" "}
          <span className="text-emerald-300">karina</span>{" "}
          <span className="text-zinc-400">=</span>{" "}
          <span className="text-zinc-100">{"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-emerald-300">status</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-amber-300">{"'Main Character'"}</span>
          <span className="text-zinc-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-emerald-300">mood</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-amber-300">{"'Happy'"}</span>
          <span className="text-zinc-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-emerald-300">Me</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-amber-300">{"'Obsessed w/you'"}</span>
          <span className="text-zinc-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-emerald-300">version</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-amber-300">{"'18.0'"}</span>
          <span className="text-zinc-400">,</span>
          {"\n"}
          {"  "}
          <span className="text-emerald-300">protocol</span>
          <span className="text-zinc-400">:</span>{" "}
          <span className="text-amber-300">{"'Saturday'"}</span>
          {"\n"}
          <span className="text-zinc-100">{"}"}</span>
          <span className="text-zinc-400">;</span>
          <span className="cursor" />
        </code>
      </pre>
    </motion.div>
  );
}

function ActionBtn() {
  return (
    <motion.div variants={item} className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-full text-xs tracking-[0.35em] md:w-auto"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px #10b981" }}
              whileTap={{ scale: 0.98 }}
            >
              EXECUTE pRoToCOL: Saturday ^_^
            </motion.button>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-emerald-300">
              Protocol Confirmed
            </DialogTitle>
            <DialogDescription>
              Saturday. ФНАФ. Школьники и мы 🩸
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
        access granted - 18.0 build
      </p>
    </motion.div>
  );
}

function MusicSection({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const tracks = [
    {
      Title: "BABY",
      Artist: "Kai Angel",
      CoverImage: "/kai_baby_background.png",
      AudioSrc: "/Kai_Angel_Baby.mp3",
      PersonalNote: "Один ее вид убивает Америику",
    },
    {
      Title: "Вирус",
      Artist: "CUPSIZE",
      CoverImage: "/cupsize_virus_background.jpeg",
      AudioSrc: "/CUPSIZE_-_Virus_(SkySound.cc).mp3",
      PersonalNote: "Меня не спасет алкоголь, ведь я...",
    },
    {
      Title: "Снайпер",
      Artist: "tewiq",
      CoverImage: "/tewiq_snaiper_background.jpeg",
      AudioSrc: "/tewiq_snajper.mp3",
      PersonalNote: "Sniped yoU<3",
    },
  ];
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);

  const handleTogglePlay = async (index: number) => {
    const audio = audioRefs.current[index];
    if (!audio) {
      return;
    }

    if (playingIndex === index) {
      audio.pause();
      setPlayingIndex(null);
      return;
    }

    if (playingIndex !== null) {
      audioRefs.current[playingIndex]?.pause();
    }

    try {
      await audio.play();
      setPlayingIndex(index);
    } catch {
      setPlayingIndex(null);
    }
  };

  const handleEnded = (index: number) => {
    setPlayingIndex((current) => (current === index ? null : current));
    const audio = audioRefs.current[index];
    if (audio) {
      audio.currentTime = 0;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen px-6 py-16 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeSoft }}
          viewport={{ once: true, amount: 0.6 }}
          className="flex flex-col gap-3"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-400/80">
            music protocol
          </p>
          <h2 className="text-3xl font-[var(--font-geist-sans)] font-semibold tracking-tight text-zinc-100 md:text-5xl">
            Your So0ngs
          </h2>
          <p className="max-w-xl text-sm text-zinc-400 md:text-base">
            Каждый — личное сообщение
          </p>
        </motion.header>

        <motion.div
          variants={trackStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-5"
        >
          <AnimatePresence>
            {tracks.map((track, index) => {
              const isPlaying = playingIndex === index;
              return (
                <motion.article
                  key={`${track.Title}-${track.Artist}`}
                  variants={trackItem}
                  className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-colors hover:border-emerald-500/70 md:p-6"
                >
                  <div className="flex items-start justify-between gap-4 sm:items-center">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-950 sm:h-20 sm:w-20">
                        <Image
                          src={track.CoverImage}
                          alt={`${track.Title} cover`}
                          fill
                          sizes="80px"
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 opacity-0 shadow-[0_0_24px_rgba(16,185,129,0.45)] transition group-hover:opacity-100" />
                      </div>
                      <div className="flex min-w-0 flex-col gap-2">
                        <div>
                          <p className="text-sm font-semibold text-zinc-100 md:text-base">
                            {track.Title}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                            {track.Artist}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-center sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2">
                      <button
                        type="button"
                        onClick={() => handleTogglePlay(index)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                          isPlaying
                            ? "border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                            : "border-zinc-700 text-zinc-300 hover:border-emerald-400 hover:text-emerald-300"
                        }`}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isPlaying && (
                          <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            className="flex items-end gap-1"
                          >
                            {[0, 1, 2, 3].map((bar) => (
                              <motion.span
                                key={bar}
                                animate={{ height: [6, 18, 10, 16, 8] }}
                                transition={{
                                  duration: 0.9,
                                  repeat: Infinity,
                                  ease: easeSoft,
                                  delay: bar * 0.12,
                                }}
                                className="w-1 rounded-full bg-emerald-400/80"
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <audio
                    ref={(element) => {
                      audioRefs.current[index] = element;
                    }}
                    src={track.AudioSrc}
                    preload="metadata"
                    onEnded={() => handleEnded(index)}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: easeSoft }}
                    className="mt-4 text-xs italic text-zinc-400 md:text-sm"
                  >
                    {track.PersonalNote}
                  </motion.p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const musicRef = useRef<HTMLElement | null>(null);
  const heroInView = useInView(heroRef, { amount: 0.7 });
  const hasAutoScrolled = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const canAutoScroll = useCallback(() => {
    const heroEl = heroRef.current;
    if (!heroEl) {
      return false;
    }
    const rect = heroEl.getBoundingClientRect();
    return rect.top <= -180;
  }, []);

  const scrollToMusic = useCallback(() => {
    if (hasAutoScrolled.current) {
      return;
    }
    hasAutoScrolled.current = true;
    musicRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (heroInView) {
      hasAutoScrolled.current = false;
    }
  }, [heroInView]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (
        !heroInView ||
        hasAutoScrolled.current ||
        event.deltaY <= 0 ||
        !canAutoScroll()
      ) {
        return;
      }
      event.preventDefault();
      scrollToMusic();
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!heroInView || hasAutoScrolled.current) {
        return;
      }
      if (!canAutoScroll()) {
        return;
      }
      const currentY = event.touches[0]?.clientY ?? null;
      if (touchStartY.current === null || currentY === null) {
        return;
      }
      if (touchStartY.current - currentY > 12) {
        scrollToMusic();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [heroInView, scrollToMusic, canAutoScroll]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-[140px]" />
      <div className="crt-overlay" aria-hidden="true" />
      <div className="archive-grain" aria-hidden="true" />
      <div className="archive-jitter" aria-hidden="true" />
      <div className="archive-vignette" aria-hidden="true" />
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-screen items-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:py-24"
        >
          <GlitchHeader />

          <motion.section
            variants={stack}
            className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]"
          >
            <HeroImage />
            <div className="flex flex-col gap-6">
              <CodeBlock />
              <ActionBtn />
            </div>
          </motion.section>
        </motion.div>
        <motion.button
          type="button"
          onClick={scrollToMusic}
          className="absolute bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-emerald-500/40 bg-zinc-950/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur md:bottom-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: easeSoft }}
        >
          <ArrowDown className="h-4 w-4" />
          scroll
        </motion.button>
      </section>
      <MusicSection sectionRef={musicRef} />
    </main>
  );
}
