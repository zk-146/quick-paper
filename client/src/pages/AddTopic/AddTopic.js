import React, { useState } from "react";

import "./AddTopic.css";
import axios from "../../axios";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import TextInput from "../../components/Input/TextInput/TextInput";

function AddTopic() {
  const [subject, setSubject] = useState("Physics");
  const [topic, setTopic] = useState("");
  // const [uploaded, setUploaded] = useState(false);
  // const [error, setError] = useState(false);
  const allSubjects = ["Physics", "Chemistry", "Maths", "Biology"];

  const uploadTopic = async () => {
    const res = await axios.post(`/setpaper/${subject}`, {
      name: topic,
    });
    // if (res.response) {
    //   setUploaded(true)
    // } else {
    //   console.log(res);
    // }
  };

  return (
    <div className="addTopic">
      <Heading text={"Add Topic"} />
      <div className="addTopic__container">
        <div className="addTopic__select">
          <select
            className="text__input"
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
        </div>
        <TextInput
          placeholder={"Topic"}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={uploadTopic}>Upload</Button>
      </div>
    </div>
  );
}

export default AddTopic;
