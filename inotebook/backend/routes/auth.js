const express = require("express");
const User = require("../modals/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "MshabbirU";

// ROUTE 1; Creat a user using : POST "/api/auth/creatuser". no login  required
router.post(
    "/creatuser", [
        body("name", "Enter a valid name ").isLength({ min: 4 }),
        // user must be an email
        body("email", "Enter a valid email").isEmail(),
        // password me at least 5 chars longust b
        body("password", "password me at least 5 chars longust b").isLength({
            min: 5,
        }),
    ],
    async(req, res) => {
        //if there are errors bad request and the errers
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Check whether the user with this email exists already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ error: "sorry a user with this email alerdy exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            //creat new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const jwtData = jwt.sign(data, JWT_SECRET);
            console.log(jwtData);

            res.json({ jwtData });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Some Error Occured");
        }
    }
);

// ROUTE 2;authntication a user using : POST "/api/auth/creatuser". no login  required
router.post(
        "/login", [
            body("email", "Enter a valid email").isEmail(),

            body("password", "Enter a valid email").exists(),
        ],
        async(req, res) => {
            //if there are errors bad request and the errers
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { email, password } = req.body;
            try {
                let user = await User.findOne({ email });
                if (!user) {
                    return res.status(400).json({ error: "Sorry user dose not exists" });
                }
                const passwordCompare = await bcrypt.compare(password, user.password);

                if (!passwordCompare) {
                    return res.status(400).json({ error: "Sorry user dose not exists" });
                }

                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const jwtData = jwt.sign(data, JWT_SECRET);
                console.log(jwtData);

                res.json({ jwtData });
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Enteral server error");
            }
        }
    ),
    // ROUTE 3; get loggedin user details using : POST "/api/auth/getuser". no login  required

    router.post("/getuser", fetchuser, async(req, res) => {
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server Error");
        }
    });
module.exports = router;