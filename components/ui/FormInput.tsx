"use client";
import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { theme } from "../../lib/theme";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  variant?: "light" | "dark";
}

const InputContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

const Label = styled.label<{ $variant?: "light" | "dark" }>`
  display: block;
  margin-bottom: ${theme.spacing[2]};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${(props) =>
    props.$variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

const StyledInput = styled.input<{ $variant?: "light" | "dark" }>`
  width: 100%;
  padding: ${theme.spacing[3]};
  border: 1px solid
    ${(props) =>
      props.$variant === "dark"
        ? theme.colors.border.dark
        : theme.colors.border.light};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.md};
  background-color: ${(props) =>
    props.$variant === "dark"
      ? theme.colors.secondary
      : theme.colors.background.light};
  color: ${(props) =>
    props.$variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight};
  }

  &:disabled {
    background-color: ${theme.colors.border.light};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  margin-top: ${theme.spacing[1]};
`;

export const FormInput = ({
  label,
  id,
  error,
  variant,
  ...props
}: FormInputProps) => {
  return (
    <InputContainer>
      <Label htmlFor={id} $variant={variant}>
        {label}
      </Label>
      <StyledInput id={id} $variant={variant} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};
