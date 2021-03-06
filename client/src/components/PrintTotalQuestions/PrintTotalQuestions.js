import React, { useEffect } from "react";
import { useStateValue } from "../../Context/StateProvider";

import "./PrintTotalQuestions.css";

function PrintTotalQuestions(props) {
  const totalQuestions =
    props.phyQuestions +
    props.chemQuestions +
    props.mathsQuestions +
    props.bioQuestions;
  const phyQuestions = props.phyQuestions;
  const chemQuestions = props.chemQuestions;
  const mathsQuestions = props.mathsQuestions;
  const bioQuestions = props.bioQuestions;

  const marks = props.marks;
  const negMarks = props.negMarks;
  const thrs = props.thrs;
  const tmins = props.tmins;
  const date = props.date;

  const [, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "SET_QUESTIONS",
      questions: {
        totalQuestions,
        phyQuestions,
        chemQuestions,
        mathsQuestions,
        bioQuestions,
      },
    });
    dispatch({
      type: "SET_CHPTLIST",
      chptList: [
        props.phyChptList,
        props.chemChptList,
        props.mathsChptList,
        props.bioChptList,
      ],
    });
    dispatch({
      type: "SET_PAPERPARA",
      paperPara: {
        marks: marks * totalQuestions,
        negMarks,
        thrs,
        tmins,
        date,
      },
    });
  }, [
    dispatch,
    totalQuestions,
    phyQuestions,
    chemQuestions,
    mathsQuestions,
    bioQuestions,
    marks,
    negMarks,
    thrs,
    tmins,
    date,
    props.phyChptList,
    props.chemChptList,
    props.mathsChptList,
    props.bioChptList,
  ]);

  return (
    <div className="table1">
      <div className="table__newRow">
        <div className="table__newCell table__newRowTopLeftCell">
          Physics Questions
        </div>
        <div className="table__newCell table__newRowTopRightCell table_right">
          {props.phyQuestions}
        </div>
      </div>
      <div className="table__newRow">
        <div className="table__newCell">Chemistry Questions</div>
        <div className="table__newCell table_right">{props.chemQuestions}</div>
      </div>
      <div className="table__newRow">
        <div className="table__newCell">Maths Questions</div>
        <div className="table__newCell table_right">{props.mathsQuestions}</div>
      </div>
      <div className="table__newRow">
        <div className="table__newCell">Biology Questions</div>
        <div className="table__newCell table_right">{props.bioQuestions}</div>
      </div>
      <div className="table__newRow">
        <div className="table__newCell table__newRowBottomLeftCell ">
          Total Questions
        </div>
        <div className="table__newCell table__newRowBottomRightCell table_right">
          {totalQuestions}
        </div>
      </div>
    </div>
  );
}

export default PrintTotalQuestions;
