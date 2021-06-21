import { useEffect, useState } from "react";
import { Auth, Button } from "@supabase/ui";
import supabaseClient from "../utils/supabaseClient";
import AddForm from "../components/AddForm";
import { fetchData, deleteNote } from "../utils/note";

export default function Note() {
  const [data, setData] = useState([]);
  const [newData, handleNewData] = useState(null);
  const [deletedData, handleDeletedData] = useState(null);

  const { user } = Auth.useUser();

  const getData = async () => {
    const data = await fetchData();
    setData(data);
    console.log(data);
  };

  const getChange = async () => {
    const mySubscription = supabaseClient
      .from("notes")
      .on("INSERT", (payload) => {
        console.log(payload);
        handleNewData(payload.new);
      })
      .on("DELETE", (payload) => {
        console.log(payload.old.id);
        handleDeletedData(payload.old);
      })
      .subscribe();
    return mySubscription;
  };

  useEffect(() => {
    getData();
    const mySubscription = getChange();

    return () => {
      supabaseClient.removeSubscription(mySubscription);
    };
  }, []);

  useEffect(() => {
    console.log("newData value", newData);
    if (newData) {
      setData([...data, newData]);
      handleNewData(null);
    }
  }, [newData]);

  useEffect(() => {
    if (deletedData) {
      setData(data.filter((data) => data.id !== deletedData.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedData]);

  return (
    <div>
      <AddForm user={user} />
      <h1>Here's your data: </h1>
      {data.map((item) => (
        <div key={item.id}>
          <h1>{item.heading}</h1>
          <p>
            {item.body}, {item.id}
          </p>
          <Button onClick={() => deleteNote(item.id)}> Remove </Button>
        </div>
      ))}
    </div>
  );
}
