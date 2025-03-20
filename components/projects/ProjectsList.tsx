"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
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

const FiltersContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
  align-items: center;
  flex-wrap: wrap;
  padding: ${theme.spacing[4]};
  background: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: 500;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.md};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FilterCheckbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  background: transparent;
  appearance: none;
  position: relative;
  transition: all 0.2s ease;

  &:checked {
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};

    &::after {
      content: "✓";
      position: absolute;
      color: white;
      font-size: 0.8rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &:hover {
    border-color: ${theme.colors.primary};
  }
`;

const FilterSelect = styled.select`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.md};
  background-color: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(8px);

  &:hover,
  &:focus {
    border-color: ${theme.colors.primary};
    background-color: rgba(255, 255, 255, 0.15);
  }

  option {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.text.light};
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
        <FilterGroup>
          <FilterLabel>
            <FilterCheckbox
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </FilterLabel>

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

          <FilterSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value={ProjectStatus.COMPLETED}>Completed</option>
            <option value={ProjectStatus.IN_PROGRESS}>In Progress</option>
            <option value={ProjectStatus.PLANNING}>Planned</option>
          </FilterSelect>
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
