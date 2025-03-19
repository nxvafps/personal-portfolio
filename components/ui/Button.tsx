"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";
import { theme } from "../../lib/theme";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

interface LinkButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href: string;
  className?: string;
}

const buttonStyles = css<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  $fullWidth?: boolean;
}>`
  display: ${(props) => (props.$fullWidth ? "block" : "inline-flex")};
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[3]};
          font-size: ${theme.typography.fontSize.sm};
        `;
      case "lg":
        return css`
          padding: ${theme.spacing[3]} ${theme.spacing[6]};
          font-size: ${theme.typography.fontSize.lg};
        `;
      case "md":
      default:
        return css`
          padding: ${theme.spacing[2]} ${theme.spacing[4]};
          font-size: ${theme.typography.fontSize.md};
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return css`
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.text.light};
          border: none;

          &:hover {
            background-color: ${theme.colors.secondaryHover};
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};

          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.text.light};
          }
        `;
      case "text":
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: none;
          padding-left: ${theme.spacing[2]};
          padding-right: ${theme.spacing[2]};

          &:hover {
            color: ${theme.colors.primaryHover};
            background-color: ${theme.colors.primaryLight};
          }
        `;
      case "primary":
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.light};
          border: none;

          &:hover {
            background-color: ${theme.colors.primaryHover};
          }
        `;
    }
  }}
`;

const StyledButton = styled.button<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  $fullWidth?: boolean;
}>`
  ${buttonStyles}
`;

const StyledLinkButton = styled(Link)<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  $fullWidth?: boolean;
}>`
  ${buttonStyles}
  text-align: center;
`;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      className={className}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export const LinkButton = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  className,
}: LinkButtonProps) => {
  return (
    <StyledLinkButton
      href={href}
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      className={className}
    >
      {children}
    </StyledLinkButton>
  );
};
