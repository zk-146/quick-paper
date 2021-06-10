const express = require("express");
const router = express.Router();
const Authenticated = require("../middleware/Authenticated");
const PhysicsChapters = require("../models/dbPhysicsChapters");
const ChemistryChapters = require("../models/dbChemistryChapters");
const MathsChapters = require("../models/dbMathsChapters");
const BiologyChapters = require("../models/dbBiologyChapters");

router.get(
  "/setpaper/physics",
  Authenticated(async (req, res) => {
    try {
      PhysicsChapters.find((err, data) => {
        if (err) {
          return res.status(500).send();
        } else {
          res.status(200).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  })
);

router.post(
  "/setpaper/physics",
  Authenticated(async (req, res) => {
    try {
      const dbchapters = req.body;
      PhysicsChapters.create(dbchapters, (err, data) => {
        if (err) {
          return res.status(500).send();
        } else {
          return res.status(201).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send();
    }
  })
);

router.get(
  "/setpaper/chemistry",
  Authenticated(async (req, res) => {
    try {
      ChemistryChapters.find((err, data) => {
        if (err) {
          return res.status(500).send();
        } else {
          return res.status(200).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  })
);

router.post(
  "/setpaper/chemistry",
  Authenticated(async (req, res) => {
    try {
      const dbchapters = req.body;
      ChemistryChapters.create(dbchapters, (err, data) => {
        if (err) {
          return res.status(500).send();
        } else {
          return res.status(201).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send();
    }
  })
);

router.get(
  "/setpaper/maths",
  Authenticated(async (req, res) => {
    try {
      MathsChapters.find((err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(200).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send();
    }
  })
);

router.post(
  "/setpaper/maths",
  Authenticated(async (req, res) => {
    try {
      const dbchapters = req.body;
      MathsChapters.create(dbchapters, (err, data) => {
        if (err) {
          return res.status(500).send();
        } else {
          return res.status(201).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send();
    }
  })
);

router.get(
  "/setpaper/biology",
  Authenticated(async (req, res) => {
    try {
      BiologyChapters.find((err, data) => {
        if (err) {
          return res.status(500).send();
        } else {
          return res.status(200).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  })
);

router.post(
  "/setpaper/biology",
  Authenticated(async (req, res) => {
    try {
      const dbchapters = req.body;
      BiologyChapters.create(dbchapters, (err, data) => {
        if (err) {
          return res.status(500).send();
        } else {
          return res.status(201).send(data);
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send();
    }
  })
);

module.exports = router;
