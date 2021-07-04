const uploadQuestion = async (
  model,
  question,
  option1,
  option2,
  option3,
  option4,
  answer,
  difficulty,
  topicName,
  questionsUrls,
  answersUrls,
  optionsUrls
) => {
  const questionData = await model.create({
    question: question.toString(),
    option1: option1.toString(),
    option2: option2.toString(),
    option3: option3.toString(),
    option4: option4.toString(),
    answer: answer.toString(),
    questionsUrls,
    answersUrls,
    optionsUrls,
    difficulty: difficulty.toString().toLowerCase(),
    topicName: topicName.toString(),
  });
  return questionData;
};

module.exports = uploadQuestion;
