import "tailwindcss/tailwind.css";
import NavigationHeader from "../components/navigation-header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavigationHeader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
