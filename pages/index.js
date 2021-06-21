import { Button } from "@supabase/ui";
import supabaseClient from "../utils/supabaseClient";
import Container from "../components/Container";
import { signIn } from "../utils/authentication";

export default function Home() {
  return (
    <div>
      <Container supabaseClient={supabaseClient}>
        <Button onClick={() => signIn(supabaseClient)}>Log in</Button>
      </Container>
    </div>
  );
}
