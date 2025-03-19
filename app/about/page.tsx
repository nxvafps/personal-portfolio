"use client";
import styled from "styled-components";
import { Typography } from "@/components/ui/Typography";
import {
  environmentIcons,
  languageIcons,
  frameworkIcons,
  toolsAndTechnologies,
} from "../assets/icons";
import { theme } from "@/lib/theme";

export default function About() {
  return (
    <PageContainer>
      <Main>
        <Typography.H1 variant="dark">About</Typography.H1>

        <Section>
          <Typography.H2 variant="dark">Development Environment</Typography.H2>
          <IconGrid>
            {environmentIcons.map((icon) => (
              <IconWrapper key={icon.name} data-name={icon.name}>
                <Icon
                  style={{
                    backgroundColor: `${icon.color}15`,
                    border: `1px solid ${icon.color}30`,
                  }}
                >
                  <icon.icon size={35} color={icon.color} />
                </Icon>
              </IconWrapper>
            ))}
          </IconGrid>
        </Section>

        <Section>
          <Typography.H2 variant="dark">Languages</Typography.H2>
          <IconGrid>
            {languageIcons.map((icon) => (
              <IconWrapper key={icon.name} data-name={icon.name}>
                <Icon
                  style={{
                    backgroundColor: `${icon.color}15`,
                    border: `1px solid ${icon.color}30`,
                  }}
                >
                  <icon.icon size={35} color={icon.color} />
                </Icon>
              </IconWrapper>
            ))}
          </IconGrid>
        </Section>

        <Section>
          <Typography.H2 variant="dark">Frameworks</Typography.H2>
          <IconGrid>
            {frameworkIcons.map((icon) => (
              <IconWrapper key={icon.name} data-name={icon.name}>
                <Icon
                  style={{
                    backgroundColor: `${icon.color}15`,
                    border: `1px solid ${icon.color}30`,
                  }}
                >
                  <icon.icon size={35} color={icon.color} />
                </Icon>
              </IconWrapper>
            ))}
          </IconGrid>
        </Section>

        <Section>
          <Typography.H2 variant="dark">Tools and Technologies</Typography.H2>
          <IconGrid>
            {toolsAndTechnologies.map((icon) => (
              <IconWrapper key={icon.name} data-name={icon.name}>
                <Icon
                  style={{
                    backgroundColor: `${icon.color}15`,
                    border: `1px solid ${icon.color}30`,
                  }}
                >
                  <icon.icon size={35} color={icon.color} />
                </Icon>
              </IconWrapper>
            ))}
          </IconGrid>
        </Section>
      </Main>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: ${theme.spacing[8]} 0;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[8]};
  grid-row-start: 2;
  width: 100%;
  max-width: 1200px;
`;
const Container = styled.div`
  padding: ${theme.spacing[8]} 0;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[6]};
  width: 100%;

  h2 {
    margin-bottom: ${theme.spacing[2]};
  }
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing[6]};
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${theme.spacing[6]};
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);

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
`;

const Icon = styled.div`
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
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  svg {
    transition: transform 0.2s ease-in-out;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;
