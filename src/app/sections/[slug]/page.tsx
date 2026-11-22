import { SectionClient } from "./section-client";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SectionClient slug={slug} />;
}
