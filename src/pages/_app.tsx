import "tailwindcss/tailwind.css";
import NavigationHeader from "../components/navigation-header";
import NavigationFooter from "../components/navigation-footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavigationHeader />

      <Component {...pageProps} />

      <NavigationFooter />
    </>
  );
}

export default MyApp;
