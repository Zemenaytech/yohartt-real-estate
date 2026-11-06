"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __lenis: import("lenis").default | null;
    __introDone?: boolean;
  }
}

type Cleanup = () => void;
type SplitInstance = { revert: () => void };

export default function ScrollAnimations() {
  useEffect(() => {
    let cancelled = false;
    let cleanups: Cleanup[] = [];

    (async () => {
      const [
        { gsap },
        { ScrollTrigger },
        { MorphSVGPlugin },
        { SplitText },
        { default: Lenis },
      ] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/MorphSVGPlugin"),
        import("gsap/SplitText"),
        import("lenis"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, SplitText);

      // Wait for fonts before measuring and splitting text.
      try {
        await document.fonts.ready;
      } catch {
        // Continue if font readiness cannot be determined.
      }

      if (cancelled) return;

      /* --------------------------- Lenis --------------------------- */

      const lenis = new Lenis({
        smoothWheel: true,
        duration: 1.1,
      });

      lenis.stop();
      lenis.on("scroll", ScrollTrigger.update);

      const lenisRaf = (time: number): void => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);

      window.__lenis = lenis;

      const onIntroDone = (): void => {
        lenis.start();
      };

      window.addEventListener("intro:done", onIntroDone);

      if (window.__introDone) {
        lenis.start();
      }

      cleanups.push(() => {
        window.removeEventListener("intro:done", onIntroDone);
        gsap.ticker.remove(lenisRaf);

        try {
          lenis.destroy();
        } catch {
          // Ignore cleanup errors.
        }

        if (window.__lenis === lenis) {
          window.__lenis = null;
        }
      });

      /* --------------------------- Helpers ------------------------- */

      const contexts: Array<{ revert: () => void }> = [];
      const splits: SplitInstance[] = [];

      const inCtx = (
        root: HTMLElement | null,
        fn: () => void
      ): void => {
        if (!root) return;
        contexts.push(gsap.context(fn, root));
      };

      const split = (
        target: string | Element | Element[],
        vars: {
          type: string;
          wordsClass?: string;
          linesClass?: string;
        }
      ) => {
        const instance = new SplitText(target, vars);
        splits.push(instance);
        return instance;
      };

      const section = (id: string): HTMLElement | null =>
        document.getElementById(id);

      // Revert contexts first, then restore the original split text.
      cleanups.push(() => {
        contexts.forEach((context) => context.revert());
        contexts.length = 0;
      });

      cleanups.push(() => {
        splits.forEach((instance) => {
          try {
            instance.revert();
          } catch {
            // Ignore cleanup errors.
          }
        });

        splits.length = 0;
      });

      /* ---------------------- AnimatedText helper ------------------ */

      const revealText = (
        selector: string,
        kind: "heading" | "paragraph"
      ): void => {
        const isHeading = kind === "heading";

        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          const instance = split(element, {
            type: isHeading ? "chars,words" : "words",
            wordsClass: "word-wrap",
            linesClass: "line-wrap",
          });

          const targets = isHeading ? instance.chars : instance.words;

          if (!targets.length) return;

          gsap.from(targets, {
            opacity: 0,
            y: isHeading ? "2rem" : "1rem",
            x: "0rem",
            duration: 0.9,
            delay: isHeading ? 0.5 : 0,
            ease: "power3.out",
            stagger: isHeading ? 0.025 : 0.06,
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              toggleActions: "play none none none",
            },
          });
        });
      };

      // Start a timeline immediately when its trigger is already active.
      const q = (
        trigger: { isActive: boolean } | undefined,
        timeline: { play: () => unknown }
      ): void => {
        if (trigger && trigger.isActive) {
          timeline.play();
        }
      };

      /* ============================ Hero ============================ */
      // As the page leaves the hero (the automatic glide after the video
      // stops, or the visitor scrolling), it shrinks into a rounded card.

      const heroEl = document.querySelector<HTMLElement>("[data-hero]");

      inCtx(heroEl, () => {
        gsap.fromTo(
          heroEl,
          { scale: 1, borderRadius: 0 },
          {
            scale: 0.82,
            borderRadius: "2rem",
            transformOrigin: "50% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: heroEl,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      /* ================ Introduction (desktop) ==================== */

      const show = {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
        ease: "power1.inOut",
        pointerEvents: "auto" as const,
        overwrite: "auto" as const,
      };

      const hide = {
        opacity: 0,
        y: "2rem",
        filter: "blur(4px)",
        ease: "power1.inOut",
        pointerEvents: "none" as const,
        overwrite: "auto" as const,
      };

      const N = 0;
      const k = 0.08;
      const M = 0.20;
      const T = 0.35;
      const P = 0.28;
      const E = 0.65;
      const L = 0.08;
      const O = 1;
      const DOLLAR = 0.32;
      const ZED = 0.68;
      const S = 0.08;

      const introTrigger = {
        trigger: ".scroller",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      };

      const W = (progress: number): string =>
        `${100 * progress}% top`;

      inCtx(section("about"), () => {
        const c = {
          preheading1: split(".preheading1", {
            type: "chars, words",
          }),
          heading1: split(".heading1", {
            type: "words",
          }),
          heading2: split(".heading2", {
            type: "words",
          }),
          heading3: split(".heading3", {
            type: "chars, words",
          }),
          paragraph1: split(".paragraph1", {
            type: "words",
          }),
        };

        gsap.set(
          [
            c.preheading1.chars,
            c.heading1.words,
            c.heading2.words,
            c.heading3.chars,
            c.paragraph1.words,
            ".button1Wrap",
            ".button2Wrap",
            ".link",
          ],
          hide
        );

        gsap.set(".morphWrapper", {
          scale: 1.1,
          filter: "blur(4px)",
          opacity: 0,
        });

        gsap.set([".screen1", ".screen2", ".screen3"], {
          pointerEvents: "none",
        });

        gsap.set(".progress-num-1", {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set([".progress-num-2", ".progress-num-3"], {
          y: "1rem",
          opacity: 0,
          filter: "blur(4px)",
        });

        const isTablet = window.matchMedia(
          "(max-width: 1120px)"
        ).matches;

        const isLaptop = window.matchMedia(
          "(max-width: 1440px)"
        ).matches;

        const sizes = {
          desktop: {
            morph1Width: "20rem",
            morph1Height: "27rem",
            morph1Right: "16.66%",
            morph1Top: "14%",
            morph2Width: "35rem",
            morph2Height: "35rem",
            morph2Left: "0",
            morph2Bottom: "20%",
          },
          laptop: {
            morph1Width: "15rem",
            morph1Height: "20rem",
            morph1Right: "16.66%",
            morph1Top: "14%",
            morph2Width: "26.375rem",
            morph2Height: "26.188rem",
            morph2Left: "0",
            morph2Bottom: "20%",
          },
          tablet: {
            morph1Width: "30vh",
            morph1Height: "35vh",
            morph1Right: "0",
            morph1Top: "5vh",
            morph2Width: "42vh",
            morph2Height: "42vh",
            morph2Left: "-2vh",
            morph2Bottom: "55vh",
          },
        };

        const sz = sizes[
          isTablet ? "tablet" : isLaptop ? "laptop" : "desktop"
        ];

        const tl = gsap.timeline({
          scrollTrigger: introTrigger,
        });

        tl.set(".screen1", { pointerEvents: "auto" })
          .to(
            ".morphWrapper",
            {
              scale: 1,
              filter: "blur(0px)",
              opacity: 1,
              ease: "power1.inOut",
              duration: k,
            },
            N
          )
          .to(
            "#morphClip1 path",
            {
              morphSVG:
                "M612.999 748.068V103C612.999 53.8486 568.667 17.6575 522.631 29.2268L295.544 86.2962C274.234 91.6517 256.362 106.645 246.852 127.146L7.28559 616.516C-13.3912 661.088 11.8848 713.945 58.5972 723.818L525.25 822.446C570.586 832.028 612.999 796.077 612.999 748.068Z",
              ease: "none",
              duration: T,
            },
            M
          )
          .to(
            "#frame1",
            {
              width: sz.morph1Width,
              right: sz.morph1Right,
              top: sz.morph1Top,
              height: sz.morph1Height,
              ease: "power1.inOut",
              duration: T,
            },
            M
          )
          .to(".morph1ImgA", { opacity: 0, duration: T }, M)
          .to(".morph1ImgB", { opacity: 1, duration: T }, M)
          .to(".morph2ImgA", { opacity: 0, duration: T }, M)
          .to(".morph2ImgB", { opacity: 1, duration: T }, M)
          .to(
            "#morphClip2 path",
            {
              morphSVG:
                "M536.07 261.245L562.89 534.277C564.225 547.866 553.215 559.504 539.519 558.983L39.3218 539.961C27.4842 539.511 18.0011 530.038 17.5825 518.245L0.0149346 23.3565C-0.589468 6.32949 17.2665 -5.17794 32.6102 2.35034L523.555 243.229C530.574 246.673 535.308 253.488 536.07 261.245Z",
              ease: "none",
              duration: T,
            },
            M
          )
          .to(
            "#frame2",
            {
              width: sz.morph2Width,
              left: sz.morph2Left,
              bottom: sz.morph2Bottom,
              height: sz.morph2Height,
              ease: "power1.inOut",
              duration: T,
            },
            M
          )
          .to(
            ".morphWrapper",
            {
              xPercent: isTablet ? "0" : "-100",
              ease: "power1.inOut",
              duration: T,
            },
            M
          )
          .set(".screen1", { pointerEvents: "none" })
          .set(".screen2", { pointerEvents: "auto" })
          .to(
            ".morphWrapper",
            {
              scale: 1.1,
              filter: "blur(4px)",
              opacity: 0,
              ease: "power1.inOut",
              duration: L,
            },
            E
          )
          .to({}, { duration: 1 - E })
          .set(".screen2", { pointerEvents: "none" })
          .set(".screen3", { pointerEvents: "auto" });

        const screen1Tl = gsap
          .timeline({ paused: true })
          .to(
            c.preheading1.chars,
            { ...show, duration: 0.4, stagger: 0.02 },
            0
          )
          .to(
            c.heading1.words,
            { ...show, duration: 0.45, stagger: 0.025 },
            0.05
          )
          .to(".button1Wrap", { ...show, duration: 0.4 }, 0.15);

        const screen2Tl = gsap
          .timeline({ paused: true })
          .to(
            c.heading2.words,
            { ...show, duration: 0.45, stagger: 0.025 },
            0
          )
          .to(".button2Wrap", { ...show, duration: 0.4 }, 0.15);

        const screen3Tl = gsap
          .timeline({ paused: true })
          .to(
            c.heading3.chars,
            { ...show, duration: 0.4, stagger: 0.02 },
            0
          )
          .to(
            c.paragraph1.words,
            { ...show, duration: 0.45, stagger: 0.02 },
            0.05
          )
          .to(".link", { ...show, duration: 0.4 }, 0.15);

        q(
          ScrollTrigger.create({
            trigger: ".scroller",
            start: W(N),
            end: W(P),
            onEnter: () => screen1Tl.play(),
            onLeave: () => screen1Tl.reverse(),
            onEnterBack: () => screen1Tl.play(),
            onLeaveBack: () => screen1Tl.reverse(),
          }),
          screen1Tl
        );

        q(
          ScrollTrigger.create({
            trigger: ".scroller",
            start: W(DOLLAR),
            end: W(0.64),
            onEnter: () => screen2Tl.play(),
            onLeave: () => screen2Tl.reverse(),
            onEnterBack: () => screen2Tl.play(),
            onLeaveBack: () => screen2Tl.reverse(),
          }),
          screen2Tl
        );

        q(
          ScrollTrigger.create({
            trigger: ".scroller",
            start: W(ZED),
            end: "bottom top",
            onEnter: () => screen3Tl.play(),
            onLeave: () => screen3Tl.reverse(),
            onEnterBack: () => screen3Tl.play(),
            onLeaveBack: () => screen3Tl.reverse(),
          }),
          screen3Tl
        );

        gsap
          .timeline({ scrollTrigger: introTrigger })
          .to(
            ".progress-fill",
            { width: "100%", ease: "none", duration: O },
            0
          )
          .to(
            ".progress-num-1",
            {
              y: "-1rem",
              opacity: 0,
              filter: "blur(4px)",
              ease: "power1.inOut",
              duration: S,
            },
            DOLLAR
          )
          .to(
            ".progress-num-2",
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power1.inOut",
              duration: S,
            },
            DOLLAR
          )
          .to(
            ".progress-num-2",
            {
              y: "-1rem",
              opacity: 0,
              filter: "blur(4px)",
              ease: "power1.inOut",
              duration: S,
            },
            ZED
          )
          .to(
            ".progress-num-3",
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power1.inOut",
              duration: S,
            },
            ZED
          );

        gsap.to(".leafs", {
          repeat: -1,
          yoyo: true,
          duration: 4,
          ease: "power1.inOut",
          rotate: 5,
        });

        gsap.to(".intro-parallax", {
          scrollTrigger: {
            trigger: ".scroller",
            start: `bottom-=${window.innerHeight} top`,
            end: "bottom top",
            scrub: true,
          },
          y: "10rem",
          ease: "power1.inOut",
        });
      });

      /* ============== Introduction (mobile) ======================== */

      inCtx(section("about-mobile"), () => {
        const F = ".introduction-mobile";
        const G = `${F} .scroller-mobile`;

        const D = {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power1.inOut",
          pointerEvents: "auto" as const,
          overwrite: "auto" as const,
        };

        const V = {
          opacity: 0,
          y: "2rem",
          filter: "blur(4px)",
          ease: "power1.inOut",
          pointerEvents: "none" as const,
          overwrite: "auto" as const,
        };

        const U = {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1.1,
          ease: "power1.inOut",
        };

        const Z = {
          opacity: 0,
          filter: "blur(4px)",
          scale: 1,
          ease: "power1.inOut",
        };

        const Y = (progress: number, distance: number): string =>
          `top+=${Math.round(progress * distance)} top`;

        const scrollerEl = gsap.utils.toArray<HTMLElement>(
          ".scroller-mobile"
        )[0];

        const h = scrollerEl ? scrollerEl.offsetHeight : 0;

        const dist =
          h > 0
            ? Math.max(1, h - window.innerHeight)
            : Math.max(
                1,
                300 * (window.innerHeight / 100) - window.innerHeight
              );

        const m = {
          preheading1: split(`${F} .mobile-preheading1`, {
            type: "chars, words",
          }),
          heading1: split(`${F} .mobile-heading1`, {
            type: "words",
          }),
          heading2: split(`${F} .mobile-heading2`, {
            type: "words",
          }),
          heading3: split(`${F} .mobile-heading3`, {
            type: "chars, words",
          }),
          paragraph1: split(`${F} .mobile-paragraph1`, {
            type: "words",
          }),
        };

        gsap.set(
          [
            m.preheading1.chars,
            m.heading1.words,
            m.heading2.words,
            m.heading3.chars,
            m.paragraph1.words,
            `${F} .mobile-link`,
          ],
          V
        );

        gsap.set(`${F} .mobile-image`, Z);

        gsap.set(`${F} .progress-num-1`, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(
          [
            `${F} .progress-num-2`,
            `${F} .progress-num-3`,
            `${F} .progress-num-4`,
            `${F} .progress-num-5`,
          ],
          {
            y: "1rem",
            opacity: 0,
            filter: "blur(4px)",
          }
        );

        // Screens 2 and 4: reveal the masked images.
        [2, 4].forEach((num) => {
          const imgTl = gsap
            .timeline({ paused: true })
            .to(`${F} .screen${num} .mobile-image`, {
              ...U,
              duration: 0.45,
              stagger: 0.02,
            });

          q(
            ScrollTrigger.create({
              trigger: G,
              start: Y((num - 1) * 0.2, dist),
              end: Y(0.2 * num, dist),
              onEnter: () => imgTl.play(),
              onLeave: () => imgTl.reverse(),
              onEnterBack: () => imgTl.play(),
              onLeaveBack: () => imgTl.reverse(),
            }),
            imgTl
          );
        });

        const s1 = gsap
          .timeline({ paused: true })
          .to(
            m.preheading1.chars,
            { ...D, duration: 0.4, stagger: 0.02 },
            0
          )
          .to(
            m.heading1.words,
            { ...D, duration: 0.45, stagger: 0.025 },
            0.05
          );

        const s3 = gsap
          .timeline({ paused: true })
          .to(
            m.heading2.words,
            { ...D, duration: 0.45, stagger: 0.025 },
            0
          );

        const s5 = gsap
          .timeline({ paused: true })
          .to(
            m.heading3.chars,
            { ...D, duration: 0.4, stagger: 0.02 },
            0
          )
          .to(
            m.paragraph1.words,
            { ...D, duration: 0.45, stagger: 0.02 },
            0.05
          )
          .to(`${F} .mobile-link`, { ...D, duration: 0.4 }, 0.15);

        q(
          ScrollTrigger.create({
            trigger: G,
            start: "top top",
            end: Y(0.18, dist),
            onEnter: () => s1.play(),
            onLeave: () => s1.reverse(),
            onEnterBack: () => s1.play(),
            onLeaveBack: () => s1.reverse(),
          }),
          s1
        );

        q(
          ScrollTrigger.create({
            trigger: G,
            start: Y(0.4, dist),
            end: Y(0.58, dist),
            onEnter: () => s3.play(),
            onLeave: () => s3.reverse(),
            onEnterBack: () => s3.play(),
            onLeaveBack: () => s3.reverse(),
          }),
          s3
        );

        q(
          ScrollTrigger.create({
            trigger: G,
            start: Y(0.8, dist),
            end: "bottom bottom",
            onEnter: () => s5.play(),
            onLeave: () => s5.reverse(),
            onEnterBack: () => s5.play(),
            onLeaveBack: () => s5.reverse(),
          }),
          s5
        );

        const ptl = gsap.timeline({
          scrollTrigger: {
            trigger: G,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        ptl.to(
          `${F} .progress-fill`,
          { width: "100%", ease: "none", duration: 1 },
          0
        );

        for (let i = 1; i < 5; i++) {
          const pos = 0.2 * i;

          ptl
            .to(
              `${F} .progress-num-${i}`,
              {
                y: "-1rem",
                opacity: 0,
                filter: "blur(4px)",
                ease: "power1.inOut",
                duration: 0.12,
              },
              pos
            )
            .to(
              `${F} .progress-num-${i + 1}`,
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                ease: "power1.inOut",
                duration: 0.12,
              },
              pos
            );
        }

        gsap.to(`${F} .leafs`, {
          repeat: -1,
          yoyo: true,
          duration: 4,
          ease: "power1.inOut",
          rotate: 5,
        });
      });

      /* ============== Generic full-screen sections ================= */

      const genericSection = (id: string): void => {
        inCtx(section(id), () => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".trigger",
                scrub: true,
              },
            })
            .to(".background", {
              top: "+=20rem",
              ease: "power1.inOut",
            })
            .to(
              ".portrait",
              {
                top: "+=10rem",
                ease: "power1.inOut",
              },
              "<"
            );

          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".trigger",
                start: "top 70%",
              },
            })
            .fromTo(
              ".trigger",
              { clipPath: "inset(0% 100% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.7,
                ease: "power2.inOut",
              },
              0
            )
            .fromTo(
              ".background",
              { scale: 1.1 },
              {
                scale: 1,
                duration: 1.7,
                ease: "power2.inOut",
              },
              0
            );

          if (section(id)?.querySelector(".videoWrap")) {
            gsap.fromTo(
              ".videoWrap",
              {
                clipPath: "inset(0% 100% 0% 0%)",
                scale: 1.1,
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                duration: 1.2,
                delay: 1.3,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: ".videoWrap",
                },
              }
            );
          }
        });
      };

      [
        "Location",
        "BusinessSpaces",
        "Residences",
        "Amenities",
      ].forEach(genericSection);

      /* ========================== Around =========================== */

      inCtx(section("Around"), () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".trigger",
              start: "top 70%",
            },
          })
          .fromTo(
            ".reveal-image",
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power2.inOut",
            },
            0
          )
          .fromTo(
            ".reveal-content",
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power2.inOut",
            },
            0
          );
      });

      /* ===================== Progress on site ====================== */
      // The site photos wipe up one after another as the collage arrives.

      inCtx(section("Progress"), () => {
        gsap.fromTo(
          ".progress-reveal",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".project-progress__stages",
              start: "top 80%",
            },
          }
        );
        gsap.fromTo(
          ".progress-reveal img",
          { scale: 1.12 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".project-progress__stages",
              start: "top 80%",
            },
          }
        );
      });

      /* ====================== Roots (desktop) ====================== */

      inCtx(section("Roots"), () => {
        const huge = split("#Roots .huge", {
          type: "chars, words",
        });

        gsap.from(huge.chars, {
          x: "100vw",
          stagger: 0.1,
          duration: 1.7,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#Roots .trigger",
          },
        });

        // The two cards wipe up one after the other once the heading is in.
        gsap.fromTo(
          "#Roots .roots-card > div",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power2.inOut",
            stagger: 0.25,
            delay: 0.6,
            scrollTrigger: {
              trigger: "#Roots .trigger",
              start: "top 60%",
            },
          }
        );

        // Both rows drift down together as the section passes, so the text
        // and the pictures never move against each other.
        gsap.fromTo(
          ".roots-kicker-wrap",
          { y: "-4rem" },
          {
            y: "4rem",
            ease: "none",
            scrollTrigger: {
              trigger: "#Roots .trigger",
              scrub: true,
            },
          }
        );
      });

      /* ====================== Roots (mobile) ======================= */

      inCtx(section("RootsMobile"), () => {
        const eU = "#RootsMobile";

        const eY = {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power1.inOut",
          pointerEvents: "auto" as const,
          overwrite: "auto" as const,
        };

        const eq = {
          opacity: 0,
          y: "2rem",
          filter: "blur(4px)",
          ease: "power1.inOut",
          pointerEvents: "none" as const,
          overwrite: "auto" as const,
        };

        const eX = (progress: number): string =>
          `${100 * progress}% top`;

        const huge = split(`${eU} .roots-huge`, {
          type: "chars, words",
        });

        const paragraph = split(`${eU} .roots-paragraph`, {
          type: "words",
        });

        gsap.set(huge.chars, {
          x: "100vw",
          opacity: 0,
          filter: "blur(4px)",
        });

        gsap.set(`${eU} .roots-image`, {
          scale: 1.1,
          opacity: 0,
          filter: "blur(4px)",
        });

        gsap.set([paragraph.words, `${eU} .roots-button`], eq);

        gsap.set(`${eU} .progress-num-1`, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(`${eU} .progress-num-2`, {
          y: "1rem",
          opacity: 0,
          filter: "blur(4px)",
        });

        const charsTl = gsap
          .timeline({ paused: true })
          .to(huge.chars, {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            stagger: 0.08,
            ease: "power2.inOut",
          });

        const imgTl = gsap
          .timeline({ paused: true })
          .to(`${eU} .roots-image`, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.3,
            ease: "power2.inOut",
            delay: 1.5,
          });

        const eZ = `${eU} .roots-scroller`;

        q(
          ScrollTrigger.create({
            trigger: eZ,
            start: eX(0),
            end: eX(0.45),
            onEnter: () => {
              charsTl.restart();
              imgTl.restart();
            },
            onEnterBack: () => {
              charsTl.restart();
              imgTl.restart();
            },
            onLeave: () => {
              charsTl.reverse();
              imgTl.reverse();
            },
            onLeaveBack: () => {
              charsTl.reverse();
              imgTl.reverse();
            },
          }),
          charsTl
        );

        const textTl = gsap
          .timeline({ paused: true })
          .to(paragraph.words, {
            ...eY,
            duration: 0.8,
            stagger: 0.05,
          })
          .to(
            `${eU} .roots-button`,
            { ...eY, duration: 0.8 },
            0.15
          );

        q(
          ScrollTrigger.create({
            trigger: eZ,
            start: eX(0.5),
            end: "bottom bottom",
            onEnter: () => textTl.play(),
            onEnterBack: () => textTl.play(),
            onLeaveBack: () => textTl.reverse(),
          }),
          textTl
        );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: eZ,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          })
          .to(
            `${eU} .progress-fill`,
            { width: "100%", ease: "none", duration: 1 },
            0
          )
          .to(
            `${eU} .progress-num-1`,
            {
              y: "-1rem",
              opacity: 0,
              filter: "blur(4px)",
              ease: "power1.inOut",
              duration: 0.14,
            },
            0.5
          )
          .to(
            `${eU} .progress-num-2`,
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              ease: "power1.inOut",
              duration: 0.14,
            },
            0.5
          );
      });

      /* ======================= Installment ========================= */

      inCtx(section("Installment"), () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".installment-trigger",
              start: "top 70%",
            },
          })
          .fromTo(
            ".installment-reveal-image",
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power2.inOut",
            },
            0
          )
          .fromTo(
            ".installment-reveal-content",
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power2.inOut",
            },
            0
          )
          .fromTo(
            ".installment-reveal-image .reveal-image-zoom",
            { scale: 1.05 },
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.inOut",
            },
            0
          );
      });

      /* ======================== Horizontal ========================= */

      inCtx(section("Horizontal"), () => {
        const heading = split(".heading", {
          type: "words, chars",
        });

        const img = document.querySelector<HTMLImageElement>(
          ".horizontal-image"
        );

        if (!img) return;

        const range = (): { start: number; end: number } =>
          window.matchMedia("(max-width: 600px)").matches
            ? { start: 0.22, end: 0.78 }
            : window.matchMedia("(max-width: 1120px)").matches
              ? { start: 0.15, end: 0.85 }
              : { start: 0, end: 1 };

        const xFor = (progress: number): number =>
          -(img.scrollWidth - window.innerWidth) * progress;

        const setMarkers = (): void => {
          const markers = document.querySelector<HTMLElement>(
            ".horizontal-markers"
          );

          if (markers) {
            markers.style.width = `${img.scrollWidth}px`;
          }
        };

        setMarkers();

        gsap.fromTo(
          heading.chars,
          {
            opacity: 0,
            y: "15%",
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: "0%",
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.04,
            ease: "power1.out",
            scrollTrigger: {
              trigger: ".trigger",
              start: "top 80%",
            },
          }
        );

        gsap.to(".reveal", {
          width: "0%",
          ease: "power1.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: ".trigger",
            start: "top 70%",
          },
        });

        const pin = gsap.timeline({
          scrollTrigger: {
            trigger: ".trigger",
            start: "top top",
            end: () =>
              `+=${2 * (img.scrollWidth - window.innerWidth)}`,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
            onRefresh: setMarkers,
          },
        });

        pin
          .fromTo(
            [".horizontal-image", ".horizontal-markers"],
            { x: () => xFor(range().start) },
            { x: () => xFor(range().end), ease: "power1.inOut", duration: 1 },
            0
          )
          .to(
            ".cloud1",
            { left: "-=10%", ease: "power1.inOut", duration: 1 },
            0
          )
          .to(
            ".cloud2",
            { left: "-=20%", ease: "power1.inOut", duration: 1 },
            0
          )
          .to(
            ".cloud3",
            { left: "-=30%", ease: "power1.inOut", duration: 1 },
            0
          )
          .to(
            ".heading",
            { left: "-=10%", ease: "power1.inOut", duration: 1 },
            0
          )
          .fromTo(
            heading.chars,
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            },
            {
              opacity: 0,
              scale: 0.85,
              filter: "blur(10px)",
              stagger: 0.02,
              ease: "power1.in",
              duration: 0.2,
            },
            0.8
          );

        if (!(img.complete && img.naturalWidth !== 0)) {
          img.addEventListener(
            "load",
            () => {
              setMarkers();
              ScrollTrigger.refresh();
            },
            { once: true }
          );
        }
      });

      /* =========================== Footer ========================== */

      const footerEl = document.querySelector<HTMLElement>("footer");

      inCtx(footerEl, () => {
        gsap.from(".fadeElement", {
          opacity: 0,
          y: "2rem",
          x: "-2rem",
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".wrapper",
          },
        });

        if (
          footerEl?.querySelector(".front") &&
          footerEl.querySelector(".scroller")
        ) {
          // The tower rises a little as the footer comes in and lands on
          // the band when the footer's sky is fully on screen.
          gsap.fromTo(
            ".front",
            { yPercent: 8 },
            {
              yPercent: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ".scroller",
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );
        }
      });

      /* ===================== AnimatedText reveals ================== */

      const textTargets: Array<
        [string, Array<[string, "heading" | "paragraph"]>]
      > = [
        [
          "BusinessSpaces",
          [
            ["h2.hero", "heading"],
            ["p.paragraph", "paragraph"],
          ],
        ],
        [
          "Location",
          [
            ["h2.hero", "heading"],
            ["p.paragraph", "paragraph"],
          ],
        ],
        [
          "Residences",
          [
            ["h2.hero", "heading"],
            ["p.paragraph", "paragraph"],
          ],
        ],
        [
          "Amenities",
          [
            ["h2.hero", "heading"],
            ["p.paragraph", "paragraph"],
          ],
        ],
        [
          "Roots",
          [
            ["p.kicker", "heading"],
            ["p.heading-2", "heading"],
          ],
        ],
        [
          "RootsMobile",
          [["p.kicker", "heading"]],
        ],
        [
          "Around",
          [
            ["p.kicker.uppercase:not([class~='mb-4'])", "heading"],
            [".list p.heading-2", "heading"],
          ],
        ],
        [
          "Installment",
          [
            [".heading-2", "heading"],
            [".detail", "heading"],
          ],
        ],
      ];

      textTargets.forEach(([id, targets]) => {
        inCtx(section(id), () => {
          targets.forEach(([selector, kind]) => {
            revealText(selector, kind);
          });
        });
      });

      if (footerEl) {
        inCtx(footerEl, () => {
          revealText("p.heading-2", "heading");
          revealText("p.paragraph", "paragraph");
          revealText("p.small", "paragraph");
        });
      }

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;

      cleanups.forEach((cleanup) => {
        try {
          cleanup();
        } catch {
        }
      });

      cleanups = [];
    };
  }, []);

  return null;
}
