'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/** One scroll owner and scoped animation lifecycle for each route. */
export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -90 },
        allowNestedScroll: false,
        stopInertiaOnNavigate: true,
        prevent: (node) => node.id === 'mobile-navigation',
      });
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const cleanups: Array<() => void> = [];

      // Keep content readable during fast scrolling and after layout changes.
      const reveal = (element: HTMLElement) => {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        gsap.fromTo(element, { y: 12 }, {
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: element, start: 'top bottom', once: true },
        });
      };

      document.querySelectorAll<HTMLElement>('[data-motion-reveal]').forEach((element) => reveal(element));
      document.querySelectorAll<HTMLElement>('[data-motion-group]').forEach((group) => {
        Array.from(group.children).forEach((child) => {
          if (child instanceof HTMLElement) reveal(child);
        });
      });

      const evolutionTimeline = document.querySelector<HTMLElement>('[data-evolution-timeline]');
      const evolutionTrack = evolutionTimeline?.querySelector<HTMLElement>('[data-evolution-track]');
      const evolutionProgress = evolutionTimeline?.querySelector<HTMLElement>('[data-evolution-progress]');
      const evolutionNodes = Array.from(evolutionTimeline?.querySelectorAll<HTMLElement>('[data-evolution-node]') ?? []);
      const evolutionSteps = Array.from(evolutionTimeline?.querySelectorAll<HTMLElement>('[data-evolution-step]') ?? []);

      if (evolutionTimeline && evolutionTrack && evolutionProgress && evolutionNodes.length > 1 && evolutionSteps.length === evolutionNodes.length) {
        const firstNode = evolutionNodes[0];
        const lastNode = evolutionNodes[evolutionNodes.length - 1];
        let milestoneProgress: number[] = [];
        const measureEvolutionLine = () => {
          const timelineRect = evolutionTimeline.getBoundingClientRect();
          const firstRect = firstNode.getBoundingClientRect();
          const lastRect = lastNode.getBoundingClientRect();
          const start = firstRect.top + firstRect.height / 2 - timelineRect.top;
          const end = lastRect.top + lastRect.height / 2 - timelineRect.top;

          for (const line of [evolutionTrack, evolutionProgress]) {
            line.style.top = `${start}px`;
            line.style.height = `${Math.max(0, end - start)}px`;
          }

          milestoneProgress = evolutionNodes.map((node) => {
            const rect = node.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - timelineRect.top;
            return (center - start) / Math.max(1, end - start);
          });
        };

        measureEvolutionLine();
        gsap.set(evolutionProgress, { scaleY: 0, force3D: true });
        const setEvolutionProgress = gsap.quickSetter(evolutionProgress, 'scaleY');
        let activeMilestone = -1;
        const highlightMilestone = (progress: number) => {
          let nextMilestone = 0;
          for (let index = 1; index < milestoneProgress.length; index++) {
            if (progress >= milestoneProgress[index] - 0.001) nextMilestone = index;
          }
          if (nextMilestone === activeMilestone) return;
          activeMilestone = nextMilestone;
          evolutionSteps.forEach((step, index) => {
            if (index === nextMilestone) step.setAttribute('data-active', 'true');
            else step.removeAttribute('data-active');
          });
        };

        ScrollTrigger.create({
          trigger: firstNode,
          start: 'center 65%',
          endTrigger: lastNode,
          end: 'center 65%',
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            measureEvolutionLine();
            setEvolutionProgress(self.progress);
            highlightMilestone(self.progress);
          },
          onUpdate: (self) => {
            setEvolutionProgress(self.progress);
            highlightMilestone(self.progress);
          },
        });
        cleanups.push(() => evolutionSteps.forEach((step) => step.removeAttribute('data-active')));
      }

      const stepsContainer = document.querySelector<HTMLElement>('[data-process-steps]');
      const track = document.querySelector<HTMLElement>('[data-process-track]');
      const progressLine = document.querySelector<HTMLElement>('[data-process-progress]');
      const currentMilestone = document.querySelector<HTMLElement>('[data-process-current]');
      const headerRail = document.querySelector<HTMLElement>('[data-process-header-rail]');

      if (stepsContainer && track && progressLine) {
        const processSteps = Array.from(stepsContainer.querySelectorAll<HTMLElement>('[data-process-step]'));

        if (processSteps.length > 0) {
          const measureLayout = () => {
            const containerRect = stepsContainer.getBoundingClientRect();
            const firstStep = processSteps[0];
            const lastStep = processSteps[processSteps.length - 1];

            const firstIcon = firstStep.querySelector<HTMLElement>('[data-process-icon]');
            const lastIcon = lastStep.querySelector<HTMLElement>('[data-process-icon]');

            if (!firstIcon || !lastIcon) return null;

            const firstIconRect = firstIcon.getBoundingClientRect();
            const lastIconRect = lastIcon.getBoundingClientRect();

            const startY = (firstIconRect.top + firstIconRect.height / 2) - containerRect.top;
            const endY = (lastIconRect.top + lastIconRect.height / 2) - containerRect.top;
            const totalDistance = Math.max(0, endY - startY);

            const stepEntryPoints = processSteps.map((step) => {
              const icon = step.querySelector<HTMLElement>('[data-process-icon]');
              if (!icon) return 0;
              const rect = icon.getBoundingClientRect();
              return rect.top - containerRect.top;
            });

            return { startY, totalDistance, stepEntryPoints };
          };

          let layout = measureLayout();

          const applyLayout = () => {
            layout = measureLayout();
            if (!layout) return;
            track.style.top = `${layout.startY}px`;
            track.style.height = `${layout.totalDistance}px`;
            progressLine.style.top = `${layout.startY}px`;
            progressLine.style.height = `${layout.totalDistance}px`;
          };

          applyLayout();

          let currentActiveIndex = -1;

          const updateStepStates = (activeIndex: number) => {
            const clampedIndex = Math.max(0, Math.min(activeIndex, processSteps.length - 1));
            if (clampedIndex === currentActiveIndex) return;
            currentActiveIndex = clampedIndex;

            processSteps.forEach((step, i) => {
              if (i < clampedIndex) {
                step.classList.remove('is-active');
                step.classList.add('is-completed');
              } else if (i === clampedIndex) {
                step.classList.remove('is-completed');
                step.classList.add('is-active');
              } else {
                step.classList.remove('is-active');
                step.classList.remove('is-completed');
              }
            });

            if (currentMilestone) {
              const formatted = `${String(clampedIndex + 1).padStart(2, '0')} / ${String(processSteps.length).padStart(2, '0')}`;
              if (currentMilestone.textContent !== formatted) {
                currentMilestone.textContent = formatted;
              }
            }
          };

          // The line begins at the first icon, so that icon is highlighted first as active.
          updateStepStates(0);
          const setProgress = gsap.quickSetter(progressLine, 'scaleY');
          const setHeaderProgress = headerRail ? gsap.quickSetter(headerRail, 'scaleX') : null;
          gsap.set(progressLine, { scaleY: 0, force3D: true });
          if (headerRail) gsap.set(headerRail, { scaleX: 0, force3D: true });

          // Keep programmatic navigation on the same scroll engine as wheel input.
          processSteps.forEach((step) => {
            step.style.cursor = 'pointer';
            const handleClick = () => {
              const centeredOffset = -(window.innerHeight - step.offsetHeight) / 2;
              lenis.scrollTo(step, { offset: centeredOffset, duration: 0.75 });
            };
            step.addEventListener('click', handleClick);
            cleanups.push(() => {
              step.removeEventListener('click', handleClick);
              step.style.removeProperty('cursor');
            });
          });

          const updateProcessProgress = (progress: number) => {
            const clampedProgress = Math.max(0, Math.min(1, progress));
            setProgress(clampedProgress);
            setHeaderProgress?.(clampedProgress);

            if (!layout) return;
            const currentLineY = layout.startY + clampedProgress * layout.totalDistance;
            let activeIdx = 0;
            for (let i = 0; i < layout.stepEntryPoints.length; i++) {
              if (currentLineY >= layout.stepEntryPoints[i]) {
                activeIdx = i;
              }
            }
            updateStepStates(activeIdx);
          };

          // Single synchronized scroll trigger
          ScrollTrigger.create({
            trigger: stepsContainer,
            start: 'top 60%',
            end: 'bottom 60%',
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              applyLayout();
              updateProcessProgress(self.progress);
            },
            onUpdate: (self) => updateProcessProgress(self.progress),
          });

          // Text wrapping can change after hydration or font loading. Rebuild the
          // line and scroll range whenever the milestone rows change size.
          let resizeFrame = 0;
          const processResizeObserver = new ResizeObserver(() => {
            if (resizeFrame) return;
            resizeFrame = requestAnimationFrame(() => {
              resizeFrame = 0;
              lenis.resize();
              ScrollTrigger.refresh();
            });
          });
          processResizeObserver.observe(stepsContainer);
          processSteps.forEach((step) => processResizeObserver.observe(step));
          cleanups.push(() => {
            processResizeObserver.disconnect();
            cancelAnimationFrame(resizeFrame);
          });
        }
      }

      // Re-measure after fonts and late-loading media settle; guard async cleanup.
      let disposed = false;
      const refresh = () => {
        if (!disposed) {
          lenis.resize();
          ScrollTrigger.refresh();
        }
      };
      const frame = requestAnimationFrame(refresh);
      void document.fonts.ready.then(refresh);
      window.addEventListener('load', refresh);

      return () => {
        disposed = true;
        cleanups.forEach((cleanup) => cleanup());
        cancelAnimationFrame(frame);
        window.removeEventListener('load', refresh);
        gsap.ticker.remove(tick);
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
      };
    });

    // Reverts only this component's tweens/triggers, including inline styles.
    return () => media.revert();
  }, [pathname]);

  return null;
}
