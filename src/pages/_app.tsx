import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
