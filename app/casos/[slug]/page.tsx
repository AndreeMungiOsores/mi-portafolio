import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cases, coverOf, getCase } from "../../lib/cases";
import { CaseContent } from "./CaseContent";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.lead,
    alternates: { canonical: `/casos/${study.slug}` },
    openGraph: {
      title: `${study.title} · Mungi lat`,
      description: study.lead,
      images: [{ url: coverOf(study) }],
    },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getCase(slug)) notFound();
  return <CaseContent slug={slug} />;
}
