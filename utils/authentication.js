export async function signIn(supabaseClient) {
  const { error } = await supabaseClient.auth.signIn({ provider: "google" });
  if (error) console.log(error);
}

export async function signOut(supabaseClient) {
  const { error } = await supabaseClient.auth.signOut();
  if (error) console.log(error);
}
