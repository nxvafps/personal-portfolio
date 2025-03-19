export const theme = {
  colors: {
    primary: "#f97316",
    primaryHover: "#ea580c",
    primaryLight: "#ffedd5",

    secondary: "#0a0a0a",
    secondaryHover: "#171717",
    secondaryLight: "#262626",

    text: {
      primary: "#171717",
      secondary: "#525252",
      light: "#ededed",
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

    success: "#22c55e",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },

  typography: {
    fontFamily: {
      body: "Arial, Helvetica, sans-serif",
      heading: "Arial, Helvetica, sans-serif",
      mono: "monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },

  boxShadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

export type Theme = typeof theme;

// Helper for media queries
export const media = {
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`,
  "2xl": `@media (min-width: ${theme.breakpoints["2xl"]})`,
};
