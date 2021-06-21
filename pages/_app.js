import { Auth } from "@supabase/ui";
import supabaseClient from "../utils/supabaseClient";

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}
