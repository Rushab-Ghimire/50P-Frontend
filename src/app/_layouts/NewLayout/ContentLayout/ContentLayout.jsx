import { ContentThemeProvider } from "@app/_components/_core";
import { JumboLayout, JumboLayoutProvider } from "@jumbo/components";
import { SIDEBAR_STYLES, SIDEBAR_VARIANTS } from "@jumbo/utilities/constants";
import React from "react";

export function ContentLayout({
  header,
  sidebar,
  headerOptions = {},
  sidebarOptions = {},
  contentOptions = {},
  rootOptions = {},
  wrapperOptions = {},
  mainOptions = {},
  children,
}) {
  return (
    <ContentThemeProvider>
      <JumboLayoutProvider
        layoutConfig={{
          header: {
            hide: true,
            fixed: false,
            plain: true,
            ...headerOptions,
          },
          sidebar: {
            open: false,
            hide: false,
            variant: SIDEBAR_VARIANTS.PERMANENT,
            plain: true,
            ...sidebarOptions,
          },
          footer: {
            hide: true,
          },
          root: rootOptions,
          content: contentOptions,
          wrapper: wrapperOptions,
          main: mainOptions,
        }}
      >
        <JumboLayout header={header} sidebar={sidebar}>
          {children}
        </JumboLayout>
      </JumboLayoutProvider>
    </ContentThemeProvider>
  );
}
