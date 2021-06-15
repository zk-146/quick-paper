import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { Multiselect } from "multiselect-react-dropdown";

import "./SetPaper.css";
import Button from "../../components/Button/Button";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import numInput from "./numInput";
import PrintTotalQuestions from "../../components/PrintTotalQuestions/PrintTotalQuestions";

const SetPaper = () => {
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

  const [showTables, setShowTables] = useState(false);

  const totalQuestions =
    phyQuestions + chemQuestions + mathsQuestions + bioQuestions;

  const onSelect = (selectList, selectedItem) => {
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
    setShowTables(true);
  };

  const onRemove = (selectList, removedItem) => {
    let newOptions = [...options];
    let selectListNames = [];
    selectList.map((data, id) => {
      return selectListNames.push(data.id);
    });
    console.log("selectListNames", selectListNames);

    let toChange = [];
    for (let i = 1; i < newOptions.length + 1; i++) {
      if (!selectListNames.includes(i)) {
        toChange.push(i - 1);
      }
    }

    for (let i = 0; i < toChange.length; i++) {
      let index1 = toChange[i];
      newOptions[index1] = {
        name: newOptions[index1].name,
        id: newOptions[index1].id,
        isChecked: "false",
      };
      setOptions(newOptions);
    }
    if (selectListNames.length <= 0) {
      setShowTables(false);
    }
  };

  const handleChangeTotal = () => {
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
  };

  const multiselectStyle = {
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
          style={multiselectStyle}
          closeOnSelect={false}
          hidePlaceholder={true}
          avoidHighlightFirstOption={true}
          placeholder="Click here to select"
        />
        {showTables && (
          <>
            {options[0].isChecked === "true" && (
              <DisplayTable
                phyChptList={phyChptList}
                setPhyChptList={setPhyChptList}
                phyQuestions={phyQuestions}
                onChange={(event) => phyQuestionsChange(event)}
                subjectName="physics"
                header="Physics"
              />
            )}
            {options[1].isChecked === "true" && (
              <DisplayTable
                chemChptList={chemChptList}
                setChemChptList={setChemChptList}
                chemQuestions={chemQuestions}
                onChange={(event) => chemQuestionsChange(event)}
                subjectName="chemistry"
                header="Chemistry"
              />
            )}
            {options[2].isChecked === "true" && (
              <DisplayTable
                mathsChptList={mathsChptList}
                setMathsChptList={setMathsChptList}
                mathsQuestions={mathsQuestions}
                onChange={(event) => mathsQuestionsChange(event)}
                subjectName="maths"
                header="Maths"
              />
            )}
            {options[3].isChecked === "true" && (
              <DisplayTable
                bioChptList={bioChptList}
                setBioChptList={setBioChptList}
                bioQuestions={bioQuestions}
                onChange={(event) => bioQuestionsChange(event)}
                subjectName="biology"
                header="Biology"
              />
            )}
          </>
        )}
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
                  numInput(
                    event.target.value,
                    false,
                    false,
                    false,
                    setMarks,
                    setTmins,
                    setThrs,
                    setNegMarks
                  );
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
                  numInput(
                    event.target.value,
                    true,
                    false,
                    false,
                    setMarks,
                    setTmins,
                    setThrs,
                    setNegMarks
                  );
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
                  numInput(
                    event.target.value,
                    false,
                    true,
                    false,
                    setMarks,
                    setTmins,
                    setThrs,
                    setNegMarks
                  );
                }}
              />
              Hrs
              <input
                style={{ width: "50px" }}
                className="table__input"
                type="text"
                value={tmins}
                onChange={(event) => {
                  numInput(
                    event.target.value,
                    false,
                    false,
                    true,
                    setMarks,
                    setTmins,
                    setThrs,
                    setNegMarks
                  );
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
        {totalQuestions < 76 && totalQuestions > 0 && (
          <ButtonLink
            path="/displaypaper"
            type="submit"
            placeholder="Set Paper"
          />
        )}
        {totalQuestions > 76 && (
          <div>
            <div className="tables__setPaperDisabled">
              Total questions is greater than 75
            </div>
            <Button disabled>Set Paper</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetPaper;
