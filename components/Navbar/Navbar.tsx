"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  const handleSignOut = () => {
    setMenuOpen(false);
    signOut();
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <NavContainer role="navigation" aria-label="Main navigation">
      <NavInner>
        <NavContent>
          <NavSection>
            <LogoContainer>
              <Logo href="/" aria-label="Go to homepage">
                Portfolio
              </Logo>
            </LogoContainer>

            <DesktopNavLinks aria-label="Desktop navigation menu">
              <NavLink
                href="/"
                $active={isActive("/")}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
              </NavLink>
              <NavLink
                href="/projects"
                $active={isActive("/projects")}
                aria-current={isActive("/projects") ? "page" : undefined}
              >
                Projects
              </NavLink>
              <NavLink
                href="/about"
                $active={isActive("/about")}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About
              </NavLink>
              <NavLink
                href="/contact"
                $active={isActive("/contact")}
                aria-current={isActive("/contact") ? "page" : undefined}
              >
                Contact
              </NavLink>
            </DesktopNavLinks>
          </NavSection>

          <AuthSection>
            {status === "authenticated" ? (
              <UserInfo>
                <NavLink
                  href="/dashboard"
                  $active={isActive("/dashboard")}
                  aria-current={isActive("/dashboard") ? "page" : undefined}
                >
                  Dashboard
                </NavLink>

                <UserInfo
                  aria-label={`Signed in as ${session.user?.name || "User"}`}
                >
                  {session.user?.image ? (
                    <Avatar
                      src={session.user.image}
                      alt={`${session.user.name}'s profile picture`}
                    />
                  ) : (
                    <DefaultAvatar aria-hidden="true">
                      {session.user?.name?.charAt(0) || "U"}
                    </DefaultAvatar>
                  )}
                  <UserName>{session.user?.name}</UserName>
                </UserInfo>

                <SignOutButton onClick={handleSignOut} aria-label="Sign out">
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

          <MobileMenuButton
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close main menu" : "Open main menu"}
          >
            <span className="sr-only">
              {menuOpen ? "Close main menu" : "Open main menu"}
            </span>
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

      <MobileMenu
        $isOpen={menuOpen}
        id="mobile-menu"
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Mobile navigation menu"
      >
        <MobileNavLinks>
          <MobileNavLink
            href="/"
            $active={isActive("/")}
            aria-current={isActive("/") ? "page" : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            Home
          </MobileNavLink>
          <MobileNavLink
            href="/projects"
            $active={isActive("/projects")}
            aria-current={isActive("/projects") ? "page" : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            Projects
          </MobileNavLink>
          <MobileNavLink
            href="/about"
            $active={isActive("/about")}
            aria-current={isActive("/about") ? "page" : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            About
          </MobileNavLink>
          <MobileNavLink
            href="/contact"
            $active={isActive("/contact")}
            aria-current={isActive("/contact") ? "page" : undefined}
            tabIndex={menuOpen ? 0 : -1}
          >
            Contact
          </MobileNavLink>
        </MobileNavLinks>

        <MobileAuthSection>
          {status === "authenticated" ? (
            <>
              <MobileUserInfo
                aria-label={`Signed in as ${session.user?.name || "User"}`}
              >
                {session.user?.image ? (
                  <MobileAvatar
                    src={session.user.image}
                    alt={`${session.user.name}'s profile picture`}
                  />
                ) : (
                  <MobileDefaultAvatar aria-hidden="true">
                    {session.user?.name?.charAt(0) || "U"}
                  </MobileDefaultAvatar>
                )}
                <MobileUserTextInfo>
                  <MobileUserName>{session.user?.name}</MobileUserName>
                  <MobileUserEmail>{session.user?.email}</MobileUserEmail>
                </MobileUserTextInfo>
              </MobileUserInfo>
              <MobileAuthLinks>
                <MobileAuthLink href="/dashboard" tabIndex={menuOpen ? 0 : -1}>
                  Dashboard
                </MobileAuthLink>
                <MobileSignOutButton
                  onClick={handleSignOut}
                  aria-label="Sign out"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  Sign out
                </MobileSignOutButton>
              </MobileAuthLinks>
            </>
          ) : (
            <MobileAuthLinks>
              <MobileAuthLink href="/login" tabIndex={menuOpen ? 0 : -1}>
                Sign in
              </MobileAuthLink>
              <MobileAuthLink href="/register" tabIndex={menuOpen ? 0 : -1}>
                Register
              </MobileAuthLink>
            </MobileAuthLinks>
          )}
        </MobileAuthSection>
      </MobileMenu>
    </NavContainer>
  );
}
