import React from "react";
import styled from "styled-components";
import { Typography } from "@/components/ui/Typography";
import { theme } from "@/lib/theme";
import { TechnologyIcon } from "@/app/assets/icons";

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

interface TechSkillsProps {
  title: string;
  technologies: TechnologyIcon[];
}

export const TechSkills: React.FC<TechSkillsProps> = ({
  title,
  technologies,
}) => {
  return (
    <SkillSection>
      <Typography.H3 variant="dark">{title}</Typography.H3>
      <Skills>
        {technologies.slice(0, 3).map((tech) => (
          <Skill
            key={tech.name}
            data-name={tech.name}
            style={{
              backgroundColor: `${tech.color}15`,
              border: `1px solid ${tech.color}30`,
            }}
          >
            {React.createElement(tech.icon, {
              color: tech.color,
              size: "35",
            })}
          </Skill>
        ))}
        {technologies.length > 3 && (
          <Skill
            data-name={`+${technologies.length - 3} more`}
            style={{
              backgroundColor: "#ffffff15",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography.Text variant="dark" noMargin>
              +{technologies.length - 3}
            </Typography.Text>
          </Skill>
        )}
      </Skills>
    </SkillSection>
  );
};
