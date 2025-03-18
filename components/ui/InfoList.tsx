"use client";
import React from "react";
import styled from "styled-components";
import { theme } from "../../lib/theme";

export interface InfoItem {
  label: string;
  value: string | React.ReactNode;
}

interface InfoListProps {
  items: InfoItem[];
  className?: string;
  variant?: "light" | "dark";
}

const InfoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

const InfoItemContainer = styled.div`
  margin: 0;
`;

const InfoItemLabel = styled.span<{ variant?: "light" | "dark" }>`
  font-weight: ${theme.typography.fontWeight.medium};
  margin-right: ${theme.spacing[1]};
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

const InfoItemValue = styled.span<{ variant?: "light" | "dark" }>`
  color: ${(props) =>
    props.variant === "dark"
      ? theme.colors.text.light
      : theme.colors.text.primary};
`;

export const InfoList = ({
  items,
  className,
  variant = "light",
}: InfoListProps) => {
  return (
    <InfoListContainer className={className}>
      {items.map((item, index) => (
        <InfoItemContainer key={index}>
          <InfoItemLabel variant={variant}>{item.label}:</InfoItemLabel>
          <InfoItemValue variant={variant}>{item.value}</InfoItemValue>
        </InfoItemContainer>
      ))}
    </InfoListContainer>
  );
};
