const express = require("express");
const Authenticated = require("../middleware/Authenticated");
const router = express.Router();
const PhysicsQuestions = require("../models/dbPhysicsQuestions");
const ChemistryQuestions = require("../models/dbChemistryQuestions");
const MathsQuestions = require("../models/dbMathsQuestions");
const BiologyQuestions = require("../models/dbBiologyQuestions");
const User = require("../models/users");

const limit = 75;

router.get(
  "/displaypaper/physics",
  Authenticated(async (req, res) => {
    var query = req.query;
    const phyChapters = req.query.phyChptList;

    var phyQuestions = [];

    var questions = parseInt(query.phyQuestions);
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
        for (let i = 0; i < phyChapters.length; i++) {
          const topicName = JSON.parse(phyChapters[i]).topicName;
          const limit1 = parseInt(JSON.parse(phyChapters[i]).value);
          const chemData = await PhysicsQuestions.aggregate([
            { $match: { topicName } },
            { $sample: { size: limit1 } },
          ]);
          chemData.forEach((data) => {
            phyQuestions.push(data);
          });
        }
        res.status(200).send(phyQuestions);
        return;
      } catch (err) {
        res.status(500).send(err);
        return;
      }
    }
  })
);

router.get(
  "/displaypaper/chemistry",
  Authenticated(async (req, res) => {
    var query = req.query;
    const chemChapters = req.query.chemChptList;

    var chemQuestions = [];

    var questions = parseInt(query.chemQuestions);
    if (questions > limit || questions < 1) {
      res.status(400).send();
      return;
    }
    if (
      query.hasOwnProperty("chemQuestions") &&
      questions <= limit &&
      questions > 0
    ) {
      try {
        for (let i = 0; i < chemChapters.length; i++) {
          const topicName = JSON.parse(chemChapters[i]).topicName;
          const limit1 = parseInt(JSON.parse(chemChapters[i]).value);
          const chemData = await ChemistryQuestions.aggregate([
            { $match: { topicName } },
            { $sample: { size: limit1 } },
          ]);
          chemData.forEach((data) => {
            chemQuestions.push(data);
          });
        }
        res.status(200).send(chemQuestions);
        return;
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
    }
  })
);

router.get(
  "/displaypaper/maths",
  Authenticated(async (req, res) => {
    var query = req.query;
    const mathsChapters = req.query.mathsChptList;

    var mathsQuestions = [];

    var questions = parseInt(query.mathsQuestions);
    if (questions > limit || questions < 1) {
      res.status(400).send();
      return;
    }
    if (
      query.hasOwnProperty("mathsQuestions") &&
      questions <= limit &&
      questions > 0
    ) {
      try {
        for (let i = 0; i < mathsChapters.length; i++) {
          const topicName = JSON.parse(mathsChapters[i]).topicName;
          const limit1 = parseInt(JSON.parse(mathsChapters[i]).value);
          const chemData = await MathsQuestions.aggregate([
            { $match: { topicName } },
            { $sample: { size: limit1 } },
          ]);
          chemData.forEach((data) => {
            mathsQuestions.push(data);
          });
        }
        res.status(200).send(mathsQuestions);
        return;
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
    }
  })
);

router.get(
  "/displaypaper/biology",
  Authenticated(async (req, res) => {
    var query = req.query;
    const bioChapters = req.query.bioChptList;

    var bioQuestions = [];

    var questions = parseInt(query.bioQuestions);
    if (questions > limit || questions < 1) {
      res.status(400).send();
      return;
    }
    if (
      query.hasOwnProperty("bioQuestions") &&
      questions <= limit &&
      questions > 0
    ) {
      try {
        for (let i = 0; i < bioChapters.length; i++) {
          const topicName = JSON.parse(bioChapters[i]).topicName;
          const limit1 = parseInt(JSON.parse(bioChapters[i]).value);
          const chemData = await BiologyQuestions.aggregate([
            { $match: { topicName } },
            { $sample: { size: limit1 } },
          ]);
          chemData.forEach((data) => {
            bioQuestions.push(data);
          });
        }
        res.status(200).send(bioQuestions);
        return;
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
    }
  })
);

router.post(
  "/add-question",
  Authenticated(async (req, res) => {
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
      const user = await User.findById(req.userId);
      if (user.role === "admin") {
        if (subject === "Physics") {
          await PhysicsQuestions.create(
            {
              question,
              option1,
              option2,
              option3,
              option4,
              answer,
              difficulty: difficulty.toLowerCase(),
              topicName,
            },
            (err, data) => {
              if (err) console.log(err);
              if (data)
                return res.send({
                  data,
                });
            }
          );
        }
      } else {
        console.log("Unauthorized");
        return res.status(401).json({ error: "Unauthorized access!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server occurred");
    }
  })
);

module.exports = router;
