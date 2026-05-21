"use client";

import { useEffect, useState } from "react";
import ProjectDetails from "./ProjectDetails";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null,
  );

  useEffect(() => {
    params.then((data) => setResolvedParams(data));
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return <ProjectDetails params={resolvedParams} />;
}
