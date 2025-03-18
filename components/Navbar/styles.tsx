import styled from "styled-components";
import Link from "next/link";
import { theme, media } from "../../lib/theme";

export const NavContainer = styled.header`
  background-color: ${theme.colors.secondary};
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavInner = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${theme.spacing[8]};
`;

export const Logo = styled(Link)`
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`;

export const DesktopNavLinks = styled.nav`
  display: none;

  ${media.sm} {
    display: flex;
    gap: ${theme.spacing[6]};
  }
`;

export const NavLink = styled(Link)<{ $active: boolean }>`
  padding: ${theme.spacing[2]} 0;
  border-bottom: 2px solid
    ${(props) => (props.$active ? theme.colors.primary : "transparent")};
  color: ${(props) =>
    props.$active ? theme.colors.primary : theme.colors.text.light};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    color: ${theme.colors.primary};
    border-bottom-color: ${(props) =>
      props.$active ? theme.colors.primary : theme.colors.primary};
  }
`;

export const AuthSection = styled.div`
  display: none;

  ${media.sm} {
    display: flex;
    align-items: center;
  }
`;

export const AuthLinks = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
`;

export const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
`;

export const DefaultAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: ${theme.borderRadius.full};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.typography.fontWeight.semibold};
`;

export const UserName = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.light};
`;

export const SignInLink = styled(Link)`
  color: ${theme.colors.text.light};
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const RegisterLink = styled(Link)`
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

export const SignOutButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.light};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const MobileMenuButton = styled.button`
  display: block;
  padding: ${theme.spacing[2]};
  background-color: transparent;
  border: none;
  color: ${theme.colors.text.light};

  ${media.sm} {
    display: none;
  }

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.secondaryLight};
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};

  ${media.sm} {
    display: none;
  }
`;

export const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing[2]} 0;
  background-color: ${theme.colors.secondary};
`;

export const MobileNavLink = styled(Link)<{ $active: boolean }>`
  display: block;
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border-left: 4px solid
    ${(props) => (props.$active ? theme.colors.primary : "transparent")};
  background-color: ${(props) =>
    props.$active ? theme.colors.secondaryLight : "transparent"};
  color: ${(props) =>
    props.$active ? theme.colors.primary : theme.colors.text.light};
  font-size: ${theme.typography.fontSize.md};
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    background-color: ${theme.colors.secondaryLight};
    border-left-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

export const MobileAuthSection = styled.div`
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  background-color: ${theme.colors.secondary};
  border-top: 1px solid ${theme.colors.secondaryLight};
`;

export const MobileUserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing[4]};
`;

export const MobileAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: ${theme.borderRadius.full};
  margin-right: ${theme.spacing[3]};
  object-fit: cover;
`;

export const MobileDefaultAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${theme.borderRadius.full};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-right: ${theme.spacing[3]};
`;

export const MobileUserTextInfo = styled.div`
  flex: 1;
`;

export const MobileUserName = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: ${theme.colors.text.light};
`;

export const MobileUserEmail = styled.div`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const MobileAuthLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

export const MobileAuthLink = styled(Link)`
  display: block;
  padding: ${theme.spacing[2]} 0;
  color: ${theme.colors.text.light};
  font-weight: ${theme.typography.fontWeight.medium};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export const MobileSignOutButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: ${theme.spacing[2]} 0;
  background: none;
  border: none;
  color: ${theme.colors.text.light};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }
`;
