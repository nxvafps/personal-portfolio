import styled, { css } from "styled-components";
import Link from "next/link";
import { Theme, media } from "../../lib/theme";

const transition = css`
  transition: all 0.3s ease;
`;

const glassEffect = css<{ $isDark?: boolean }>`
  backdrop-filter: blur(8px);
  background-color: ${({ theme, $isDark }) =>
    $isDark === false
      ? `rgba(${hexToRgb(theme.colors.background.light)}, 0.75)`
      : `rgba(${hexToRgb(theme.colors.secondary)}, 0.85)`};
  ${transition};
`;

function hexToRgb(hex: string) {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

export const NavContainer = styled.header<{ $isDark?: boolean }>`
  ${glassEffect};
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.dark};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
`;

export const NavInner = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};

  ${media.md} {
    padding: ${({ theme }) => theme.spacing[4]}
      ${({ theme }) => theme.spacing[6]};
  }
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing[4]};

  ${media.md} {
    margin-right: ${({ theme }) => theme.spacing[8]};
  }
`;

export const Logo = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  ${transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.05);
  }

  ${media.md} {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

export const DesktopNavLinks = styled.nav`
  display: none;

  ${media.md} {
    display: flex;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing[2]} 0;
  position: relative;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  ${transition};

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    ${transition};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};

    &::after {
      width: 100%;
    }
  }
`;

export const AuthSection = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    align-items: center;
  }
`;

export const AuthLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  object-fit: cover;
  ${transition};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
  }
`;

export const DefaultAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border: 2px solid transparent;
  ${transition};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
  }
`;

export const UserName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.light};
  ${transition};
`;

export const SignInLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  ${transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) =>
      `rgba(${hexToRgb(theme.colors.primary)}, 0.1)`};
  }
`;

export const RegisterLink = styled(Link)`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  ${transition};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SignOutButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  ${transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) =>
      `rgba(${hexToRgb(theme.colors.primary)}, 0.1)`};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  padding: ${({ theme }) => theme.spacing[2]};
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  ${transition};

  ${media.md} {
    display: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) =>
      `rgba(${hexToRgb(theme.colors.secondaryLight)}, 0.5)`};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: ${({ theme }) =>
    `rgba(${hexToRgb(theme.colors.secondary)}, 0.95)`};
  display: flex;
  flex-direction: column;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-100%)"};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  ${transition};
  padding-top: 4rem;
  overflow-y: auto;

  ${media.md} {
    display: none;
  }
`;

export const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]} 0;
`;

export const MobileNavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-left: 4px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};
  background-color: ${({ theme, $active }) =>
    $active
      ? `rgba(${hexToRgb(theme.colors.secondaryLight)}, 0.5)`
      : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  ${transition};

  &:hover {
    background-color: ${({ theme }) =>
      `rgba(${hexToRgb(theme.colors.secondaryLight)}, 0.5)`};
    border-left-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing[8]};
  }
`;

export const MobileAuthSection = styled.div`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  border-top: 1px solid
    ${({ theme }) => `rgba(${hexToRgb(theme.colors.border.dark)}, 0.3)`};
  margin-top: auto;
`;

export const MobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

export const MobileAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-right: ${({ theme }) => theme.spacing[3]};
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  ${transition};
`;

export const MobileDefaultAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-right: ${({ theme }) => theme.spacing[3]};
  border: 2px solid ${({ theme }) => theme.colors.primaryHover};
  ${transition};
`;

export const MobileUserTextInfo = styled.div`
  flex: 1;
`;

export const MobileUserName = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export const MobileUserEmail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const MobileAuthLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const MobileAuthLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  ${transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing[2]};
  }
`;

export const MobileSignOutButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  cursor: pointer;
  ${transition};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    padding-left: ${({ theme }) => theme.spacing[2]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
