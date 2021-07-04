import handleMediaUrls from "./handleMediaUrls";

const { imageUpload } = require("../../components/imageUpload/imageUpload");

const handleSubmit = async (
  questionsMedia,
  answersMedia,
  optionsMedia,
  questionsUrls,
  answersUrls,
  optionsUrls,
  setQuestionsUrls,
  setAnswersUrls,
  setOptionsUrls
) => {
  if (questionsMedia[0].media) {
    const questionImageUrl = await imageUpload(questionsMedia[0].media);
    handleMediaUrls(
      questionImageUrl,
      0,
      true,
      false,
      false,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(questionsUrls);
  }
  if (questionsMedia[1].media) {
    const questionImageUrl = await imageUpload(questionsMedia[1].media);
    handleMediaUrls(
      questionImageUrl,
      1,
      true,
      false,
      false,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(questionsUrls);
  }
  if (questionsMedia[2].media) {
    const questionImageUrl = await imageUpload(questionsMedia[2].media);
    handleMediaUrls(
      questionImageUrl,
      2,
      true,
      false,
      false,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(questionsUrls);
  }
  if (answersMedia[0].media) {
    const answerImageUrl = await imageUpload(answersMedia[0].media);
    handleMediaUrls(
      answerImageUrl,
      0,
      false,
      true,
      false,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(answersUrls);
  }
  if (answersMedia[1].media) {
    const answerImageUrl = await imageUpload(answersMedia[1].media);
    handleMediaUrls(
      answerImageUrl,
      1,
      false,
      true,
      false,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(answersUrls);
  }
  if (answersMedia[2].media) {
    const answerImageUrl = await imageUpload(answersMedia[2].media);
    handleMediaUrls(
      answerImageUrl,
      2,
      false,
      true,
      false,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(answersUrls);
  }
  if (optionsMedia[0].media) {
    const optionImageUrl = await imageUpload(optionsMedia[0].media);
    handleMediaUrls(
      optionImageUrl,
      0,
      false,
      false,
      true,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(optionsUrls);
  }
  if (optionsMedia[1].media) {
    const optionImageUrl = await imageUpload(optionsMedia[1].media);
    handleMediaUrls(
      optionImageUrl,
      1,
      false,
      false,
      true,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(optionsUrls);
  }
  if (optionsMedia[2].media) {
    const optionImageUrl = await imageUpload(optionsMedia[2].media);
    handleMediaUrls(
      optionImageUrl,
      2,
      false,
      false,
      true,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(optionsUrls);
  }
  if (optionsMedia[3].media) {
    const optionImageUrl = await imageUpload(optionsMedia[3].media);
    handleMediaUrls(
      optionImageUrl,
      3,
      false,
      false,
      true,
      questionsUrls,
      answersUrls,
      optionsUrls,
      setQuestionsUrls,
      setAnswersUrls,
      setOptionsUrls
    );
    console.log(optionsUrls);
  }
  console.log(optionsUrls, answersUrls, questionsUrls);
};
export default handleSubmit;
