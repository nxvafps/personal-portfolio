import ProjectDetails from "./ProjectDetails";

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetails params={params} />;
}
