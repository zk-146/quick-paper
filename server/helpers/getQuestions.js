const getQuestions = async (chaptersArr, modelName) => {
  const questionArr = [];
  try {
    for (let i = 0; i < chaptersArr.length; i++) {
      const topicName = JSON.parse(chaptersArr[i]).topicName;
      const limit = parseInt(JSON.parse(chaptersArr[i]).value);
      const questionData = await modelName.aggregate([
        { $match: { topicName: String(topicName) } },
        { $sample: { size: limit } },
      ]);
      questionData.forEach((data) => {
        questionArr.push(data);
      });
    }
    return questionArr;
  } catch (err) {
    throw new Error("Error occurred while fetching questions from database");
  }
};

module.exports = getQuestions;
