"use client";

import { useLanguage } from "./i18n";

const WHATSAPP = "https://wa.me/51961556197";

export function SiteFooter({
  kicker,
  headline,
  note,
}: {
  kicker?: string;
  headline?: React.ReactNode;
  note?: string;
}) {
  const { t } = useLanguage();

  return (
    <footer className="footer" id="contacto">
      <div className="shell footer-inner">
        <p>{kicker ?? t.footerKicker}</p>
        <h2>
          {headline ?? `${t.footerHeadlineLine1} ${t.footerHeadlineLine2}`}
        </h2>
        <a
          className="whatsapp-button"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label={t.whatsappAria}
        >
          <span className="whatsapp-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" focusable="false">
              <path d="M16.04 3.2c-7.05 0-12.78 5.66-12.78 12.63 0 2.23.6 4.4 1.74 6.31L3.15 28.8l6.86-1.78a12.9 12.9 0 0 0 6.03 1.51c7.05 0 12.78-5.66 12.78-12.63S23.09 3.2 16.04 3.2Zm0 22.96c-1.93 0-3.81-.53-5.45-1.54l-.39-.23-4.07 1.06 1.08-3.91-.26-.4a10.16 10.16 0 0 1-1.57-5.31c0-5.66 4.78-10.27 10.66-10.27 5.87 0 10.65 4.61 10.65 10.27 0 5.67-4.78 10.33-10.65 10.33Zm5.84-7.73c-.32-.16-1.88-.92-2.17-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.19.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.56-.95-.84-1.59-1.88-1.78-2.2-.19-.31-.02-.48.14-.64.15-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.68-.98-2.31-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.06-1.1 2.6s1.13 3.02 1.29 3.23c.16.21 2.23 3.36 5.4 4.71.76.32 1.35.51 1.81.65.76.24 1.45.2 2 .12.61-.09 1.88-.76 2.15-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.61-.37Z" />
            </svg>
          </span>
          <span>
            <small>{t.whatsappSmall}</small>
            {t.whatsappB}
          </span>
          <b aria-hidden="true">↗</b>
        </a>
        <div className="footer-row">
          <span>{note ?? t.footerNote}</span>
          <a href="#inicio">{t.backToTop}</a>
        </div>
      </div>
    </footer>
  );
}
