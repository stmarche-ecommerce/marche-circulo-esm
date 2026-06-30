
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SitePageRenderer } from "@/components/ui/site-page-renderer";
import { sitePages, sitePagesBySlug } from "@/lib/site-config";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = sitePagesBySlug[slug];

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.slug }));
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params;
  const page = sitePagesBySlug[slug];

  if (!page) {
    notFound();
  }

  return <SitePageRenderer page={page} />;
}
