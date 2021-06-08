import React from "react";
import PaperContainer from "../PaperContainer/PaperContainer";

function Paper({
  physics,
  chemistry,
  maths,
  biology,
  phyArr,
  chemArr,
  mathsArr,
  bioArr,
  dateString,
  marks,
  tmins,
  thrs,
  negMarks,
}) {
  return (
    <div className="paper__container">
      <div className="paper__containerLogo">
        <img
          className="paper__containerLogoImage"
          src="https://st4.depositphotos.com/18690434/21334/v/450/depositphotos_213341334-stock-illustration-big-photo-camera-vector-icon.jpg"
          alt="Logo"
        />
      </div>
      <div className="paper__containerInstituteName">
        <p>Expert Classes</p>
      </div>
      <div className="paper__containerTitle">
        <p>
          Mock Test: {physics && "Physics "}
          {chemistry && " Chemistry "}
          {maths && " Maths "}
          {biology && " Biology"}
        </p>
      </div>
      <div className="paper__containerHeader">
        <div className="paper__containerHeaderMarks">
          <p
            className="paper__containerHeaderMarksPositive"
            style={{ fontWeight: "500" }}
          >
            Marks: {marks}
          </p>
          <p
            className="paper__containerHeaderMarksNegative"
            style={{ fontWeight: "500" }}
          >
            Negative Marks: {negMarks}
          </p>
        </div>
        <div className="paper__containerHeaderTime">
          <p className="spacer"></p>
          <p style={{ fontWeight: "500" }}>
            Time: {thrs}hrs {tmins <= 0 ? "" : tmins + "mins"}
          </p>
        </div>
        <div className="paper__containerHeaderDate">
          <p className="spacer"></p>
          <p style={{ fontWeight: "500" }}>Date: {dateString}</p>
        </div>
      </div>

      {physics && (
        <div className="paper__containerQuestions">
          <p className="paper__subjectTitle">Physics</p>
          {phyArr.length <= 0 && <p>Loading.........</p>}
          {phyArr.length > 0 && (
            <div>
              <PaperContainer arr={phyArr} />
            </div>
          )}
        </div>
      )}
      {chemistry && (
        <div className="paper__containerQuestions">
          <p className="paper__subjectTitle">Chemistry</p>
          {chemArr.length <= 0 && <p>Loading.........</p>}
          {chemArr.length > 0 && (
            <div>
              <PaperContainer arr={chemArr} />
            </div>
          )}
        </div>
      )}
      {maths && (
        <div className="paper__containerQuestions">
          <p className="paper__subjectTitle">Maths</p>
          {mathsArr.length <= 0 && <p>Loading.........</p>}
          {mathsArr.length > 0 && (
            <div>
              <PaperContainer arr={mathsArr} />
            </div>
          )}
        </div>
      )}
      {biology && (
        <div className="paper__containerQuestions">
          <p className="paper__subjectTitle">Biology</p>
          {bioArr.length <= 0 && <p>Loading.........</p>}
          {bioArr.length > 0 && (
            <div>
              <PaperContainer arr={bioArr} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Paper;
