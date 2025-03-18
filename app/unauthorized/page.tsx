"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PrimaryButton = styled(Link)`
  display: block;
  padding: 0.5rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const SecondaryButton = styled(Link)`
  display: block;
  padding: 0.5rem 1.5rem;
  background-color: #e5e7eb;
  color: #1f2937;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d1d5db;
  }
`;

export default function UnauthorizedPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <Container>
      <Title>Access Denied</Title>
      <Description>
        You don&apos;t have permission to access this page.
      </Description>

      <ButtonContainer>
        <PrimaryButton href="/">Go to Homepage</PrimaryButton>
        <SecondaryButton href="/dashboard">Go to Dashboard</SecondaryButton>
      </ButtonContainer>
    </Container>
  );
}
