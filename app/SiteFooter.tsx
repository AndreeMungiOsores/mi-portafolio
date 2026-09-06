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
          {headline ?? (
            <>
              {t.footerHeadlineLine1}
              <br />
              {t.footerHeadlineLine2}
            </>
          )}
        </h2>
        <a
          className="whatsapp-button"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label={t.whatsappAria}
        >
          <span className="whatsapp-icon" aria-hidden="true">
            ☎
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
