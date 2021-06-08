import React, { useState } from "react";
import "./SetPaper.css";
import { Multiselect } from "multiselect-react-dropdown";
import PrintTotalQuestions from "./PrintTotalQuestions";
import Table from "../Table/Table";
import DatePicker from "react-date-picker";

function SetPaper() {
  const [options, setOptions] = useState([
    { name: "Physics", id: 1, isChecked: "false" },
    { name: "Chemistry", id: 2, isChecked: "false" },
    { name: "Maths", id: 3, isChecked: "false" },
    { name: "Biology", id: 4, isChecked: "false" },
  ]);

  const [phyQuestions, phyQuestionsChange] = useState(0);
  const [chemQuestions, chemQuestionsChange] = useState(0);
  const [mathsQuestions, mathsQuestionsChange] = useState(0);
  const [bioQuestions, bioQuestionsChange] = useState(0);

  const [phyChptList, setPhyChptList] = useState([]);
  const [chemChptList, setChemChptList] = useState([]);
  const [mathsChptList, setMathsChptList] = useState([]);
  const [bioChptList, setBioChptList] = useState([]);

  const [marks, setMarks] = useState(4);
  const [negMarks, setNegMarks] = useState(0.25);
  const [date, setDate] = useState(new Date());
  const [thrs, setThrs] = useState(3);
  const [tmins, setTmins] = useState(0);

  let showTables = false;

  function onSelect(selectList, selectedItem) {
    let newOptions = [...options];
    let index = newOptions.findIndex(
      (event) => event.name === selectedItem.name
    );
    newOptions[index] = {
      name: newOptions[index].name,
      id: newOptions[index].id,
      isChecked: "true",
    };
    setOptions(newOptions);
  }

  function onRemove(selectList, removedItem) {
    let newOptions = [...options];
    let selectListNames = [];
    selectList.map((data, id) => {
      return selectListNames.push(data.id);
    });

    let toChange = [];
    for (var i = 1; i < newOptions.length + 1; i++) {
      if (!selectListNames.includes(i)) {
        toChange.push(i - 1);
      }
    }

    for (i = 0; i < toChange.length; i++) {
      var index1 = toChange[i];
      newOptions[index1] = {
        name: newOptions[index1].name,
        id: newOptions[index1].id,
        isChecked: "false",
      };
      setOptions(newOptions);
    }
  }

  function handleChangeTotal() {
    return (
      <div>
        <PrintTotalQuestions
          phyQuestions={phyQuestions}
          chemQuestions={chemQuestions}
          mathsQuestions={mathsQuestions}
          bioQuestions={bioQuestions}
          phyChptList={phyChptList}
          chemChptList={chemChptList}
          mathsChptList={mathsChptList}
          bioChptList={bioChptList}
          marks={marks}
          negMarks={negMarks}
          thrs={thrs}
          tmins={tmins}
          date={date}
        />
      </div>
    );
  }

  function displayPhysics() {
    if (options[0].isChecked === "true") {
      showTables = true;
      return (
        <div>
          <p className="tables__subject">Physics</p>
          <Table
            phyChptList={phyChptList}
            setPhyChptList={setPhyChptList}
            phyQuestions={phyQuestions}
            onChange={(event) => phyQuestionsChange(event)}
            subjectName="physics"
          />
        </div>
      );
    }
  }

  function displayChemistry() {
    if (options[1].isChecked === "true") {
      showTables = true;
      return (
        <div>
          <p className="tables__subject">Chemistry</p>
          <Table
            chemChptList={chemChptList}
            setChemChptList={setChemChptList}
            chemQuestions={chemQuestions}
            onChange={(event) => chemQuestionsChange(event)}
            subjectName="chemistry"
          />
        </div>
      );
    }
  }

  function displayMaths() {
    if (options[2].isChecked === "true") {
      showTables = true;
      return (
        <div>
          <p className="tables__subject">Maths</p>
          <Table
            mathsChptList={mathsChptList}
            setMathsChptList={setMathsChptList}
            mathsQuestions={mathsQuestions}
            onChange={(event) => mathsQuestionsChange(event)}
            subjectName="maths"
          />
        </div>
      );
    }
  }

  function displayBiology() {
    if (options[3].isChecked === "true") {
      showTables = true;
      return (
        <div>
          <p className="tables__subject">Biology</p>
          <Table
            bioChptList={bioChptList}
            setBioChptList={setBioChptList}
            bioQuestions={bioQuestions}
            onChange={(event) => bioQuestionsChange(event)}
            subjectName="biology"
          />
        </div>
      );
    }
  }

  const style1 = {
    chips: {
      background: "black",
      color: "white",
    },
    searchBox: {
      background: "#fff",
      border: "none",
      borderBottom: "1px solid black",
      borderRadius: "10px",
      width: "200px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1),0px 8px 16px rgba(0, 0, 0, 0.1)",
    },
    multiselectContainer: {
      color: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "200px",
      background: "rgb(230,230,230)",
    },
    optionContainer: {
      borderRadius: "10px",
      background: "rgb(230,230,230)",
    },
  };

  function numInput(value, negMarks, hrs, mins) {
    let pattern = /^[0-9]*$/;
    let pointPattern = /^(10|\d)(\.\d{1,2})?$/;

    if (negMarks) {
      if (pointPattern.test(parseInt(value))) {
        setNegMarks(value);
      } else {
        setNegMarks("");
      }
    } else if (hrs) {
      if (pattern.test(parseInt(value))) {
        if (value <= 6) {
          setThrs(value);
        } else {
          setThrs("");
        }
      } else {
        setThrs("");
      }
    } else if (mins) {
      if (pattern.test(parseInt(value))) {
        if (value <= 59) {
          setTmins(value);
        } else {
          setTmins("");
        }
      } else {
        setTmins("");
      }
    } else {
      if (pattern.test(parseInt(value))) {
        if (value > 10) {
          setMarks("");
        } else {
          setMarks(parseInt(value));
        }
      } else {
        setMarks("");
      }
    }
  }

  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div>
      <div className="tables">
        <p>Set Paper</p>
        <Multiselect
          className="multiSelect"
          options={options}
          showCheckbox={false}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue="name"
          style={style1}
          closeOnSelect={false}
          hidePlaceholder={true}
          avoidHighlightFirstOption={true}
          placeholder="Click here to select"
        />
        {displayPhysics()}
        {displayChemistry()}
        {displayMaths()}
        {displayBiology()}
      </div>
      <div className="headerData">
        <div className="headerData__container">
          <div className="table__newRow">
            <div className="table__newCell table__newRowTopLeftCell">
              Marks Per Question
            </div>
            <div className="table__newCell table__newRowTopRightCell">
              <input
                style={{ width: "50px" }}
                className="table__input"
                value={marks}
                type="text"
                onChange={(event) => {
                  numInput(event.target.value, false);
                }}
              />
            </div>
          </div>
          <div className="table__newRow">
            <div className="table__newCell">Negative Marks</div>
            <div className="table__newCell">
              <input
                style={{ width: "50px" }}
                className="table__input"
                type="number"
                value={negMarks}
                onChange={(event) => {
                  numInput(event.target.value, true);
                }}
              />
            </div>
          </div>
          <div className="table__newRow">
            <div className="table__newCell">Time</div>
            <div className="table__newCell">
              <input
                style={{ width: "50px" }}
                className="table__input"
                type="text"
                value={thrs}
                onChange={(event) => {
                  numInput(event.target.value, false, true, false);
                }}
              />
              Hrs
              <input
                style={{ width: "50px" }}
                className="table__input"
                type="text"
                value={tmins}
                onChange={(event) => {
                  numInput(event.target.value, false, false, true);
                }}
              />
              Mins
            </div>
          </div>
          <div className="table__newRow">
            <div className="table__newCell table__newRowBottomLeftCell">
              Date of Exam
            </div>
            <div className="table__newCell table__newRowBottomRightCell">
              <DatePicker
                className="datePicker"
                value={date}
                onChange={(event) => {
                  setDate(event);
                }}
                minDate={new Date()}
                maxDate={maxDate}
                clearIcon={null}
                format="dd-MM-yyyy"
              />
            </div>
          </div>
        </div>
        {showTables === true && <div>{handleChangeTotal()}</div>}
      </div>
    </div>
  );
}

export default SetPaper;
