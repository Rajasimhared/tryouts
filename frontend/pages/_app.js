import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../styles/createEmotionCache";
import ChatProvider from "../Context/ChatProvider";

import "/styles/globals.css";
import theme from "../styles/theme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title> MUI5 Nextjs </title>{" "}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ChatProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ChatProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
