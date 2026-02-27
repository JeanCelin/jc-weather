import "@/styles/globals.css";
import { Roboto, Inter, JetBrains_Mono } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});



export default function App({ Component, pageProps }) {
  return (
    <div className={`${inter.className}` }>
      <Component {...pageProps} />
    </div>
  );
}
