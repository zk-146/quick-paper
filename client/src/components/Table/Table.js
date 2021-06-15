import React, { useState, useEffect } from "react";

import "./Table.css";
import axios from "../../axios";
import handleCheckboxChange from "./handleCheckboxChange";
import numInput from "./numInput";
import selectAllChapters from "./selectAllChapters";

const Table = (props) => {
  const [allChapters, allChaptersChange] = useState([]);
  const subjectName = props.subjectName;
  const [totalQuestions, totalQuestionsChange] = useState(0);
  const [selectAll, changeSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(`setpaper/${subjectName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      req.data.sort(function (a, b) {
        return a.id - b.id;
      });
      allChaptersChange(req.data);
    };
    fetchData();
  }, [subjectName]);

  useEffect(() => {
    let chapters = [...allChapters];
    let index = 0;
    let length = chapters.length;
    let tempListOfChapters = [];

    for (index = 0; index < length; index++) {
      if (chapters[index].value > 0) {
        tempListOfChapters.push({
          id: chapters[index].id,
          topicName: chapters[index].name,
          value: chapters[index].value,
        });
      }
    }

    if (props.subjectName === "physics") {
      props.setPhyChptList(tempListOfChapters);
    }

    if (props.subjectName === "chemistry") {
      props.setChemChptList(tempListOfChapters);
    }

    if (props.subjectName === "maths") {
      props.setMathsChptList(tempListOfChapters);
    }

    if (props.subjectName === "biology") {
      props.setBioChptList(tempListOfChapters);
    }
  }, [allChapters]);

  useEffect(() => {
    let chapters = [...allChapters];
    let totalCount = 0;
    chapters.map((data) => {
      return data.value === ""
        ? (totalCount += 0)
        : (totalCount += parseInt(data.value));
    });

    const handleTotalChange = (totalCount) => {
      return props.onChange(totalCount);
    };

    handleTotalChange(totalCount);
    totalQuestionsChange(totalCount);
  }, [allChapters, props]);

  return (
    <div className="table">
      <div className="table__body">
        <div className="table__header">
          <div className="table__head table__head1">No.</div>
          <div className="table__head">Chapter Name</div>
          <div className="table__head">Select Chapter</div>
          <div className="table__head table__head2">No. of Questions</div>
        </div>
        <div className="table__row">
          <div className="table__cell"></div>
          <div className="table__cell"></div>
          <div className="table__cell">
            <label htmlFor={"selectAll" + props.subjectName}>Select All</label>
            <input
              id={"selectAll" + props.subjectName}
              className="selectAll"
              type="checkbox"
              checked={selectAll}
              onChange={() => {
                selectAll === true
                  ? changeSelectAll(false)
                  : changeSelectAll(true);
                selectAllChapters(allChapters, allChaptersChange, selectAll);
              }}
            />
          </div>
          <div className="table__cell"></div>
        </div>

        {allChapters.map((data, id) => {
          return (
            <div key={data.id} className="table__row">
              <div className="table__cell">{id + 1}</div>

              <div className="table__cell table__cellChapter">{data.name}</div>

              <div className="table__cell">
                <input
                  id={"chptCheckbox" + data._id}
                  className={"chptCheckbox" + data._id}
                  type="checkbox"
                  checked={data.isChecked}
                  disabled={data.isCheckBoxDis}
                  onChange={() => {
                    handleCheckboxChange(
                      data.id,
                      changeSelectAll,
                      allChaptersChange,
                      allChapters
                    );
                  }}
                />
              </div>

              <div className="table__cell">
                <input
                  id={"numInput" + data._id}
                  className={
                    "numInput" + data._id + props.subjectName + " table__input"
                  }
                  type="number"
                  value={data.value}
                  disabled={data.isNumDisabled}
                  onChange={(event) => {
                    numInput(event, data.id, allChapters, allChaptersChange);
                  }}
                />
              </div>
            </div>
          );
        })}
        <div className="table__row">
          <div className="table__cell table__cellLast1"></div>
          <div className="table__cell table__cellLast2"></div>
          <div className="table__cell table__cellLast3">Total</div>
          <div className="table__cell table__cellLast4">{totalQuestions}</div>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Table;
