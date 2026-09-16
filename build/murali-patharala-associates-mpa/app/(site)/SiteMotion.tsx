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

      // Already-passed content stays visible for deep links and back navigation.
      const reveal = (element: HTMLElement, delay = 0) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        gsap.fromTo(element, { y: 28, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        });
      };

      document.querySelectorAll<HTMLElement>('[data-motion-reveal]').forEach((element) => reveal(element));
      document.querySelectorAll<HTMLElement>('[data-motion-group]').forEach((group) => {
        Array.from(group.children).forEach((child, index) => {
          if (child instanceof HTMLElement) reveal(child, (index % 3) * 0.09);
        });
      });

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

            const stepCenters = processSteps.map((step) => {
              const icon = step.querySelector<HTMLElement>('[data-process-icon]');
              if (!icon) return 0;
              const rect = icon.getBoundingClientRect();
              return (rect.top + rect.height / 2) - containerRect.top;
            });

            return { startY, totalDistance, stepCenters };
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

          let completedCount = -1;

          const updateStepStates = (nextCompletedCount: number) => {
            if (nextCompletedCount === completedCount) return;
            completedCount = nextCompletedCount;
            const currentIndex = Math.min(completedCount, processSteps.length - 1);

            processSteps.forEach((step, i) => {
              if (i < completedCount) {
                step.classList.remove('is-active');
                step.classList.add('is-completed');
              } else if (i === currentIndex && completedCount < processSteps.length) {
                step.classList.remove('is-completed');
                step.classList.add('is-active');
              } else {
                step.classList.remove('is-active');
                step.classList.remove('is-completed');
              }
            });

            if (currentMilestone) {
              const currentMilestoneNumber = Math.min(completedCount + 1, processSteps.length);
              const formatted = `${String(currentMilestoneNumber).padStart(2, '0')} / ${String(processSteps.length).padStart(2, '0')}`;
              if (currentMilestone.textContent !== formatted) {
                currentMilestone.textContent = formatted;
              }
            }
          };

          // Initialize with step 0 active
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

          // Single synchronized scroll trigger
          ScrollTrigger.create({
            trigger: stepsContainer,
            start: 'top 60%',
            end: 'bottom 60%',
            invalidateOnRefresh: true,
            onRefresh: () => {
              applyLayout();
            },
            onUpdate: (self) => {
              const progress = Math.max(0, Math.min(1, self.progress));
              setProgress(progress);
              setHeaderProgress?.(progress);

              if (!layout) return;
              const currentLineY = layout.startY + progress * layout.totalDistance;

              let nextCompletedCount = 0;
              if (progress > 0) {
                for (let i = 0; i < layout.stepCenters.length; i++) {
                  if (currentLineY >= layout.stepCenters[i]) {
                    nextCompletedCount = i + 1;
                  }
                }
              }

              updateStepStates(nextCompletedCount);
            },
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
