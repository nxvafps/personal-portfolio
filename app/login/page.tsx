"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { theme } from "../../lib/theme";

import {
  Button,
  LinkButton,
  Typography,
  Card,
  CardContent,
  FormInput,
} from "../../components";

import PageLayout from "../../components/layout/PageLayout";

const Form = styled.form`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
`;

const DarkCard = styled(Card)`
  background-color: ${theme.colors.secondaryLight};
  border: 1px solid ${theme.colors.border.dark};
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTitle = styled(Typography.H1)`
  margin-bottom: ${theme.spacing[1]};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryHover}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledSubtitle = styled(Typography.Text)`
  margin-bottom: ${theme.spacing[6]};
  color: ${theme.colors.text.light};
`;

const StyledInput = styled(FormInput)`
  input {
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.text.light};
    border-color: ${theme.colors.border.dark};
  }
`;

const GradientButton = styled(Button)`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary},
    ${theme.colors.primaryHover}
  );
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledLink = styled(LinkButton)`
  color: ${theme.colors.primary};

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[6]};
`;

const FooterText = styled.div`
  margin-top: ${theme.spacing[6]};
  text-align: center;
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSize.sm};
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <PageLayout variant="dark">
      <DarkCard>
        <CardContent>
          <StyledTitle variant="dark">Sign In</StyledTitle>
          <StyledSubtitle variant="dark">
            Sign in to access your account dashboard.
          </StyledSubtitle>

          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              variant="dark"
            />

            <FormInput
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              error={error ? error : undefined}
              variant="dark"
            />

            <ButtonGroup>
              <GradientButton
                type="submit"
                disabled={isLoading}
                fullWidth
                variant="primary"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </GradientButton>
            </ButtonGroup>

            <FooterText>
              <Typography.SmallText variant="dark">
                Don't have an account?{" "}
                <StyledLink href="/register" variant="text">
                  Register here
                </StyledLink>
              </Typography.SmallText>
            </FooterText>
          </Form>
        </CardContent>
      </DarkCard>
    </PageLayout>
  );
}
