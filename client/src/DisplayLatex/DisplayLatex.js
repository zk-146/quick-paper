import React, { useEffect } from "react";
import { useState } from "react";
import RenderLatex from "../Latex/RendexLatex";
import axios from "../axios";
import "./DisplayLatex.css";

function DisplayLatex() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [uploadError, setUploadError] = useState("");

  const [topicName, setTopicName] = useState("");
  const [allTopics, setAllTopics] = useState([]);

  const [uploaded, setUploaded] = useState(false);

  const allSubjects = ["Physics", "Chemistry", "Maths", "Biology"];

  const difficulties = ["Easy", "Moderate", "Hard"];

  const [loadLatex, setLoadLatex] = useState(false);

  useEffect(() => {
    const getChapters = async () => {
      const subjectName = subject.toLowerCase();
      const res = await axios.get(`/setpaper/${subjectName}`);
      setAllTopics(
        res.data.map((data, index) => {
          if (index === 0) {
            setTopicName(data.name);
          }
          return data.name;
        })
      );
    };
    getChapters();
  }, [subject]);

  const uploadQuestion = async (e) => {
    e.preventDefault();
    await axios
      .post("/add-question", {
        question,
        option1,
        option2,
        option3,
        option4,
        subject,
        answer,
        difficulty,
        topicName,
      })
      .then(() => {
        setUploadError("");
        setUploaded(true);
        setTimeout(() => {
          setUploaded(false);
        }, 5000);
      })
      .catch((err) => {
        setUploaded(false);
        setUploadError(err.response.data.error);
      });
  };

  useEffect(() => {
    const debounceLatex = setTimeout(() => {
      setLoadLatex((load) => !load);
      setLoadLatex(true);
    }, 200);
    return () => {
      clearTimeout(debounceLatex);
    };
  }, [question, option1, option2, option3, option4, answer]);

  return (
    <div className="displayLatex">
      <div className="displayLatex__containter">
        <div className="displayLatex__select">
          <select
            className="cred__input"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          >
            {allSubjects.map((data, index) => {
              return (
                <option value={data} key={index + data}>
                  {data}
                </option>
              );
            })}
          </select>

          <select
            className="cred__input"
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
          >
            {difficulties.map((data, index) => {
              return (
                <option value={data} key={index + data}>
                  {data}
                </option>
              );
            })}
          </select>
        </div>
        <select
          className="cred__input displayLatex__input"
          onChange={(e) => {
            setTopicName(e.target.value);
          }}
        >
          {allTopics.map((data, index) => {
            return (
              <option value={data} key={index + data}>
                {data}
              </option>
            );
          })}
        </select>
        <textarea
          type="text"
          className="cred__input displayLatex__input"
          placeholder="Question*"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />
        Question Image 1
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        Question Image 2
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 2"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        Question Image 3
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 3"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        <textarea
          type="text"
          className="cred__input displayLatex__input"
          placeholder="Option 1*"
          onChange={(e) => {
            setOption1(e.target.value);
          }}
        />
        Option 1 Image
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        <textarea
          type="text"
          className="cred__input displayLatex__input"
          placeholder="Option 2*"
          onChange={(e) => {
            setOption2(e.target.value);
          }}
        />
        Option 2 Image
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        <textarea
          type="text"
          className="cred__input displayLatex__input"
          placeholder="Option 3*"
          onChange={(e) => {
            setOption3(e.target.value);
          }}
        />
        Option 3 Image
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        <textarea
          type="text"
          className="cred__input displayLatex__input"
          placeholder="Option 4*"
          onChange={(e) => {
            setOption4(e.target.value);
          }}
        />
        Option 4 Image
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        <textarea
          type="text"
          className="cred__input displayLatex__input"
          placeholder="Answer*"
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        Answer Image 1
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        Answer Image 2
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        Answer Image 3
        <input
          type="file"
          style={{ cursor: "pointer", width: "20rem" }}
          className="cred__input displayLatex__input"
          placeholder="Question Image 1"
          onChange={(e) => {
            // setQuestion(e.target.value);
          }}
        />
        <p className="displayLatex__preview">Preview</p>
        {loadLatex && (
          <RenderLatex>
            <p className="displayLatex__output">
              <strong>Subject:</strong> {subject}
            </p>
            <p className="displayLatex__output">
              <strong> Difficulty: </strong>
              {difficulty.toUpperCase()}
            </p>
            <p className="displayLatex__output">
              <strong>Topic Name: </strong>
              {topicName}
            </p>
            <p className="displayLatex__output">
              <strong>Question:</strong> {question}
            </p>
            <p className="displayLatex__output">
              <strong>Option 1:</strong> {option1}
            </p>
            <p className="displayLatex__output">
              <strong>Option 2:</strong> {option2}
            </p>
            <p className="displayLatex__output">
              <strong>Option 3:</strong> {option3}
            </p>
            <p className="displayLatex__output">
              <strong>Option 4:</strong> {option4}
            </p>
            <p className="displayLatex__output">
              <strong>Answer:</strong> {answer}
            </p>
          </RenderLatex>
        )}
        {uploadError && (
          <p className="displayLatex__inputError">{uploadError}</p>
        )}
        {uploaded && (
          <p className="displayLatex__inputSuccess">
            Question uploaded successfully
          </p>
        )}
        <button
          type="submit"
          className="displayLatex__upload"
          onClick={uploadQuestion}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default DisplayLatex;
