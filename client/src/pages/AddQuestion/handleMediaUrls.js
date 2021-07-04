const handleMediaUrls = async (
  mediaUrl,
  index,
  questions,
  answers,
  options,
  questionsUrls,
  answersUrls,
  optionsUrls,
  setQuestionsUrls,
  setAnswersUrls,
  setOptionsUrls
) => {
  if (questions) {
    let tempMediaUrls = [...questionsUrls];
    tempMediaUrls[index].url = mediaUrl;
    setQuestionsUrls[index] = mediaUrl;
  } else if (answers) {
    let tempMediaUrls = [...answersUrls];
    tempMediaUrls[index].url = mediaUrl;
    setAnswersUrls[index] = mediaUrl;
  } else if (options) {
    let tempMediaUrls = [...optionsUrls];
    tempMediaUrls[index].url = mediaUrl;
    setOptionsUrls[index] = mediaUrl;
  }
};

export default handleMediaUrls;
