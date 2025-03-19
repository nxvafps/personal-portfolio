"use client";

import { StyleSheetManager, ServerStyleSheet } from "styled-components";
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <StyleSheetManager>{children}</StyleSheetManager>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
