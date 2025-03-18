"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import styled from "styled-components";
import PageLayout, {
  Grid,
  Section,
  SectionHeader,
} from "@/components/layout/PageLayout";
import { Card, CardTitle, CardContent, Typography } from "@/components/";
import { theme } from "@/lib/theme";
import { UserRole } from "@prisma/client";

const StyledLink = styled(Link)`
  display: inline-block;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-block;
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background-color: ${theme.colors.secondaryLight};
  color: ${theme.colors.text.light};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const SecondaryButton = styled.button`
  padding: ${theme.spacing[2]} ${theme.spacing[3]};
  background-color: ${theme.colors.secondaryLight};
  color: ${theme.colors.text.light};
  border-radius: ${theme.borderRadius.md};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing[4]};
`;

const ActionContent = styled.div``;

const LoadingContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background.dark};
  color: ${theme.colors.text.light};
`;

const DarkCard = styled(Card)`
  background-color: ${theme.colors.secondaryLight};
  border: 1px solid ${theme.colors.border.dark};
`;

const DarkCardTitle = styled(CardTitle)`
  color: ${theme.colors.text.light};
`;

const DarkCardContent = styled(CardContent)`
  color: ${theme.colors.text.light};
`;

export default function AdminDashboard() {
  const { session, isLoading, isAuthenticated, userRole } = useAuth({
    required: true,
    role: UserRole.ADMIN,
    redirectTo: "/unauthorized",
  });

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <PageLayout variant="dark">
      <SectionHeader>
        <Typography.H1 variant="dark">Admin Dashboard</Typography.H1>
        <Typography.Text variant="dark">
          Manage your portfolio site
        </Typography.Text>
      </SectionHeader>

      <Grid columns={3} gap={4}>
        <DarkCard>
          <DarkCardTitle>Projects</DarkCardTitle>
          <DarkCardContent>
            <Typography.Text variant="dark">
              Manage your portfolio projects
            </Typography.Text>
            <div style={{ marginTop: theme.spacing[4] }}>
              <StyledLink href="/admin/projects">Manage Projects</StyledLink>
            </div>
          </DarkCardContent>
        </DarkCard>

        <DarkCard>
          <DarkCardTitle>Users</DarkCardTitle>
          <DarkCardContent>
            <Typography.Text variant="dark">
              Manage user accounts
            </Typography.Text>
            <div style={{ marginTop: theme.spacing[4] }}>
              <StyledLink href="/admin/users">Manage Users</StyledLink>
            </div>
          </DarkCardContent>
        </DarkCard>

        <DarkCard>
          <DarkCardTitle>Site Settings</DarkCardTitle>
          <DarkCardContent>
            <Typography.Text variant="dark">
              Configure your portfolio settings
            </Typography.Text>
            <div style={{ marginTop: theme.spacing[4] }}>
              <StyledLink href="/admin/settings">Site Settings</StyledLink>
            </div>
          </DarkCardContent>
        </DarkCard>
      </Grid>

      <Section spacing={6} style={{ marginTop: theme.spacing[8] }}>
        <DarkCard>
          <DarkCardTitle>Admin Actions</DarkCardTitle>
          <DarkCardContent>
            <ActionItem>
              <ActionContent>
                <Typography.H3 variant="dark">Create Admin User</Typography.H3>
                <Typography.SmallText variant="dark">
                  Add another admin user to help manage the site
                </Typography.SmallText>
              </ActionContent>
              <SecondaryLink href="/admin/users/new">Create User</SecondaryLink>
            </ActionItem>

            <ActionItem>
              <ActionContent>
                <Typography.H3 variant="dark">Backup Database</Typography.H3>
                <Typography.SmallText variant="dark">
                  Download a backup of your site data
                </Typography.SmallText>
              </ActionContent>
              <SecondaryButton>Download Backup</SecondaryButton>
            </ActionItem>
          </DarkCardContent>
        </DarkCard>
      </Section>
    </PageLayout>
  );
}
