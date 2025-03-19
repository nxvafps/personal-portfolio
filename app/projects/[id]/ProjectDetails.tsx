"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/lib/theme";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { allTechnologyIcons } from "@/app/assets/icons";

const ProjectDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
`;

const ProjectHeader = styled.div`
  margin-bottom: ${theme.spacing[8]};
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  margin: ${theme.spacing[6]} 0;
`;

const ProjectSection = styled(Card)`
  && {
    background-color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing[6]};
    padding: ${theme.spacing[6]};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[4]};
`;

const Tag = styled.span`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.text.light};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const TechIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

const ProjectStatus = styled.div<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${({ status }) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "rgba(16, 185, 129, 0.15)";
      case "in_progress":
        return "rgba(59, 130, 246, 0.15)";
      case "planned":
        return "rgba(249, 115, 22, 0.15)";
      default:
        return "rgba(107, 114, 128, 0.15)";
    }
  }};
  color: ${({ status }) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#10B981";
      case "in_progress":
        return "#3B82F6";
      case "planned":
        return "#F97316";
      default:
        return "#6B7280";
    }
  }};
  border-radius: ${theme.borderRadius.full};
  font-weight: 600;
  margin-top: ${theme.spacing[4]};
`;

const LinkButton = styled(Button)`
  margin-right: ${theme.spacing[4]};
  margin-top: ${theme.spacing[4]};
`;

const MetaInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[6]};
  padding-top: ${theme.spacing[6]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MetaItem = styled.div`
  h3 {
    color: ${theme.colors.text.light};
    opacity: 0.7;
    font-size: ${theme.typography.fontSize.sm};
    margin-bottom: ${theme.spacing[2]};
  }

  p {
    color: ${theme.colors.text.light};
    font-size: ${theme.typography.fontSize.base};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  text-align: center;
  padding: ${theme.spacing[8]};
  background: rgba(239, 68, 68, 0.1);
  border-radius: ${theme.borderRadius.lg};
  margin: ${theme.spacing[8]} auto;
  max-width: 600px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing[8]};
`;

const TechSection = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[4]};
`;

