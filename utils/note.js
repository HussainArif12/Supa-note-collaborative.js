import supabaseClient from "./supabaseClient";

export const fetchData = async () => {
  let { data, error } = await supabaseClient
    .from("notes")
    .select("*")
    .order("id", { ascending: true });
  if (error) console.log("error", error);
  return data;
};

export const add = async (heading, body, user) => {
  const { data, error } = await supabaseClient
    .from("notes")
    .insert({ heading: heading, body: body, user_id: user.id })
    .single();

  console.log("added ", data);
  if (error) console.log(error);
};

export const deleteNote = async (id) => {
  try {
    let { body } = await supabaseClient
      .from("notes")
      .delete()
      .match({ id: id });
    console.log("deleted", body);
  } catch (error) {
    console.log("error", error);
  }
};
