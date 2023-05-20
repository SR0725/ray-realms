import type { AppProps } from "next/app";
import "@styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
