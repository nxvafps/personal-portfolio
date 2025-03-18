"use client";
import { ProjectsList } from "@/components/projects/ProjectsList";
import PageLayout from "@/components/layout/PageLayout";
import { Typography } from "@/components/ui/Typography";

export default function Projects() {
  return (
    <PageLayout variant="dark">
      <Typography.H1 variant="dark">Projects</Typography.H1>
      <ProjectsList />
    </PageLayout>
  );
}
