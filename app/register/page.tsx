"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { theme } from "../../lib/theme";
import {
  Button,
  Typography,
  Card,
  CardContent,
  FormInput,
  LinkButton,
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

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError((err as Error).message || "Failed to register");
      setIsLoading(false);
    }
  };

  return (
    <PageLayout variant="dark">
      <DarkCard>
        <CardContent>
          <StyledTitle variant="dark">Create Account</StyledTitle>
          <StyledSubtitle variant="dark">
            Fill in your details to create your account.
          </StyledSubtitle>

          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              variant="dark"
            />

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
              variant="dark"
            />

            <FormInput
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="********"
              error={error}
              variant="dark"
            />

            <ButtonGroup>
              <GradientButton
                type="submit"
                disabled={isLoading}
                fullWidth
                variant="primary"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </GradientButton>
            </ButtonGroup>

            <FooterText>
              <Typography.SmallText variant="dark">
                Already have an account?{" "}
                <StyledLink href="/login" variant="text">
                  Sign in
                </StyledLink>
              </Typography.SmallText>
            </FooterText>
          </Form>
        </CardContent>
      </DarkCard>
    </PageLayout>
  );
}
