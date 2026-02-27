import "@/styles/globals.css";
import {  Inter} from "next/font/google";



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
