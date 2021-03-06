const express = require("express");
const Authenticated = require("../middleware/Authenticated");
const router = express.Router();
const SavedPaper = require("../models/dbSavedPapers");
const PhysicsQuestions = require("../models/dbPhysicsQuestions");
const MathsQuestions = require("../models/dbMathsQuestions");
const ChemistryQuestions = require("../models/dbChemistryQuestions");
const BiologyQuestions = require("../models/dbBiologyQuestions");

router.get(
  "/get-questions",
  Authenticated(async (req, res) => {
    const { physics, chemistry, maths, biology } = req.query;
    let phy;
    if (physics) {
      phy = physics.map((data) => {
        let ids = JSON.parse(data);
        return ids.questions.toString();
      });
    }
    let chem;
    if (chemistry) {
      chem = chemistry.map((data) => {
        let ids = JSON.parse(data);
        return ids.questions.toString();
      });
    }
    let math;
    if (maths) {
      math = maths.map((data) => {
        let ids = JSON.parse(data);
        return ids.questions.toString();
      });
    }
    let bio;
    if (biology) {
      bio = biology.map((data) => {
        let ids = JSON.parse(data);
        return ids.questions.toString();
      });
    }
    const phyArr = await PhysicsQuestions.find({
      _id: {
        $in: phy,
      },
    });
    const chemArr = await ChemistryQuestions.find({
      _id: {
        $in: chem,
      },
    });
    const mathsArr = await MathsQuestions.find({
      _id: {
        $in: math,
      },
    });
    const bioArr = await BiologyQuestions.find({
      _id: {
        $in: bio,
      },
    });
    res.status(200).send({ phyArr, chemArr, mathsArr, bioArr });
  })
);

router.post(
  "/save-paper",
  Authenticated((req, res) => {
    try {
      const paperData = req.body.paperData;

      paperData.user = req.userId;

      SavedPaper.create(paperData, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          return res.status(201).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  })
);

router.get(
  "/save-paper",
  Authenticated((req, res) => {
    try {
      SavedPaper.find({ user: req.userId }, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        return res.status(200).send(data);
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send();
    }
  })
);

module.exports = router;
