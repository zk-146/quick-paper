import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Table.css";

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

    function handleTotalChange(totalCount) {
      return props.onChange(totalCount);
    }

    handleTotalChange(totalCount);
    totalQuestionsChange(totalCount);
  }, [allChapters, props]);

  function handleCheckboxChange(id) {
    let index = id - 1;
    let chapters = [...allChapters];
    let length = chapters.length;
    let isChecked = chapters[index].isChecked;

    if (isChecked === false) {
      let i, checkForSelectAll;
      let count = 0;
      chapters[index] = {
        id: chapters[index].id,
        name: chapters[index].name,
        value: chapters[index].value,
        isChecked: true,
        isCheckBoxDis: chapters[index].isCheckBoxDis,
        isNumDisabled: false,
        isRandChecked: chapters[index].isRandChecked,
      };
      for (i = 0; i < length; i++) {
        checkForSelectAll = chapters[i].isChecked;
        if (checkForSelectAll === true) {
          count++;
        }
        if (count === length) {
          changeSelectAll(true);
        }
      }
    } else {
      chapters[index] = {
        id: chapters[index].id,
        name: chapters[index].name,
        value: "",
        isChecked: false,
        isCheckBoxDis: chapters[index].isCheckBoxDis,
        isNumDisabled: true,
        isRandChecked: chapters[index].isRandChecked,
      };
      changeSelectAll(false);
    }
    allChaptersChange(chapters);
  }

  function numInput(event, id) {
    let pattern = /^([0-1]?[0-9]|20)$/;
    let value = event.target.value;
    let index = id - 1;
    let chapters = [...allChapters];

    if (pattern.test(value)) {
      chapters[index] = {
        id: chapters[index].id,
        name: chapters[index].name,
        value: value,
        isChecked: chapters[index].isChecked,
        isCheckBoxDis: chapters[index].isCheckBoxDis,
        isNumDisabled: chapters[index].isNumDisabled,
        isRandChecked: chapters[index].isRandChecked,
      };
      // enteredNumbers();
    } else {
      alert("Input should be number only and it should not be more than 20!");
      chapters[index] = {
        id: chapters[index].id,
        name: chapters[index].name,
        value: "",
        isChecked: chapters[index].isChecked,
        isCheckBoxDis: chapters[index].isCheckBoxDis,
        isNumDisabled: chapters[index].isNumDisabled,
        isRandChecked: chapters[index].isRandChecked,
      };
      // enteredNumbers();
    }
    allChaptersChange(chapters);
  }

  function selectAll1() {
    let chapters = [...allChapters];
    let length = allChapters.length;
    let i;

    if (selectAll) {
      for (i = 0; i < length; i++) {
        chapters[i] = {
          id: chapters[i].id,
          name: chapters[i].name,
          value: "",
          isChecked: false,
          isCheckBoxDis: false,
          isNumDisabled: true,
          isRandChecked: chapters[i].isRandChecked,
        };
      }
    } else {
      for (i = 0; i < length; i++) {
        chapters[i] = {
          id: chapters[i].id,
          name: chapters[i].name,
          value: chapters[i].value,
          isChecked: true,
          isCheckBoxDis: false,
          isNumDisabled: false,
          isRandChecked: chapters[i].isRandChecked,
        };
      }
    }
    allChaptersChange(chapters);
  }

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
                selectAll1();
              }}
            />
          </div>
          <div className="table__cell"></div>
        </div>

        {allChapters.map((data, id) => {
          return (
            <div key={id} className="table__row">
              <div className="table__cell">{data.id}</div>

              <div className="table__cell table__cellChapter">{data.name}</div>

              <div className="table__cell">
                <input
                  id={"chptCheckbox" + data.id}
                  className={"chptCheckbox" + data.id}
                  type="checkbox"
                  checked={data.isChecked}
                  disabled={data.isCheckBoxDis}
                  onChange={() => {
                    handleCheckboxChange(data.id);
                  }}
                />
              </div>

              <div className="table__cell">
                <input
                  id={"numInput" + data.id}
                  className={
                    "numInput" + data.id + props.subjectName + " table__input"
                  }
                  type="number"
                  value={data.value}
                  disabled={data.isNumDisabled}
                  onChange={(event) => {
                    numInput(event, data.id);
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
