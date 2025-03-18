"use client";
import styled, { css } from "styled-components";
import { theme } from "../../lib/theme";

interface ButtonProps {
  variant?: "primary" | "secondary";
}

const baseButtonStyles = css`
  height: 2.75rem;
  padding: 0 ${theme.spacing[4]};
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  line-height: ${theme.spacing[5]};
  font-weight: ${theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  text-decoration: none;
`;

export const Button = styled.a<ButtonProps>`
  ${baseButtonStyles}

  ${(props) =>
    props.variant === "primary" &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.text.light};
      gap: ${theme.spacing[2]};

      &:hover {
        background: ${theme.colors.primaryHover};
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background: transparent;
      border-color: ${theme.colors.border.light};
      color: ${theme.colors.text.primary};
      min-width: 158px;

      &:hover {
        background: ${theme.colors.background.light};
      }
    `}
`;
