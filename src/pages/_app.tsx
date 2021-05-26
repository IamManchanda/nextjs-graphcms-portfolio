import "tailwindcss/tailwind.css";
import NavigationHeader from "../components/navigation-header";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavigationHeader />
      <div className="px-10">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
