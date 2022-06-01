const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../modals/Note");

// ROUTE 1: get all notes using : get "/api/notes/fetchallnotes".  login  required

router.get("/fetchallnotes", fetchuser, async(req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Enteral server error");
    }
});
// ROUTE 2: add note using : post "/api/notes/addnote". login  required

router.post(
    "/addnote",
    fetchuser, [
        body("title", "Enter a valid title ").isLength({ min: 5 }),
        body("description", "description me at least 5 chars longust ").isLength({
            min: 5,
        }),
    ],
    async(req, res) => {
        try {
            const { title, description, tag } = req.body;
            //if there are errors bad request and the errers
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });

            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Enteral server error");
        }
    }
);

// ROUTE 3: Update note using : post "/api/notes/update". login  required

router.put("/update/:id", fetchuser, async(req, res) => {
        try {
            const { title, description, tag } = req.body;
            //creat a new note object
            const newNote = {};
            if (title) {
                newNote.title = title;
            }
            if (description) {
                newNote.description = description;
            }
            if (tag) {
                newNote.tag = tag;
            }

            //find the note to be updated and update it
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Note Found ");
            }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Note Allowed");
            }

            note = await Note.findByIdAndUpdate(
                req.params.id, { $set: newNote }, { new: true }
            );
            res.json({ note });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Enteral server error");
        }
    }),
    // ROUTE 4: delete note using : post "/api/notes/delete". login  required

    router.delete("/delete/:id", fetchuser, async(req, res) => {
        try {
            //find the note to be deleted and delete it
            let note = await Note.findById(req.params.id);
            if (!note) {
                return res.status(404).send("Note Found ");
            }
            //allow deletaion only if user owns this note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Note Allowed");
            }

            note = await Note.findByIdAndDelete(req.params.id);
            res.json({ success: "note deleted", note: note });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Enteral server error");
        }
    });

module.exports = router;