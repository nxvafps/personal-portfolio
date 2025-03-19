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
    background: linear-gradient(
      145deg,
      ${theme.colors.secondary} 0%,
      rgba(15, 15, 15, 0.95) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: ${theme.borderRadius.xl};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.2);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  h2 {
    color: ${theme.colors.text.light};
    font-size: 1.5rem;
    font-weight: ${theme.typography.fontWeight.bold};
    letter-spacing: -0.025em;
    margin-bottom: ${theme.spacing[2]};
  }

  p {
    color: ${theme.colors.text.light};
    opacity: 0.85;
    line-height: 1.6;
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const ProjectStatus = styled.div`
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  background-color: ${({ status }) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "rgba(16, 185, 129, 0.2)";
      case "in progress":
        return "rgba(59, 130, 246, 0.2)";
      case "planned":
        return "rgba(249, 115, 22, 0.2)";
      default:
        return "rgba(107, 114, 128, 0.2)";
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
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

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
  background: linear-gradient(
    90deg,
    ${theme.colors.primary},
    ${theme.colors.primaryHover}
  );
  color: white;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
`;

const ProjectCardContent = styled.div`
  flex: 1;
  padding: ${theme.spacing[6]};
  padding-top: ${theme.spacing[10]};
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: ${theme.spacing[3]};
  left: ${theme.spacing[3]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  z-index: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.2);
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
    border-right: 1px solid rgba(255, 255, 255, 0.05);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.primary};
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
  padding: 0 ${theme.spacing[6]};
  padding-bottom: ${theme.spacing[4]};
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  background-color: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  font-size: ${theme.typography.fontSize.xs};
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

const TechIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: ${(props) => props.color || theme.colors.primary};
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
  background-color: rgba(249, 115, 22, 0.2);
  border: 1px solid rgba(249, 115, 22, 0.1);
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
