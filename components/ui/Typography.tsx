"use client";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../lib/theme";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark";
  noMargin?: boolean;
}

const H1 = styled.h1<{ variant?: "light" | "dark" }>`
  font-size: ${theme.typography.fontSize["3xl"]};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing[4]};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

const H2 = styled.h2<{ variant?: "light" | "dark" }>`
  font-size: ${theme.typography.fontSize["2xl"]};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing[3]};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

const H3 = styled.h3<{ variant?: "light" | "dark" }>`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing[2]};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

const H4 = styled.h4<{ variant?: "light" | "dark" }>`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing[2]};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

const Text = styled.p<{ variant?: "light" | "dark"; noMargin?: boolean }>`
  font-size: ${theme.typography.fontSize.md};
  line-height: 1.5;
  margin-bottom: ${(props) => (props.noMargin ? "0" : theme.spacing[2])};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

const SmallText = styled.p<{ variant?: "light" | "dark" }>`
  font-size: ${theme.typography.fontSize.sm};
  line-height: 1.5;
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.secondary};
`;

const Label = styled.span<{ variant?: "light" | "dark" }>`
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

export const Typography = {
  H1: ({ children, className, variant }: TypographyProps) => (
    <H1 className={className} variant={variant}>
      {children}
    </H1>
  ),
  H2: ({ children, className, variant }: TypographyProps) => (
    <H2 className={className} variant={variant}>
      {children}
    </H2>
  ),
  H3: ({ children, className, variant }: TypographyProps) => (
    <H3 className={className} variant={variant}>
      {children}
    </H3>
  ),
  H4: ({ children, className, variant }: TypographyProps) => (
    <H4 className={className} variant={variant}>
      {children}
    </H4>
  ),
  Text: ({ children, className, variant, noMargin }: TypographyProps) => (
    <Text className={className} variant={variant} noMargin={noMargin}>
      {children}
    </Text>
  ),
  SmallText: ({ children, className, variant }: TypographyProps) => (
    <SmallText className={className} variant={variant}>
      {children}
    </SmallText>
  ),
  Label: ({ children, className, variant }: TypographyProps) => (
    <Label className={className} variant={variant}>
      {children}
    </Label>
  ),
};
