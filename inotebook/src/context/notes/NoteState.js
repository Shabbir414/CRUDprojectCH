//import react from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6288b8bbadc54eb38e32e86d",
      user: "6283f83240d6b7baba2c58f4",
      title: "new Title",
      description: "Please try and try",
      tag: "xyz",
      date: "2022-05-21T10:02:35.674Z",
      __v: 0,
    },
    {
      _id: "62891b4715cafaa988f0f4aa",
      user: "6283f83240d6b7baba2c58f4",
      title: "new Title",
      description: "Please try and try",
      tag: "xyz",
      date: "2022-05-21T17:03:03.543Z",
      __v: 0,
    },
    {
      _id: "62892bae407c756187b2295d",
      user: "6283f83240d6b7baba2c58f4",
      title: "new new2 Title",
      description: "Please try and try",
      tag: "xyz",
      date: "2022-05-21T18:13:02.822Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;