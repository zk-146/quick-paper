import "./PaperContainer.css";

import React from "react";
import RenderLatex from "../Latex/RendexLatex";

const PaperContainer = ({ arr }) => {
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
                  <tbody key={data._id}>
                    <tr className="paper__containerData">
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerText"
                      >
                        <p style={{ fontSize: "14px", fontWeight: "700" }}>
                          {index + 1 + ")"}
                        </p>
                        <p style={{ marginLeft: "10px" }}>{data.question}</p>
                      </td>
                      <td className="paper__containerImages">
                        {data.questionsUrls[0].url !== "" && (
                          <img
                            className="paper__containerImage"
                            src={data.questionsUrls[0].url}
                            alt=""
                          />
                        )}
                        {data.questionsUrls[1].url !== "" && (
                          <img
                            className="paper__containerImage"
                            src={data.questionsUrls[1].url}
                            alt=""
                          />
                        )}
                        {data.questionsUrls[2].url !== "" && (
                          <img
                            className="paper__containerImage"
                            src={data.questionsUrls[2].url}
                            alt=""
                          />
                        )}
                      </td>
                    </tr>
                    <tr className="paper__containerData">
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerText"
                      >
                        <p style={{ fontSize: "14px", fontWeight: "700" }}>
                          {"A)"}
                        </p>
                        <p style={{ marginLeft: "10px" }}>{data.option1}</p>
                      </td>
                      <td className="paper__containerImages">
                        {data.optionsUrls[0].url !== "" && (
                          <img
                            className="paper__containerImage"
                            src={data.optionsUrls[0].url}
                            alt=""
                          />
                        )}
                      </td>
                    </tr>
                    <tr className="paper__containerData">
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerText"
                      >
                        <p style={{ fontSize: "14px", fontWeight: "700" }}>
                          {"B)"}
                        </p>
                        <p style={{ marginLeft: "10px" }}>{data.option2}</p>
                      </td>
                      <td className="paper__containerImages">
                        {data.optionsUrls[1].url !== "" && (
                          <img
                            className="paper__containerImage"
                            src={data.optionsUrls[1].url}
                            alt=""
                          />
                        )}
                      </td>
                    </tr>
                    <tr className="paper__containerData">
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerText"
                      >
                        <p style={{ fontSize: "14px", fontWeight: "700" }}>
                          {"C)"}
                        </p>
                        <p style={{ marginLeft: "10px" }}>{data.option3}</p>
                      </td>
                      <td className="paper__containerImages">
                        {data.optionsUrls[2].url !== "" && (
                          <img
                            className="paper__containerImage"
                            src={data.optionsUrls[2].url}
                            alt=""
                          />
                        )}
                      </td>
                    </tr>
                    <tr className="paper__containerData">
                      <td
                        valign="top"
                        align="center"
                        className="paper__containerText"
                      >
                        <p style={{ fontSize: "14px", fontWeight: "700" }}>
                          {"D)"}
                        </p>
                        <p style={{ marginLeft: "10px" }}>{data.option4}</p>
                      </td>
                      <td className="paper__containerImages">
                        {data.optionsUrls[3].url !== "" && (
                          <img
                            className="paper__containerImage"
                            src={data.optionsUrls[3].url}
                            alt=""
                          />
                        )}
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
};

export default PaperContainer;
