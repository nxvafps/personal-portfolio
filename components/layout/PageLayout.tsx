import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../lib/theme";
import { media } from "../../lib/theme";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

const Container = styled.div<{ variant?: "light" | "dark" }>`
  padding: ${theme.spacing[6]};
  max-width: 72rem;
  margin: 0 auto;
  width: 100%;
  background-color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.background.dark
      : theme.colors.background.light};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
  min-height: 100vh;
`;

const PageLayout = ({
  children,
  className,
  variant = "light",
}: PageLayoutProps) => {
  return (
    <Container className={className} variant={variant}>
      {children}
    </Container>
  );
};

export const Grid = styled.div<{
  columns?: number;
  gap?: keyof typeof theme.spacing;
}>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => theme.spacing[props.gap || 6]};

  ${media.md} {
    grid-template-columns: ${(props) => `repeat(${props.columns || 2}, 1fr)`};
  }
`;

export const Section = styled.section<{ spacing?: keyof typeof theme.spacing }>`
  margin-bottom: ${(props) => theme.spacing[props.spacing || 8]};
`;

export const SectionHeader = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

export default PageLayout;
