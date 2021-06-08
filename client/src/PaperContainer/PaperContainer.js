import React from "react";
import "./PaperContainer.css";
import RenderLatex from "../Latex/RendexLatex";

function PaperContainer({ arr }) {
  return (
    <RenderLatex>
      {arr.length >= 0 && (
        <div className="paper">
          <div className="paper__container">
            <table
              style={{ fontSize: "14px" }}
              className="paper__containerQuestionsTable"
            >
              {arr.map((data, index) => {
                return (
                  <tbody
                    key={data._id}
                    className="paper__containerQuestionsTableBody"
                  >
                    <tr className="">
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerQuestionsTableBodyCell"
                      >
                        <p style={{ fontSize: "14px", fontWeight: "700" }}>
                          {index + 1 + ")"}
                        </p>
                      </td>
                      <td className="paper__containerQuestionsTableBodyCell">
                        {data.question}
                        {arr.questionImage && <img src="" alt="" />}
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerQuestionsTableBodyCell"
                      >
                        {"A)"}
                      </td>
                      <td>
                        {data.option1}
                        {arr.option1Image && <img src="" alt="" />}
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerQuestionsTableBodyCell"
                      >
                        {"B)"}
                      </td>
                      <td>
                        {data.option2}
                        {arr.option2Image && <img src="" alt="" />}
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerQuestionsTableBodyCell"
                      >
                        {"C)"}
                      </td>
                      <td>
                        {data.option3}
                        {arr.option3Image && <img src="" alt="" />}
                      </td>
                    </tr>
                    <tr>
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerQuestionsTableBodyCell"
                      >
                        {"D)"}
                      </td>
                      <td>
                        {data.option4}
                        {arr.option4Image && <img src="" alt="" />}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </RenderLatex>
  );
}

export default PaperContainer;
