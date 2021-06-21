import { Auth } from "@supabase/ui";
import Link from "next/link";
import { Button } from "@supabase/ui";
import { signOut } from "../utils/authentication";

export default function Container(props) {
  const { user } = Auth.useUser();

  if (user)
    return (
      <>
        <h1>Hello {user.user_metadata.full_name}!</h1>
        <Button onClick={() => signOut(props.supabaseClient)}>Sign out</Button>
        <Link href="/note"> View Notes</Link>
      </>
    );
  return props.children;
}
