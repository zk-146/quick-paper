const express = require("express");
const Authenticated = require("../middleware/Authenticated");
const router = express.Router();
const PhysicsQuestions = require("../models/dbPhysicsQuestions");
const ChemistryQuestions = require("../models/dbChemistryQuestions");
const MathsQuestions = require("../models/dbMathsQuestions");
const BiologyQuestions = require("../models/dbBiologyQuestions");
const getQuestions = require("../helpers/getQuestions");
const uploadQuestion = require("../helpers/uploadQuestions");
const AuthenticatedAdmin = require("../middleware/AuthenticatedAdmin");

const limit = 75;

router.get(
  "/displaypaper/physics",
  Authenticated(async (req, res) => {
    const query = req.query;
    const phyChapters = req.query.phyChptList;

    const questions = parseInt(query.phyQuestions);
    if (questions > limit || questions < 1) {
      res.status(400).send();
      return;
    }
    if (
      query.hasOwnProperty("phyQuestions") &&
      questions <= limit &&
      questions > 0
    ) {
      try {
        const phyQuestions = await getQuestions(phyChapters, PhysicsQuestions);
        return res.status(200).send(phyQuestions);
      } catch (err) {
        console.log(err);
        return res.status(400).send();
      }
    }
  })
);

router.get(
  "/displaypaper/chemistry",
  Authenticated(async (req, res) => {
    var query = req.query;
    const chemChapters = req.query.chemChptList;

    var questions = parseInt(query.chemQuestions);
    if (questions > limit || questions < 1) {
      return res.status(400).send();
    }
    if (
      query.hasOwnProperty("chemQuestions") &&
      questions <= limit &&
      questions > 0
    ) {
      try {
        const chemQuestions = await getQuestions(
          chemChapters,
          ChemistryQuestions
        );
        return res.status(200).send(chemQuestions);
      } catch (err) {
        console.log(err);
        return res.status(400).send();
      }
    }
  })
);

router.get(
  "/displaypaper/maths",
  Authenticated(async (req, res) => {
    const query = req.query;
    const mathsChapters = req.query.mathsChptList;

    const questions = parseInt(query.mathsQuestions);
    if (questions > limit || questions < 1) {
      return res.status(400).send();
    }
    if (
      query.hasOwnProperty("mathsQuestions") &&
      questions <= limit &&
      questions > 0
    ) {
      try {
        const mathsQuestions = await getQuestions(
          mathsChapters,
          MathsQuestions
        );
        return res.status(200).send(mathsQuestions);
      } catch (err) {
        console.log(err);
        return res.status(400).send();
      }
    }
  })
);

router.get(
  "/displaypaper/biology",
  Authenticated(async (req, res) => {
    var query = req.query;
    const bioChapters = req.query.bioChptList;

    var questions = parseInt(query.bioQuestions);
    if (questions > limit || questions < 1) {
      return res.status(400).send();
    }
    if (
      query.hasOwnProperty("bioQuestions") &&
      questions <= limit &&
      questions > 0
    ) {
      try {
        const bioQuestions = await getQuestions(bioChapters, BiologyQuestions);
        return res.status(200).send(bioQuestions);
      } catch (err) {
        console.log(err);
        return res.status(400).send();
      }
    }
  })
);

router.post(
  "/add-question/physics",
  AuthenticatedAdmin(async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      subject,
      answer,
      difficulty,
      topicName,
    } = req.body;

    if (
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !subject ||
      !answer ||
      !difficulty ||
      !topicName
    ) {
      return res
        .status(422)
        .json({ error: "Please fill all the required fields" });
    }

    try {
      if (subject === "Physics") {
        const questionData = await uploadQuestion(
          PhysicsQuestions,
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
          difficulty,
          topicName
        );
        return res.status(201).send(questionData);
      } else {
        console.log("Unauthorized");
        return res.status(401).json({ error: "Unauthorized access!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json();
    }
  })
);

router.post(
  "/add-question/chemistry",
  AuthenticatedAdmin(async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      subject,
      answer,
      difficulty,
      topicName,
    } = req.body;

    if (
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !subject ||
      !answer ||
      !difficulty ||
      !topicName
    ) {
      return res
        .status(422)
        .json({ error: "Please fill all the required fields" });
    }

    try {
      if (subject === "Chemistry") {
        const questionData = await uploadQuestion(
          ChemistryQuestions,
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
          difficulty,
          topicName
        );
        return res.status(201).send(questionData);
      } else {
        console.log("Unauthorized");
        return res.status(401).json({ error: "Unauthorized access!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json();
    }
  })
);

router.post(
  "/add-question/maths",
  AuthenticatedAdmin(async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      subject,
      answer,
      difficulty,
      topicName,
    } = req.body;

    if (
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !subject ||
      !answer ||
      !difficulty ||
      !topicName
    ) {
      return res
        .status(422)
        .json({ error: "Please fill all the required fields" });
    }

    try {
      if (subject === "Maths") {
        const questionData = await uploadQuestion(
          MathsQuestions,
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
          difficulty,
          topicName
        );
        return res.status(201).send(questionData);
      } else {
        console.log("Unauthorized");
        return res.status(401).json({ error: "Unauthorized access!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json();
    }
  })
);

router.post(
  "/add-question/biology",
  AuthenticatedAdmin(async (req, res) => {
    const {
      question,
      option1,
      option2,
      option3,
      option4,
      subject,
      answer,
      difficulty,
      topicName,
    } = req.body;

    if (
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !subject ||
      !answer ||
      !difficulty ||
      !topicName
    ) {
      return res
        .status(422)
        .json({ error: "Please fill all the required fields" });
    }

    try {
      if (subject === "Biology") {
        const questionData = await uploadQuestion(
          BiologyQuestions,
          question,
          option1,
          option2,
          option3,
          option4,
          answer,
          difficulty,
          topicName
        );
        return res.status(201).send(questionData);
      } else {
        console.log("Unauthorized");
        return res.status(401).json({ error: "Unauthorized access!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json();
    }
  })
);

module.exports = router;
