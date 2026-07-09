"use client";

import { Braces, FileText, Github, Linkedin, Mail, Terminal } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { siteConfig, type SocialLink } from "@/lib/data/site";

type NodePoint = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
};

type Packet = {
  from: number;
  to: number;
  speed: number;
  progress: number;
};

const statusMessages = ["rag index warm", "inference path live", "latency budget watched"];

const ctaLinks: Array<SocialLink & { icon: ComponentType<{ size?: number }> }> = [
  { ...siteConfig.links.github, icon: Github },
  { ...siteConfig.links.linkedin, icon: Linkedin },
  { ...siteConfig.links.leetcode, icon: Braces },
  { ...siteConfig.links.codeforces, icon: Terminal },
  { ...siteConfig.links.email, icon: Mail },
  { ...siteConfig.links.resume, icon: FileText },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const reducedMotionRef = useRef(false);
  const [statusIndex, setStatusIndex] = useState(0);

  const proof = useMemo(() => siteConfig.proof.slice(0, 3), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
    };

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    if (media.matches) {
      return () => media.removeEventListener("change", updateMotionPreference);
    }

    const timer = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % statusMessages.length);
    }, 2200);

    return () => {
      window.clearInterval(timer);
      media.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const nodes: NodePoint[] = [
      { x: 0.16, y: 0.25, baseX: 0.16, baseY: 0.25, phase: 0.1 },
      { x: 0.34, y: 0.58, baseX: 0.34, baseY: 0.58, phase: 1.4 },
      { x: 0.52, y: 0.32, baseX: 0.52, baseY: 0.32, phase: 2.3 },
      { x: 0.68, y: 0.7, baseX: 0.68, baseY: 0.7, phase: 3.1 },
      { x: 0.82, y: 0.42, baseX: 0.82, baseY: 0.42, phase: 4.2 },
      { x: 0.5, y: 0.82, baseX: 0.5, baseY: 0.82, phase: 5.1 },
    ];

    const edges = [
      [0, 1],
      [0, 2],
      [1, 2],
      [1, 5],
      [2, 4],
      [2, 3],
      [3, 4],
      [3, 5],
    ];

    const packets: Packet[] = edges.map(([from, to], index) => ({
      from,
      to,
      speed: 0.002 + index * 0.00015,
      progress: (index * 0.17) % 1,
    }));

    let frameId = 0;
    let width = 0;
    let height = 0;
    let deviceScale = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      deviceScale = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * deviceScale);
      canvas.height = Math.floor(height * deviceScale);
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
    };

    const draw = (time = 0) => {
      const reduced = reducedMotionRef.current;
      context.clearRect(0, 0, width, height);

      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "#2bb3a3";
      const warm = styles.getPropertyValue("--accent-alt").trim() || "#e0b15a";
      const line = styles.getPropertyValue("--line").trim() || "#9aa6b2";
      const foreground = styles.getPropertyValue("--foreground").trim() || "#1f2933";

      nodes.forEach((node) => {
        const driftX = reduced ? 0 : Math.sin(time * 0.001 + node.phase) * 0.015;
        const driftY = reduced ? 0 : Math.cos(time * 0.0012 + node.phase) * 0.012;
        let targetX = node.baseX + driftX;
        let targetY = node.baseY + driftY;

        if (!reduced && pointerRef.current.active) {
          const dx = node.baseX - pointerRef.current.x;
          const dy = node.baseY - pointerRef.current.y;
          const distance = Math.hypot(dx, dy);
          const pull = Math.max(0, 0.22 - distance) * 0.28;
          targetX += dx * pull;
          targetY += dy * pull;
        }

        node.x = lerp(node.x, targetX, 0.08);
        node.y = lerp(node.y, targetY, 0.08);
      });

      context.lineWidth = 1;
      edges.forEach(([from, to]) => {
        const start = nodes[from];
        const end = nodes[to];
        context.beginPath();
        context.moveTo(start.x * width, start.y * height);
        context.lineTo(end.x * width, end.y * height);
        context.strokeStyle = line;
        context.globalAlpha = 0.32;
        context.stroke();
      });

      packets.forEach((packet, index) => {
        const start = nodes[packet.from];
        const end = nodes[packet.to];
        const x = lerp(start.x, end.x, packet.progress) * width;
        const y = lerp(start.y, end.y, packet.progress) * height;

        context.beginPath();
        context.arc(x, y, index % 3 === 0 ? 4 : 3, 0, Math.PI * 2);
        context.fillStyle = index % 3 === 0 ? warm : accent;
        context.globalAlpha = 0.9;
        context.fill();

        if (!reduced) {
          packet.progress = (packet.progress + packet.speed) % 1;
        }
      });

      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;
        context.beginPath();
        context.arc(x, y, index === 2 ? 8 : 6, 0, Math.PI * 2);
        context.fillStyle = foreground;
        context.globalAlpha = 0.94;
        context.fill();

        context.beginPath();
        context.arc(x, y, index === 2 ? 15 : 12, 0, Math.PI * 2);
        context.strokeStyle = index === 2 ? warm : accent;
        context.globalAlpha = index === 2 ? 0.55 : 0.36;
        context.stroke();
      });

      context.globalAlpha = 1;

      if (!reduced) {
        frameId = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
        active: true,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section className="grid min-h-[72vh] content-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
      <div className="max-w-2xl">
        <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-xs text-[color:var(--muted)]">
          <span className="text-[color:var(--accent)]">systems / ai / realtime</span>
          <span aria-label="Discord status placeholder" className="text-[color:var(--accent-alt)]">
            · online
          </span>
        </div>

        <p className="font-display text-lg font-medium text-[color:var(--foreground)]">{siteConfig.name}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-[color:var(--foreground)] sm:text-6xl">
          I build the parts where distributed systems have to talk to models in real time.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[color:var(--muted)]">
          I am a CSE undergrad at IIT Jodhpur, usually somewhere between queues, retrieval,
          inference paths, and the small reliability details that make software feel alive.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {ctaLinks.map(({ icon: Icon, ...link }) => (
            <a
              className="focus-ring inline-flex h-10 items-center gap-2 border border-[color:var(--line)]/40 bg-[color:var(--surface)] px-3 font-mono text-xs text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              href={link.href}
              key={link.label}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              <Icon size={15} />
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {proof.map((item) => (
            <span
              className="border border-[color:var(--line)]/35 px-3 py-2 font-mono text-xs text-[color:var(--muted)]"
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-h-[390px] overflow-hidden border border-[color:var(--line)]/35 bg-[color:var(--surface)]">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-[color:var(--line)]/25 bg-[color:var(--background)]/60 px-4 py-3 font-mono text-xs text-[color:var(--muted)] backdrop-blur">
          <span>$ status --watch</span>
          <span className="text-[color:var(--accent)]">{statusMessages[statusIndex]}</span>
        </div>
        <canvas
          aria-label="Animated distributed systems node map"
          className="absolute inset-0 h-full w-full touch-none"
          ref={canvasRef}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 border-t border-[color:var(--line)]/25 bg-[color:var(--background)]/68 px-4 py-3 font-mono text-xs text-[color:var(--muted)] backdrop-blur">
          packet stream: client -&gt; retriever -&gt; model -&gt; cache
        </div>
      </div>
    </section>
  );
}
