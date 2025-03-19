"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Typography } from "@/components/ui/Typography";
import { Button, LinkButton } from "@/components/ui/Button";
import Image from "next/image";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { theme, media } from "@/lib/theme";
import { Section as BaseSection } from "@/components/layout/PageLayout";
import {
  allTechnologyIcons,
  environmentIcons,
  languageIcons,
  frameworkIcons,
  toolsAndTechnologies,
} from "@/app/assets/icons";
import { TechSkills } from "@/components/home/TechSkillsSection.tsx";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing[6]};
`;

const Section = styled(BaseSection)``;

const HeroSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing[16]} 0;

  ${media.md} {
    padding: ${theme.spacing[16]} 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[8]};

  ${media.md} {
    grid-template-columns: minmax(0, 1fr) auto;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[8]};

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[6]};
  justify-content: center;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[6]};
  margin-top: ${theme.spacing[4]};
`;

const SkillSection = styled.div``;

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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[8]};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LoadingContainer = styled.div`
  padding: ${theme.spacing[8]};
  text-align: center;
  width: 100%;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
`;

const AboutText = styled.div`
  position: relative;
  padding: 0 ${theme.spacing[6]};
  background: ${theme.colors.background.dark};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: -${theme.spacing[4]};
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: ${theme.spacing[4]};
    background-color: ${theme.colors.primary};
  }
`;

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("featured", "true");
        params.append("limit", "3");

        const response = await fetch(`/api/projects?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch featured projects");
        }

        const data = await response.json();
        setFeaturedProjects(data.projects);
      } catch (err) {
        console.error("Error fetching featured projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <PageContainer>
      <HeroSection>
        <Typography.H1 variant="dark">Ollie Quirk</Typography.H1>
        <Typography.H2 variant="dark">
          Full-Stack Software Engineer
        </Typography.H2>
        <Typography.Text variant="dark">
          Building beautiful, functional, and user-friendly web applications
          with modern technologies.
        </Typography.Text>
        <ButtonContainer>
          <LinkButton href="/projects" size="lg">
            View My Work
          </LinkButton>
          <LinkButton href="/contact" variant="outline" size="lg">
            Contact Me
          </LinkButton>
        </ButtonContainer>
      </HeroSection>

      <Section>
        <Grid>
          <div>
            <Typography.H2 variant="dark">About Me</Typography.H2>
            <AboutContainer>
              <AboutText>
                <Typography.Text variant="dark">
                  My name is Ollie, and I am a passionate developer with over
                  three years of experience in building web applications. My
                  expertise lies in React, TypeScript, and Node.js, but I am
                  actively exploring other languages to enhance my skills.
                </Typography.Text>
              </AboutText>
              <AboutText>
                <Typography.Text variant="dark">
                  My interest in technology was ignited at the age of 14 when I
                  built my first desktop computer. Several years later, I
                  embarked on my programming journey. Initially, coding was a
                  hobby, but three years ago, I recognised the potential for
                  personal and professional growth and dedicated myself to
                  continuous improvement.
                </Typography.Text>
              </AboutText>
              <AboutText>
                <Typography.Text variant="dark">
                  I successfully completed the Northcoders JavaScript Software
                  Development Bootcamp, which significantly enriched my
                  knowledge and skills in full-stack development. This
                  experience equipped me with the tools and confidence to tackle
                  complex projects and collaborate effectively in a team
                  setting.
                </Typography.Text>
              </AboutText>
            </AboutContainer>
          </div>
          <div>
            <Typography.H2 variant="dark">Tech Stack</Typography.H2>
            <SkillsGrid>
              <TechSkills title="Environment" technologies={environmentIcons} />
              <TechSkills title="Languages" technologies={languageIcons} />
              <TechSkills title="Frameworks" technologies={frameworkIcons} />
              <TechSkills
                title="Tools and Technologies"
                technologies={toolsAndTechnologies}
              />
            </SkillsGrid>
            <ButtonContainer>
              <LinkButton href="/about" variant="outline" size="lg">
                See More
              </LinkButton>
            </ButtonContainer>
          </div>
        </Grid>
      </Section>

      <Section>
        <Typography.H2 variant="dark">Featured Projects</Typography.H2>
        <Typography.Text variant="dark">
          Here are some of my recent projects. Check out the projects page for
          more.
        </Typography.Text>

        {loading ? (
          <LoadingContainer>
            <Typography.Text variant="dark">
              Loading featured projects...
            </Typography.Text>
          </LoadingContainer>
        ) : error ? (
          <LoadingContainer>
            <Typography.Text variant="dark">Error: {error}</Typography.Text>
          </LoadingContainer>
        ) : featuredProjects.length === 0 ? (
          <LoadingContainer>
            <Typography.Text variant="dark">
              No featured projects found.
            </Typography.Text>
          </LoadingContainer>
        ) : (
          <ProjectsGrid>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ProjectsGrid>
        )}

        <div style={{ textAlign: "center", marginTop: theme.spacing[8] }}>
          <LinkButton href="/projects" variant="outline">
            View All Projects
          </LinkButton>
        </div>
      </Section>

      <Section
        style={{
          backgroundColor: theme.colors.background.dark,
          color: theme.colors.text.light,
          padding: theme.spacing[12],
          borderRadius: theme.borderRadius.lg,
          textAlign: "center",
        }}
      >
        <Typography.H2 variant="dark">Let's Work Together</Typography.H2>
        <Typography.Text variant="dark">
          I'm currently available for freelance work and interesting projects.
          If you have a project that you want to get started or need help with
          something, get in touch.
        </Typography.Text>
        <ButtonContainer>
          <LinkButton href="/contact" size="lg">
            Contact Me
          </LinkButton>
        </ButtonContainer>
      </Section>
    </PageContainer>
  );
}
