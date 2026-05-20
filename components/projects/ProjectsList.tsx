"use client";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../lib/theme";
import { Typography } from "../ui/Typography";
import { Button } from "../ui/Button";
import { ProjectCard } from "./ProjectCard";
import { ProjectStatus } from "@prisma/client";

interface Project {
  id: number;
  title: string;
  description: string;
  status: string;
  featured: boolean;
}

interface PaginationData {
  page: number;
  pages: number;
  total: number;
}

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

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
  }
  70% {
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};
  align-items: center;
  flex-wrap: wrap;
  padding: ${theme.spacing[6]};
  background: linear-gradient(
    135deg,
    ${theme.colors.secondary},
    ${theme.colors.background.dark}99,
    ${theme.colors.secondary}cc
  );
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease infinite;
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: ${theme.spacing[5]};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing[3]};
  }
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: 600;
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const FilterCheckbox = styled.input`
  width: 1.3rem;
  height: 1.3rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  background: transparent;
  appearance: none;
  position: relative;
  transition: all 0.3s ease;

  &:checked {
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    animation: ${pulseAnimation} 0.4s ease;

    &::after {
      content: "✓";
      position: absolute;
      color: white;
      font-size: 0.9rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    border-color: ${theme.colors.primary};
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing[3]} ${theme.spacing[4]};
  padding-right: ${theme.spacing[10]}; /* Extra space for the custom arrow */
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: ${theme.borderRadius.lg};
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.07)
  );
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  appearance: none; /* Remove default browser styling */
  position: relative;

  /* Custom dropdown arrow */
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      ${theme.colors.primary} 50%
    ),
    linear-gradient(135deg, ${theme.colors.primary} 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(50% + 2px),
    calc(100% - 15px) calc(50% + 2px);
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;

  &:hover,
  &:focus {
    border-color: ${theme.colors.primary};
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.12)
    );
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15),
      0 0 0 2px ${theme.colors.primary}22;
    outline: none;
  }

  &:active {
    transform: translateY(0);
  }

  /* To make the text more visible */
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  /* Style for the options dropdown */
  option {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.text.light};
    padding: ${theme.spacing[3]};
    font-weight: 500;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Custom wrapper for the select to add more styling possibilities
const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${theme.spacing[10]};
    pointer-events: none;
    border-radius: 0 ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterTitle = styled.div`
  font-size: ${theme.typography.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.light};
  margin-bottom: ${theme.spacing[4]};
  text-align: center;
  width: 100%;

  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 2px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    );
    margin: ${theme.spacing[2]} auto 0;
    border-radius: ${theme.borderRadius.full};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[6]};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[6]};
`;

const PageInfo = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.md};
`;

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState("");
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    pages: 1,
    total: 0,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (category) params.append("category", category);
        if (featured) params.append("featured", "true");
        if (status) params.append("status", status);

        const res = await fetch(`/api/projects?${params.toString()}`);
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data.projects);
        setPagination(data.pagination);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [page, limit, category, featured, status]);

  if (loading) return <Typography.Text>Loading projects...</Typography.Text>;
  if (error) return <Typography.Text>Error: {error}</Typography.Text>;

  return (
    <div>
      <FiltersContainer>
        <FilterTitle>Filter Projects</FilterTitle>
        <FilterGroup>
          <FilterLabel>
            <FilterCheckbox
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </FilterLabel>

          <SelectWrapper>
            <FilterSelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Web Application">Web Application</option>
              <option value="API">API</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Finance">Finance</option>
            </FilterSelect>
          </SelectWrapper>

          <SelectWrapper>
            <FilterSelect
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value={ProjectStatus.COMPLETED}>Completed</option>
              <option value={ProjectStatus.IN_PROGRESS}>In Progress</option>
              <option value={ProjectStatus.PLANNING}>Planned</option>
            </FilterSelect>
          </SelectWrapper>
        </FilterGroup>
      </FiltersContainer>

      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectsGrid>

      {pagination.pages > 1 && (
        <PaginationContainer>
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <PageInfo>
            Page {pagination.page} of {pagination.pages}
          </PageInfo>
          <Button
            onClick={() => setPage((p) => (p < pagination.pages ? p + 1 : p))}
            disabled={page === pagination.pages}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </PaginationContainer>
      )}
    </div>
  );
}
