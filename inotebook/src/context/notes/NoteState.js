//import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //get  All Notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4M2Y4MzI0MGQ2YjdiYWJhMmM1OGY0In0sImlhdCI6MTY1MjgxNTk1Mn0.m1Tz7QS-wCjj81KhaBIor1MDLBGc8fbYIq8av3iBJbg",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add A Note
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "post",
      headers: {
        "content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4M2Y4MzI0MGQ2YjdiYWJhMmM1OGY0In0sImlhdCI6MTY1MjgxNTk1Mn0.m1Tz7QS-wCjj81KhaBIor1MDLBGc8fbYIq8av3iBJbg",
      },
      body: JSON.stringify(title, description, tag),
    });
    // const json = response.json();

    console.log("adding a new note");
    //Todo Api Call
    const note = {
      _id: "62892bae407c756187b2295d",
      user: "6283f83240d6b7baba2c58f4",
      title: title,
      description: description,
      tag: tag,
      date: "2022-05-21T18:13:02.822Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (id) => {
    console.log("deleting the note" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "put",
      headers: {
        "content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4M2Y4MzI0MGQ2YjdiYWJhMmM1OGY0In0sImlhdCI6MTY1MjgxNTk1Mn0.m1Tz7QS-wCjj81KhaBIor1MDLBGc8fbYIq8av3iBJbg",
      },
      body: JSON.stringify(title, description, tag),
    });
    const json = response.json();

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
