import React, { useEffect, useRef, useState } from "react";
import Paper from "../../DisplayPaper/Paper";
import { useStateValue } from "../../Context/StateProvider";
import ReactToPrint from "react-to-print";
import PrintIcon from "@material-ui/icons/Print";
import axios from "../../axios";

function SavedPaper() {
  const [{ savedPaper }] = useStateValue();
  const physics = savedPaper.subjects.includes("Physics");
  const chemistry = savedPaper.subjects.includes("Chemistry");
  const maths = savedPaper.subjects.includes("Maths");
  const biology = savedPaper.subjects.includes("Biology");

  const componentRef = useRef();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const req = await axios.get("/get-questions", {
        params: {
          physics: savedPaper.phyArr,
          chemistry: savedPaper.chemArr,
          maths: savedPaper.mathsArr,
          biology: savedPaper.bioArr,
        },
      });
      setQuestions(req.data);
      console.log(req.data);
    };
    getQuestions();
  }, [
    savedPaper.chemArr,
    savedPaper.bioArr,
    savedPaper.mathsArr,
    savedPaper.phyArr,
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

  return (
    <div className="print">
      <div className="btn__link">
        <ReactToPrint
          pageStyle={pageStyle}
          trigger={() => (
            <button className="printButton btn_link">
              <PrintIcon />
              {" Print "}
            </button>
          )}
          content={() => componentRef.current}
          documentTitletitle={"Mock Test"}
        />
      </div>

      <div className="paper" ref={componentRef}>
        {JSON.stringify(questions) !== JSON.stringify([]) && (
          <Paper
            physics={physics}
            chemistry={chemistry}
            maths={maths}
            biology={biology}
            phyArr={questions.phyArr}
            chemArr={questions.chemArr}
            mathsArr={questions.mathsArr}
            bioArr={questions.bioArr}
            thrs={savedPaper.thrs}
            tmins={savedPaper.tmins}
            dateString={savedPaper.date}
            marks={savedPaper.marks}
          />
        )}
      </div>
    </div>
  );
}

export default SavedPaper;
