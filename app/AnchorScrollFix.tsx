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
      let attempts = 0;
      const attempt = () => {
        attempts += 1;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          const distance = Math.abs(target.getBoundingClientRect().top);
          if (distance > 30 && attempts < 4) {
            attempt();
          } else {
            override.remove();
          }
        }, 400);
      };
      attempt();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
