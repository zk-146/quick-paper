const express = require("express");
const Authenticated = require("../middleware/Authenticated");
const router = express.Router();
const User = require("../models/users");
const validator = require("validator");
const AuthenticatedAdmin = require("../middleware/AuthenticatedAdmin");

router.post("/signup", async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    if (!name || !email || !password || !mobile) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: "Enter a valid email address" });
    }
    if (name.trim() === "") {
      return res.status(422).json({ error: "Name is required" });
    }
    if (mobile.trim().length !== 10) {
      return res
        .status(422)
        .json({ error: "Please enter a 10 digit mobile number" });
    }

    const user = await new User({
      name: String(name),
      email: String(email),
      password: String(password),
      mobile: String(mobile),
      role: "user",
    }).save();

    const token = await user.generateAuthToken();

    res.cookie("token", token, {
      sameSite: "lax",
      path: "/",
      expires: new Date(new Date().getTime() + 604800 * 1000),
      httpOnly: true,
    });

    res.cookie("user", JSON.stringify(user), {
      expires: new Date(new Date().getTime() + 604800 * 1000),
    });

    res.cookie("isAuth", true, {
      expires: new Date(new Date().getTime() + 604800 * 1000),
    });

    res.status(201).send("Account created");
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .send({ error: "Email address has already been taken" });
    }
    res.status(500).send({ error: "An error occurred on the server side" });
  }
});

router.post("/login", async (req, res) => {
  const delayResponse = (response) => {
    setTimeout(() => {
      response();
    }, 1000);
  };

  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.cookie("token", token, {
      sameSite: "lax",
      path: "/",
      expires: new Date(new Date().getTime() + 604800 * 1000),
      httpOnly: true,
    });

    res.cookie("user", JSON.stringify(user), {
      expires: new Date(new Date().getTime() + 604800 * 1000),
    });

    res.cookie("isAuth", true, {
      expires: new Date(new Date().getTime() + 604800 * 1000),
    });
    return res.send();
  } catch (err) {
    console.log(err.message);
    return delayResponse(() => {
      res.status(400).json({ error: err.message });
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.status(200).clearCookie("token").send("Token removed");
  } catch (err) {
    res.status(400).send();
  }
});

router.post(
  "/change-name",
  Authenticated(async (req, res) => {
    const name = req.body.name;

    try {
      await User.findOneAndUpdate(
        { _id: String(req.userId) },
        {
          $set: { name: String(name) },
        },
        (err) => {
          if (err) {
            return res.status(500).send({ error: "An error occurred" });
          }
        }
      );
      const userData = await User.findById(String(req.userId));
      userData.password = undefined;
      res.cookie("user", JSON.stringify(userData), {
        expires: new Date(new Date().getTime() + 604800 * 1000),
      });
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(400).send();
    }
  })
);

router.get(
  "/user/all",
  AuthenticatedAdmin(async (req, res) => {
    try {
      const allUsers = await User.find();
      res.send(allUsers);
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  })
);

module.exports = router;
