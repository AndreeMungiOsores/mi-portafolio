"use client";

import Link from "next/link";
import { useLanguage } from "../i18n";
import { FACEBOOK_URL, INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_URL } from "../copy";
import { Logo } from "./ui";

export function SiteFooter() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="foot">
      <div className="shell foot-grid">
        <div>
          <Logo />
          <p className="foot-tag">{f.tagline}</p>
        </div>
        <div>
          <h4>{f.services}</h4>
          <ul>
            <li><Link href="/servicios#software">{f.links.software}</Link></li>
            <li><Link href="/servicios#automatizacion">{f.links.automation}</Link></li>
            <li><Link href="/servicios/web">{f.links.web}</Link></li>
            <li><Link href="/servicios/videos">{f.links.video}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{f.site}</h4>
          <ul>
            <li><Link href="/casos">{f.links.cases}</Link></li>
            <li><Link href="/nosotros">{f.links.about}</Link></li>
            <li><Link href="/nosotros#contacto">{f.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{f.contact}</h4>
          <ul>
            <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp {WHATSAPP_NUMBER}</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram @mungi.lat</a></li>
            <li><a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook Mungi lat</a></li>
          </ul>
        </div>
        <div className="foot-base">
          <span>{f.rights}</span>
          <span>mungi.lat</span>
        </div>
      </div>
    </footer>
  );
}
