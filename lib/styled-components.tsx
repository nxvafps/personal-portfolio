"use client";

import { StyleSheetManager, ServerStyleSheet } from "styled-components";
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // Don't clear the sheet here, as it leads to styles being lost
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    // Client-side rendering should still use StyleSheetManager for consistency
    return <StyleSheetManager>{children}</StyleSheetManager>;
  }

  // On server, use StyleSheetManager with custom sheet
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
