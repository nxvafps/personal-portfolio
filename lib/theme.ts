export const theme = {
  colors: {
    // Primary colors
    primary: "#f97316", // Orange
    primaryHover: "#ea580c", // Darker orange for hover effects
    primaryLight: "#ffedd5", // Light orange for backgrounds

    // Secondary colors
    secondary: "#0a0a0a", // Almost black
    secondaryHover: "#171717", // Dark gray for hover effects
    secondaryLight: "#262626", // Lighter dark for backgrounds

    // Text colors
    text: {
      primary: "#171717", // Dark text for light backgrounds
      secondary: "#525252", // Gray text
      light: "#ededed", // Light text for dark backgrounds
    },

    // UI colors
    background: {
      light: "#ffffff",
      dark: "#0a0a0a",
    },
    border: {
      light: "#e5e7eb",
      dark: "#262626",
    },

    // States
    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },

  // Typography
  typography: {
    fontFamily: {
      body: "Arial, Helvetica, sans-serif",
      heading: "Arial, Helvetica, sans-serif",
      mono: "monospace",
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      md: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  // Spacing
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Border radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    DEFAULT: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px", // Fully rounded (for circles)
  },

  // Box shadow
  boxShadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

// Type for the theme
export type Theme = typeof theme;

// Helper for media queries
export const media = {
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  "2xl": `@media (min-width: ${theme.breakpoints["2xl"]})`,
};
