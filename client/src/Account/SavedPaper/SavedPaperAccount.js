import React, { useEffect, useState } from "react";
import "./SavedPaperAccount.css";
import axios from "../../axios";
import { useStateValue } from "../../Context/StateProvider";
import { useHistory } from "react-router";

function SavedPaperAccount() {
  const [savedPapers, setSavedPapers] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const savedPapers1 = async () => {
      const res = await axios.get("save-paper");
      setSavedPapers(res.data);
    };
    savedPapers1();
  }, []);

  const [, dispatch] = useStateValue();

  return (
    <div className="account__container">
      {savedPapers.length === 0 && (
        <div className="account__noSavedPapers">No papers saved</div>
      )}
      {savedPapers.length > 0 && (
        <div className="account__containerTableHeader">
          <p className="account__containerTableHead">Subjects</p>
          <p className="account__containerTableHead">Date</p>
        </div>
      )}
      <div className="account__containerSavedPaper">
        {savedPapers.map((data, index) => {
          return (
            <div
              key={index}
              className="account__containerTableRow"
              onClick={() => {
                dispatch({
                  type: "SET_SAVEDPAPER",
                  savedPaper: data,
                });
                history.push("/savedPaper");
              }}
            >
              <p className="account__containerTableCell">
                {data.subjects.map((subject, index) => {
                  if (index !== data.subjects.length - 1) return subject + ", ";
                  else return subject;
                })}
              </p>
              <p className="account__containerTableCell">{data.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavedPaperAccount;
