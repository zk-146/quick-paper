import React, { useEffect, useRef, useState } from "react";
import "./DisplayPaper.css";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import { TiCloudStorage } from "react-icons/ti";
import axios from "../axios";
import { useStateValue } from "../Context/StateProvider";
import { parseCookies } from "nookies";
import Paper from "./Paper";

function DisplayPaper() {
  var physics = false;
  var chemistry = false;
  var maths = false;
  var biology = false;

  const componentRef = useRef();

  const [{ questions, paperPara }] = useStateValue();
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : null;
  const [phyArr, setPhyArr] = useState([]);
  const [chemArr, setChemArr] = useState([]);
  const [mathsArr, setMathsArr] = useState([]);
  const [bioArr, setBioArr] = useState([]);

  const date = paperPara.date;
  var dateString = date.toString();
  dateString = new Date(dateString).toLocaleDateString("en-GB");

  const [{ chptList }] = useStateValue();

  const {
    totalQuestions,
    phyQuestions,
    chemQuestions,
    mathsQuestions,
    bioQuestions,
  } = questions;

  if (totalQuestions > 0) {
    if (phyQuestions > 0) {
      physics = true;
    }
    if (chemQuestions > 0) {
      chemistry = true;
    }
    if (mathsQuestions > 0) {
      maths = true;
    }
    if (bioQuestions > 0) {
      biology = true;
    }
  }

  const phyChptList = chptList[0];
  const chemChptList = chptList[1];
  const mathsChptList = chptList[2];
  const bioChptList = chptList[3];

  const [paperSaved, setPaperSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (physics === true) {
        const reqPhy = await axios.get(
          `displaypaper/physics?phyQuestions=${phyQuestions}&email=${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              chptList,
              phyChptList,
            },
          }
        );
        setPhyArr(reqPhy.data);
      }

      if (chemistry === true) {
        const reqChem = await axios.get(
          `displaypaper/chemistry?chemQuestions=${chemQuestions}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              chptList,
              chemChptList,
            },
          }
        );
        setChemArr(reqChem.data);
      }

      if (maths === true) {
        const reqMaths = await axios.get(
          `displaypaper/maths?mathsQuestions=${mathsQuestions}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              chptList,
              mathsChptList,
            },
          }
        );
        setMathsArr(reqMaths.data);
      }

      if (biology === true) {
        const reqBio = await axios.get(
          `displaypaper/biology?bioQuestions=${bioQuestions}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              chptList,
              bioChptList,
            },
          }
        );
        setBioArr(reqBio.data);
      }
    };
    fetchData();
  }, [
    bioChptList,
    bioQuestions,
    biology,
    chemChptList,
    chemQuestions,
    chemistry,
    chptList,
    maths,
    mathsChptList,
    mathsQuestions,
    phyChptList,
    phyQuestions,
    physics,
    user.email,
  ]);

  const pageStyle = `
    @page {
      size: A4;  
      margin: 5mm 0mm 5mm 0mm;
    }  
    @media all {
      .pagebreak {
        display: none;
      }
    }
    @media print {
      .pagebreak {
        page-break-before: always;
      }
    }
    `;

  const savePaper = async () => {
    const subjects = [];
    if (physics === true) {
      subjects.push("Physics");
    }
    if (chemistry === true) {
      subjects.push("Chemistry");
    }
    if (maths === true) {
      subjects.push("Maths");
    }
    if (biology === true) {
      subjects.push("Biology");
    }
    if (!physics && !chemistry && !maths && !biology) {
      return console.log("No Questions in the paper");
    }

    const physics_questions = phyArr.map((data) => {
      return { questions: data._id };
    });

    const chemistry_questions = chemArr.map((data) => {
      return { questions: data._id };
    });

    const maths_questions = mathsArr.map((data) => {
      return { questions: data._id };
    });
    const biology_questions = bioArr.map((data) => {
      return { questions: data._id };
    });

    const paperData = {
      phyArr: physics_questions,
      chemArr: chemistry_questions,
      mathsArr: maths_questions,
      bioArr: biology_questions,
      marks: paperPara.marks,
      subjects,
      institute: paperPara.institute,
      negMarks: paperPara.negMarks,
      date: dateString,
      thrs: paperPara.thrs,
      tmins: paperPara.tmins,
    };

    await axios.post("/save-paper", {
      paperData,
    });
    setPaperSaved(true);
  };

  return (
    <div className="print">
      <div className="btn__link">
        <ReactToPrint
          pageStyle={pageStyle}
          trigger={() => (
            <button className="printButton btn__link">
              <PrintIcon />
              {"Print "}
            </button>
          )}
          content={() => componentRef.current}
          documentTitle="Mock Test"
        />
        <button
          className="printButton"
          onClick={() => {
            !paperSaved && savePaper();
          }}
        >
          <TiCloudStorage />
          {!paperSaved ? "Save to collections" : "Saved"}
        </button>
      </div>

      <div className="paper" ref={componentRef}>
        <Paper
          physics={physics}
          chemistry={chemistry}
          maths={maths}
          biology={biology}
          phyArr={phyArr}
          chemArr={chemArr}
          mathsArr={mathsArr}
          bioArr={bioArr}
          dateString={dateString}
          marks={paperPara.marks}
          negMarks={paperPara.negMarks}
          tmins={paperPara.tmins}
          thrs={paperPara.thrs}
        />
      </div>
    </div>
  );
}

export default DisplayPaper;
