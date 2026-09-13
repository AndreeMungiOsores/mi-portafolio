"use client";

import { useEffect } from "react";

/**
 * `scroll-snap-type: mandatory` rejects programmatic scrolling outright —
 * scrollTo()/scrollIntoView() silently no-op, confirmed via direct scrollY
 * inspection, not just anchor clicks. Real wheel gestures are unaffected.
 * Toggling `element.style.scrollSnapType` does NOT fix it: Chromium's
 * scroll-snap-container registration doesn't reliably invalidate from an
 * inline style mutation on the root. Only a real stylesheet rule (with
 * `!important`, added/removed as an actual <style> element) does. This
 * intercepts same-page hash links, disables snap that way for the duration
 * of the jump, then removes the override.
 */
export function AnchorScrollFix() {
  useEffect(() => {
    const projectSnapOverride = document.createElement("style");
    projectSnapOverride.textContent = `
      html.projects-stack-active {
        scroll-snap-type: none !important;
      }

      html.projects-stack-active .section-intro,
      html.projects-stack-active .project-card {
        scroll-snap-align: none !important;
        scroll-snap-stop: normal !important;
      }
    `;
    document.head.appendChild(projectSnapOverride);

    let frame = 0;
    const setProjectSnapMode = () => {
      frame = 0;
      const projectSection = document.getElementById("proyectos");
      const projectList = document.querySelector<HTMLElement>(".project-list");
      if (!projectSection || !projectList) return;

      const sectionRect = projectSection.getBoundingClientRect();
      const listRect = projectList.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const isInsideProjectStack =
        (sectionRect.top < viewportHeight * 0.92 &&
          sectionRect.bottom > viewportHeight * 0.18) ||
        (listRect.top < viewportHeight * 0.72 && listRect.bottom > viewportHeight * 0.34);

      document.documentElement.classList.toggle("projects-stack-active", isInsideProjectStack);
    };

    const scheduleProjectSnapMode = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(setProjectSnapMode);
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();

      const override = document.createElement("style");
      override.textContent = "* { scroll-snap-type: none !important; }";
      document.head.appendChild(override);
      history.pushState(null, "", `#${id}`);

      // The jump is occasionally interrupted (observed even with snap
      // disabled — likely a late layout shift colliding with the smooth
      // scroll). Confirm it actually landed; retry a few times before
      // giving up, so a transient interruption doesn't strand the user.
      const centerTargets = new Set(["capacidades", "contacto"]);
      const block = centerTargets.has(id) ? "center" : "start";
      let attempts = 0;
      const attempt = () => {
        attempts += 1;
        target.scrollIntoView({ behavior: "smooth", block });
        setTimeout(() => {
          const rect = target.getBoundingClientRect();
          const distance =
            block === "center"
              ? Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
              : Math.abs(rect.top);
          if (distance > 30 && attempts < 4) {
            attempt();
          } else {
            override.remove();
            scheduleProjectSnapMode();
          }
        }, 400);
      };
      attempt();
    };

    setProjectSnapMode();
    window.addEventListener("scroll", scheduleProjectSnapMode, { passive: true });
    window.addEventListener("resize", scheduleProjectSnapMode);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", scheduleProjectSnapMode);
      window.removeEventListener("resize", scheduleProjectSnapMode);
      if (frame) window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("projects-stack-active");
      projectSnapOverride.remove();
    };
  }, []);

  return null;
}
