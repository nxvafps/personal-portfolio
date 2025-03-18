"use client";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../lib/theme";

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContainer = styled.div`
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.boxShadow.sm};
`;

const StyledCardTitle = styled.h2`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing[4]};
  color: ${theme.colors.text.primary};
`;

const StyledCardContent = styled.div`
  color: ${theme.colors.text.primary};
`;

export const Card = ({ children, className }: CardProps) => {
  return <CardContainer className={className}>{children}</CardContainer>;
};

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return <StyledCardTitle className={className}>{children}</StyledCardTitle>;
};

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <StyledCardContent className={className}>{children}</StyledCardContent>
  );
};
