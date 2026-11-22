import { ProcedureClient } from "./procedure-client";

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ slug: string; procedure: string }>;
}) {
  const { slug, procedure } = await params;
  return <ProcedureClient slug={slug} procedureSlug={procedure} />;
}
