"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
  NavContainer,
  NavInner,
  NavContent,
  NavSection,
  LogoContainer,
  Logo,
  DesktopNavLinks,
  NavLink,
  AuthSection,
  AuthLinks,
  UserInfo,
  Avatar,
  DefaultAvatar,
  UserName,
  SignInLink,
  RegisterLink,
  SignOutButton,
  MobileMenuButton,
  MobileMenu,
  MobileNavLinks,
  MobileNavLink,
  MobileAuthSection,
  MobileUserInfo,
  MobileAvatar,
  MobileDefaultAvatar,
  MobileUserTextInfo,
  MobileUserName,
  MobileUserEmail,
  MobileAuthLinks,
  MobileAuthLink,
  MobileSignOutButton,
} from "./styles";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <NavContainer>
      <NavInner>
        <NavContent>
          <NavSection>
            <LogoContainer>
              <Logo href="/">Portfolio</Logo>
            </LogoContainer>
            <DesktopNavLinks>
              <NavLink href="/" $active={isActive("/")}>
                Home
              </NavLink>
              <NavLink href="/projects" $active={isActive("/projects")}>
                Projects
              </NavLink>
              <NavLink href="/about" $active={isActive("/about")}>
                About
              </NavLink>
              <NavLink href="/contact" $active={isActive("/contact")}>
                Contact
              </NavLink>
            </DesktopNavLinks>
          </NavSection>
          <AuthSection>
            {status === "authenticated" ? (
              <UserInfo>
                <NavLink href="/dashboard" $active={isActive("/dashboard")}>
                  Dashboard
                </NavLink>
                <UserInfo>
                  {session.user?.image ? (
                    <Avatar src={session.user.image} alt="User avatar" />
                  ) : (
                    <DefaultAvatar>
                      {session.user?.name?.charAt(0) || "U"}
                    </DefaultAvatar>
                  )}
                  <UserName>{session.user?.name}</UserName>
                </UserInfo>
                <SignOutButton onClick={() => signOut()}>
                  Sign out
                </SignOutButton>
              </UserInfo>
            ) : (
              <AuthLinks>
                <SignInLink href="/login">Sign in</SignInLink>
                <RegisterLink href="/register">Register</RegisterLink>
              </AuthLinks>
            )}
          </AuthSection>

          <MobileMenuButton onClick={() => setMenuOpen(!menuOpen)}>
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </MobileMenuButton>
        </NavContent>
      </NavInner>

      <MobileMenu $isOpen={menuOpen}>
        <MobileNavLinks>
          <MobileNavLink href="/" $active={isActive("/")}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/projects" $active={isActive("/projects")}>
            Projects
          </MobileNavLink>
          <MobileNavLink href="/about" $active={isActive("/about")}>
            About
          </MobileNavLink>
          <MobileNavLink href="/contact" $active={isActive("/contact")}>
            Contact
          </MobileNavLink>
        </MobileNavLinks>

        <MobileAuthSection>
          {status === "authenticated" ? (
            <>
              <MobileUserInfo>
                {session.user?.image ? (
                  <MobileAvatar src={session.user.image} alt="User avatar" />
                ) : (
                  <MobileDefaultAvatar>
                    {session.user?.name?.charAt(0) || "U"}
                  </MobileDefaultAvatar>
                )}
                <MobileUserTextInfo>
                  <MobileUserName>{session.user?.name}</MobileUserName>
                  <MobileUserEmail>{session.user?.email}</MobileUserEmail>
                </MobileUserTextInfo>
              </MobileUserInfo>
              <MobileAuthLinks>
                <MobileAuthLink href="/dashboard">Dashboard</MobileAuthLink>
                <MobileSignOutButton onClick={() => signOut()}>
                  Sign out
                </MobileSignOutButton>
              </MobileAuthLinks>
            </>
          ) : (
            <MobileAuthLinks>
              <MobileAuthLink href="/login">Sign in</MobileAuthLink>
              <MobileAuthLink href="/register">Register</MobileAuthLink>
            </MobileAuthLinks>
          )}
        </MobileAuthSection>
      </MobileMenu>
    </NavContainer>
  );
}
