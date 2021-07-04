import "./AddQuestion.css";

import React, { useEffect, useState } from "react";

import Button from "../../components/Button/Button";
import FileInput from "../../components/Input/FileInput/FileInput";
import Heading from "../../components/Heading/Heading";
import RenderLatex from "../../components/Latex/RendexLatex";
import TextAreaInput from "../../components/Input/TextAreaInput/TextAreaInput";
import axios from "../../axios";
import handleSubmit from "./handleSubmit";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [subject, setSubject] = useState("Physics");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [uploadError, setUploadError] = useState("");

  const [questionsUrls, setQuestionsUrls] = useState([
    {
      url: "",
    },
    {
      url: "",
    },
    {
      url: "",
    },
  ]);

  const [answersUrls, setAnswersUrls] = useState([
    {
      url: "",
    },
    {
      url: "",
    },
    {
      url: "",
    },
  ]);

  const [optionsUrls, setOptionsUrls] = useState([
    {
      url: "",
    },
    {
      url: "",
    },
    {
      url: "",
    },
    {
      url: "",
    },
  ]);

  const [questionsMedia, setQuestionsMedia] = useState([
    {
      media: "",
    },
    {
      media: "",
    },
    {
      media: "",
    },
  ]);
  const [answersMedia, setAnswersMedia] = useState([
    {
      media: "",
    },
    {
      media: "",
    },
    {
      media: "",
    },
  ]);
  const [optionsMedia, setOptionsMedia] = useState([
    {
      media: "",
    },
    {
      media: "",
    },
    {
      media: "",
    },
    {
      media: "",
    },
  ]);

  const [topicName, setTopicName] = useState("");
  const [allTopics, setAllTopics] = useState([]);

  const [uploaded, setUploaded] = useState(false);

  const allSubjects = ["Physics", "Chemistry", "Maths", "Biology"];

  const difficulties = ["Easy", "Moderate", "Hard"];

  const [loadLatex, setLoadLatex] = useState(false);

  const changeMedia = (event, index, questions, answers, options) => {
    if (questions) {
      let tempMedias = [...questionsMedia];
      tempMedias[index].media = event.target.files[0];
      setQuestionsMedia(tempMedias);
    } else if (answers) {
      let tempMedias = [...answersMedia];
      tempMedias[index].media = event.target.files[0];
      setAnswersMedia(tempMedias);
    } else if (options) {
      let tempMedias = [...optionsMedia];
      tempMedias[index].media = event.target.files[0];
      setOptionsMedia(tempMedias);
    }
  };

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

  const uploadQuestion = async (event) => {
    event.preventDefault();
    await handleSubmit(
      questionsMedia,
      answersMedia,
      optionsMedia,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );

    await axios
      .post(`/add-question/${subject.toLowerCase()}`, {
        question,
        questionsUrls,
        option1,
        option2,
        option3,
        option4,
        optionsUrls,
        answer,
        answersUrls,
        subject,
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
        setUploadError(err.responsevent.data.error);
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
    <div className="addQuestion">
      <Heading text={"Add Questions"} />
      <div className="addQuestion__containter">
        <div className="addQuestion__select">
          <select
            className="text__input"
            onChange={(event) => {
              setSubject(event.target.value);
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
            className="text__input"
            onChange={(event) => {
              setDifficulty(event.target.value);
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
          className="text__input addQuestion__input"
          onChange={(event) => {
            setTopicName(event.target.value);
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
        <TextAreaInput
          placeholder={"Question"}
          onChange={(event) => setQuestion(event.target.value)}
        />
        Question Image 1
        <FileInput
          placeholder={"Question Image 1"}
          onChange={(event) => changeMedia(event, 0, true)}
        />
        Question Image 2
        <FileInput
          placeholder={"Question Image 2"}
          onChange={(event) => changeMedia(event, 1, true)}
        />
        Question Image 3
        <FileInput
          placeholder={"Question Image 3"}
          onChange={(event) => changeMedia(event, 2, true)}
        />
        <TextAreaInput
          placeholder={"Option 1*"}
          onChange={(event) => setOption1(event.target.value)}
        />
        Option 1 Image
        <FileInput
          placeholder={"Option 1 Image"}
          onChange={(event) => changeMedia(event, 0, false, false, true)}
        />
        <TextAreaInput
          placeholder={"Option 2*"}
          onChange={(event) => setOption2(event.target.value)}
        />
        Option 2 Image
        <FileInput
          placeholder={"Option 2 Image"}
          onChange={(event) => changeMedia(event, 1, false, false, true)}
        />
        <TextAreaInput
          placeholder={"Option 3*"}
          onChange={(event) => setOption3(event.target.value)}
        />
        Option 3 Image
        <FileInput
          placeholder={"Option 3 Image"}
          onChange={(event) => changeMedia(event, 2, false, false, true)}
        />
        <TextAreaInput
          placeholder={"Option 4*"}
          onChange={(event) => setOption4(event.target.value)}
        />
        Option 4 Image
        <FileInput
          placeholder={"Option 4 Image"}
          onChange={(event) => changeMedia(event, 3, false, false, true)}
        />
        <TextAreaInput
          placeholder={"Answer*"}
          onChange={(event) => setAnswer(event.target.value)}
        />
        Answer Image 1
        <FileInput
          placeholder={"Answer Image 1"}
          onChange={(event) => changeMedia(event, 0, false, true)}
        />
        Answer Image 2
        <FileInput
          placeholder={"Answer Image 2"}
          onChange={(event) => changeMedia(event, 1, false, true)}
        />
        Answer Image 3
        <FileInput
          placeholder={"Answer Image 3"}
          onChange={(event) => changeMedia(event, 2, false, true)}
        />
        <p className="addQuestion__preview">Preview</p>
        {loadLatex && (
          <RenderLatex>
            <p className="addQuestion__output">
              <strong>Subject:</strong> {subject}
            </p>
            <p className="addQuestion__output">
              <strong> Difficulty: </strong>
              {difficulty.toUpperCase()}
            </p>
            <p className="addQuestion__output">
              <strong>Topic Name: </strong>
              {topicName}
            </p>
            <p className="addQuestion__output">
              <strong>Question:</strong> {question}
            </p>
            <p className="addQuestion__output">
              <strong>Option 1:</strong> {option1}
            </p>
            <p className="addQuestion__output">
              <strong>Option 2:</strong> {option2}
            </p>
            <p className="addQuestion__output">
              <strong>Option 3:</strong> {option3}
            </p>
            <p className="addQuestion__output">
              <strong>Option 4:</strong> {option4}
            </p>
            <p className="addQuestion__output">
              <strong>Answer:</strong> {answer}
            </p>
          </RenderLatex>
        )}
        {uploadError && (
          <p className="addQuestion__inputError">{uploadError}</p>
        )}
        {uploaded && (
          <p className="addQuestion__inputSuccess">
            Question uploaded successfully
          </p>
        )}
        <Button onClick={uploadQuestion}>Upload</Button>
      </div>
    </div>
  );
};

export default AddQuestion;
