"use client";

import styled from "styled-components";
import { theme } from "../../lib/theme";
import { Card, CardTitle, CardContent } from "../ui/Card";
import { Typography } from "../ui/Typography";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { allTechnologyIcons } from "../../app/assets/icons";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    status: string;
    featured: boolean;
    liveDemoUrl?: string;
    githubUrl?: string;
    technologies?: string[];
  };
}

const ProjectCardWrapper = styled(Card)`
  && {
    background-color: ${theme.colors.secondary};
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    backdrop-filter: blur(10px);
    cursor: pointer;
    pointer-events: all;
    user-select: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    &:active {
      transform: translateY(0);
    }
  }

  h2 {
    color: ${theme.colors.text.light};
    font-size: 1.5rem;
    letter-spacing: -0.025em;
  }

  p {
    color: ${theme.colors.text.light};
    opacity: 0.9;
    line-height: 1.6;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ProjectStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  background-color: ${({ status }) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "rgba(16, 185, 129, 0.15)";
      case "in progress":
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
      case "in progress":
        return "#3B82F6";
      case "planned":
        return "#F97316";
      default:
        return "#6B7280";
    }
  }};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    margin-right: ${theme.spacing[2]};
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: ${theme.spacing[3]};
  right: ${theme.spacing[3]};
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: ${theme.colors.text.light};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProjectCardContent = styled.div`
  flex: 1;
  padding: ${theme.spacing[5]};
  padding-top: ${theme.spacing[10]};
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: ${theme.spacing[3]};
  left: ${theme.spacing[3]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
`;

const CardButton = styled(Button)`
  flex: 1;
  background: none;
  border: none;
  color: ${theme.colors.text.light};
  padding: ${theme.spacing[3]} 0;
  font-size: ${theme.typography.fontSize.sm};
  text-transform: none;
  border-radius: 0;
  margin: 0;
  transition: all 0.2s ease;
  text-align: center;
  justify-content: center;
  width: 100%;
  min-height: unset;
  height: auto;
  font-weight: 500;
  letter-spacing: 0.025em;

  &:first-child {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.text.light};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TechContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[4]};
  padding: 0 ${theme.spacing[5]};
  padding-bottom: ${theme.spacing[4]};
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  font-size: ${theme.typography.fontSize.xs};
  white-space: nowrap;
`;

const TechIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${(props) => props.color || theme.colors.primary.main};
`;

const TechName = styled.span`
  color: ${theme.colors.text.light};
  font-weight: 500;
`;

const formatStatus = (status: string) => {
  return status.replace(/_/g, " ");
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const TechMoreBadge = styled(TechItem)`
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
`;

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectId = project.id.toString();
    router.push(`/projects/${projectId}`);
  };

  const handleButtonClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Link href={`/projects/${project.id}`} passHref legacyBehavior>
      <ProjectCardWrapper
        as="a"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("button")) {
            e.stopPropagation();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
        <BadgeContainer>
          <ProjectStatus status={formatStatus(project.status)}>
            {formatStatus(project.status)}
          </ProjectStatus>
        </BadgeContainer>
        <ProjectCardContent>
          <CardTitle>{project.title}</CardTitle>
          <Typography.Text>{project.description}</Typography.Text>
        </ProjectCardContent>

        {project.technologies && project.technologies.length > 0 && (
          <TechContainer>
            {(() => {
              const techsToShow = [];
              let validTechCount = 0;

              for (const tech of project.technologies) {
                const techData = allTechnologyIcons.find(
                  (t) => t.name.toLowerCase() === tech.toLowerCase()
                );

                if (techData) {
                  if (validTechCount < 3) {
                    techsToShow.push({ tech, techData });
                    validTechCount++;
                  } else {
                    break;
                  }
                }
              }

              const totalValidTechs = project.technologies.filter((tech) =>
                allTechnologyIcons.some(
                  (t) => t.name.toLowerCase() === tech.toLowerCase()
                )
              ).length;

              return (
                <>
                  {techsToShow.map(({ tech, techData }) => {
                    const Icon = techData.icon;
                    return (
                      <TechItem key={tech}>
                        <TechIcon color={techData.color}>
                          <Icon />
                        </TechIcon>
                        <TechName>{techData.name}</TechName>
                      </TechItem>
                    );
                  })}
                  {totalValidTechs > 3 && (
                    <TechMoreBadge>+{totalValidTechs - 3}</TechMoreBadge>
                  )}
                </>
              );
            })()}
          </TechContainer>
        )}

        <ButtonContainer>
          {project.liveDemoUrl && (
            <CardButton
              onClick={(e) => handleButtonClick(e, project.liveDemoUrl!)}
              variant="text"
              size="sm"
            >
              Live Demo
            </CardButton>
          )}
          {project.githubUrl && (
            <CardButton
              onClick={(e) => handleButtonClick(e, project.githubUrl!)}
              variant="text"
              size="sm"
            >
              View Code
            </CardButton>
          )}
        </ButtonContainer>
      </ProjectCardWrapper>
    </Link>
  );
}
