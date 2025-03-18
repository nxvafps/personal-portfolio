"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import styled from "styled-components";
import { theme } from "../../lib/theme";

import {
  Card,
  CardTitle,
  CardContent,
  Button,
  LinkButton,
  Typography,
  InfoList,
} from "../../components/";

import PageLayout, { Grid } from "../../components/layout/PageLayout";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing[8]};
  border-bottom: 1px solid ${theme.colors.border.dark};
  padding-bottom: ${theme.spacing[4]};
  color: ${theme.colors.text.light};
`;

const HeaderRight = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  align-items: center;
`;

const WelcomeText = styled.span`
  color: ${theme.colors.text.light};
`;

const LoadingContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.light};
`;

const LightTitle = styled(Typography.H1)`
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

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  const accountInfoItems = [
    { label: "Name", value: session?.user?.name || "Not provided" },
    { label: "Email", value: session?.user?.email || "Not provided" },
    { label: "Role", value: session?.user?.role || "Not provided" },
  ];

  return (
    <PageLayout variant="dark">
      <Header>
        <LightTitle>Dashboard</LightTitle>
        <HeaderRight>
          <div>
            {session?.user?.name ? (
              <WelcomeText>Welcome, {session.user.name}</WelcomeText>
            ) : (
              <WelcomeText>Welcome</WelcomeText>
            )}
          </div>
          <Button
            variant="secondary"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </Button>
        </HeaderRight>
      </Header>

      <main>
        <Grid>
          <DarkCard>
            <DarkCardTitle>Account Information</DarkCardTitle>
            <DarkCardContent>
              <InfoList items={accountInfoItems} variant="dark" />
            </DarkCardContent>
          </DarkCard>

          <DarkCard>
            <DarkCardTitle>Quick Actions</DarkCardTitle>
            <DarkCardContent>
              <ButtonGroup>
                <LinkButton href="/" fullWidth>
                  Go to Homepage
                </LinkButton>
                {session?.user?.role === "ADMIN" && (
                  <LinkButton href="/admin" fullWidth>
                    Go to Admin Dashboard
                  </LinkButton>
                )}
              </ButtonGroup>
            </DarkCardContent>
          </DarkCard>
        </Grid>
      </main>
    </PageLayout>
  );
}
