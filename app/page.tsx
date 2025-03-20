"use client";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Typography } from "@/components/ui/Typography";
import { LinkButton } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { theme, media } from "@/lib/theme";
import { Section as BaseSection } from "@/components/layout/PageLayout";
import {
  environmentIcons,
  languageIcons,
  frameworkIcons,
  toolsAndTechnologies,
} from "@/app/assets/icons";
import { TechSkills } from "@/components/home/TechSkillsSection";

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing[6]};
`;

const Section = styled(BaseSection)`
  margin: ${theme.spacing[16]} 0;
  position: relative;
`;

const HeroSection = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing[16]} 0 ${theme.spacing[16]};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      120deg,
      ${theme.colors.primary}22,
      ${theme.colors.secondary}33,
      ${theme.colors.primaryLight}22
    );
    background-size: 200% 200%;
    animation: ${gradientAnimation} 15s ease infinite;
    opacity: 0.7;
    z-index: -1;
    border-radius: ${theme.borderRadius.xl};
  }

  h1,
  h2,
  p {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  h2 {
    animation-delay: 0.2s;
  }

  p {
    animation-delay: 0.4s;
  }

  ${media.md} {
    padding: ${theme.spacing[16]} 0 ${theme.spacing[16]};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[12]};

  ${media.md} {
    grid-template-columns: minmax(0, 1.2fr) 0.8fr;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[8]};
  margin-top: ${theme.spacing[10]};

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
  margin-top: ${theme.spacing[8]};
  justify-content: center;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
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
  transition: all 0.3s ease-in-out;
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
    transition: transform 0.3s ease-in-out;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing[8]};
  background: ${theme.colors.background.dark}66;
  padding: ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.xl};
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

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
  padding: ${theme.spacing[6]};
  background: ${theme.colors.background.dark}cc;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  transform: translateZ(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

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

const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing[8]};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -${theme.spacing[4]};
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    );
    border-radius: ${theme.borderRadius.full};
  }
`;

const ProjectsSection = styled(Section)`
  background: ${theme.colors.background.dark}33;
  padding: ${theme.spacing[12]} ${theme.spacing[8]};
  border-radius: ${theme.borderRadius.xl};
  backdrop-filter: blur(10px);
`;

const CTASection = styled(Section)`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}22,
    ${theme.colors.secondary}33,
    ${theme.colors.primary}22
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 10s ease infinite;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[16]} ${theme.spacing[8]};
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  margin-bottom: ${theme.spacing[16]};

  h2 {
    margin-bottom: ${theme.spacing[4]};
    background: -webkit-linear-gradient(
      ${theme.colors.text.light},
      ${theme.colors.primary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
`;

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
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
            <SectionHeader>
              <Typography.H2 variant="dark">About Me</Typography.H2>
            </SectionHeader>
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
            <SectionHeader>
              <Typography.H2 variant="dark">Tech Stack</Typography.H2>
            </SectionHeader>
            <SkillsGrid>
              <TechSkills title="Environment" technologies={environmentIcons} />
              <TechSkills title="Languages" technologies={languageIcons} />
              <TechSkills title="Frameworks" technologies={frameworkIcons} />
              <TechSkills
                title="Technologies"
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

      <ProjectsSection>
        <SectionHeader>
          <Typography.H2 variant="dark">Featured Projects</Typography.H2>
        </SectionHeader>
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

        <div style={{ textAlign: "center", marginTop: theme.spacing[12] }}>
          <LinkButton href="/projects" variant="outline" size="lg">
            View All Projects
          </LinkButton>
        </div>
      </ProjectsSection>

      <CTASection>
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
      </CTASection>
    </PageContainer>
  );
}