const Skill = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.xl};
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    &::after {
      content: attr(data-name);
      position: absolute;
      bottom: -24px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      font-size: ${theme.typography.fontSize.xs};
      background-color: ${theme.colors.background.dark};
      color: ${theme.colors.text.light};
      padding: ${theme.spacing[1]} ${theme.spacing[2]};
      border-radius: ${theme.borderRadius.md};
      z-index: 10;
    }
  }

  svg {
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  status: string;
  technologies: string[];
  languages: string[];
  category?: string;
  startDate?: string;
  endDate?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  testimonial?: string;
  featured: boolean;
  likes: Array<{
    id: number;
    isLike: boolean;
    user: {
      id: number;
      name: string;
      image?: string;
    };
  }>;
  comments: Array<{
    id: number;
    content: string;
    user: {
      id: number;
      name: string;
      image?: string;
    };
    likes: Array<{
      id: number;
      isLike: boolean;
    }>;
  }>;
}

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        let projectId;

        if (params && typeof params === "object") {
          if ("value" in params && typeof params.value === "string") {
            try {
              const parsedValue = JSON.parse(params.value);
              projectId = parseInt(parsedValue.id, 10);
            } catch (e) {
              console.error("Error parsing params value:", e);
            }
          } else if ("id" in params) {
            projectId = parseInt(params.id as string, 10);
          }
        }
        if (isNaN(projectId)) {
          throw new Error("Invalid project ID. The ID must be a number.");
        }

        const response = await fetch(`/api/projects/${projectId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch project");
        }

        setProject(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred while fetching the project";
        setError(errorMessage);
        console.error("Project fetch error:", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <LoadingContainer>
        <Typography.H2 variant="dark">Loading project details...</Typography.H2>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <Typography.H2 variant="dark">Error</Typography.H2>
        <Typography.Text variant="dark">{error}</Typography.Text>
      </ErrorMessage>
    );
  }

  if (!project) {
    return (
      <ErrorMessage>
        <Typography.H2 variant="dark">Project Not Found</Typography.H2>
        <Typography.Text variant="dark">
          The requested project could not be found.
        </Typography.Text>
      </ErrorMessage>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, " ").toLowerCase();
  };

  return (
    <ProjectDetailContainer>
      <ProjectHeader>
        <Typography.H1 variant="dark">{project.title}</Typography.H1>
        <ProjectStatus status={project.status}>
          {formatStatus(project.status)}
        </ProjectStatus>
      </ProjectHeader>

      {project.imageUrl && (
        <ProjectImage src={project.imageUrl} alt={project.title} />
      )}

      <ProjectSection>
        <Typography.H2 variant="dark">About</Typography.H2>
        <Typography.Text variant="dark">{project.description}</Typography.Text>
        {project.testimonial && (
          <blockquote>
            <Typography.Text variant="dark">
              {project.testimonial}
            </Typography.Text>
          </blockquote>
        )}
      </ProjectSection>

      <ProjectSection>
        <Typography.H2 variant="dark">Technical Details</Typography.H2>
        <TechSection>
          <Typography.H3 variant="dark">Languages</Typography.H3>
          <Skills>
            {project.languages.map((lang) => {
              const langData = allTechnologyIcons.find(
                (t) => t.name.toLowerCase() === lang.toLowerCase()
              );

              return (
                <Skill
                  key={lang}
                  data-name={lang}
                  style={{
                    backgroundColor: langData
                      ? `${langData.color}15`
                      : undefined,
                    border: langData
                      ? `1px solid ${langData.color}30`
                      : undefined,
                  }}
                >
                  {langData &&
                    React.createElement(langData.icon, {
                      color: langData.color,
                      size: "35",
                    })}
                </Skill>
              );
            })}
          </Skills>
        </TechSection>

        <TechSection>
          <Typography.H3 variant="dark">Technologies</Typography.H3>
          <Skills>
            {project.technologies.map((tech) => {
              const techData = allTechnologyIcons.find(
                (t) => t.name.toLowerCase() === tech.toLowerCase()
              );

              return (
                <Skill
                  key={tech}
                  data-name={tech}
                  style={{
                    backgroundColor: techData
                      ? `${techData.color}15`
                      : undefined,
                    border: techData
                      ? `1px solid ${techData.color}30`
                      : undefined,
                  }}
                >
                  {techData &&
                    React.createElement(techData.icon, {
                      color: techData.color,
                      size: "35",
                    })}
                </Skill>
              );
            })}
          </Skills>
        </TechSection>

        <MetaInfo>
          <MetaItem>
            <h3>Category</h3>
            <p>{project.category || "Uncategorized"}</p>
          </MetaItem>
          <MetaItem>
            <h3>Start Date</h3>
            <p>{formatDate(project.startDate)}</p>
          </MetaItem>
          <MetaItem>
            <h3>End Date</h3>
            <p>{formatDate(project.endDate)}</p>
          </MetaItem>
          <MetaItem>
            <h3>Project Stats</h3>
            <p>
              {project.likes.length} likes • {project.comments.length} comments
            </p>
          </MetaItem>
        </MetaInfo>
      </ProjectSection>

      <ProjectSection>
        <Typography.H2 variant="dark">Links</Typography.H2>
        <div>
          {project.liveDemoUrl && (
            <LinkButton
              onClick={() =>
                window.open(
                  project.liveDemoUrl!,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              View Live Demo
            </LinkButton>
          )}
          {project.githubUrl && (
            <LinkButton
              onClick={() =>
                window.open(project.githubUrl!, "_blank", "noopener,noreferrer")
              }
            >
              View Source Code
            </LinkButton>
          )}
        </div>
      </ProjectSection>
    </ProjectDetailContainer>
  );
}
