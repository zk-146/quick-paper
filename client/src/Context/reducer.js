export const initialState = {
  user: null,
  questions: {
    totalQuestions: 0,
    phyQuestions: 0,
    chemQuestions: 0,
    mathsQuestions: 0,
    bioQuestions: 0,
  },
  paperPara: {
    marks: 0,
    negMarks: 0,
    thrs: 0,
    tmins: 0,
    date: new Date(),
  },
  savedPaper: [],
  chptList: [],
  isAuth: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SAVEDPAPER": {
      return {
        ...state,
        savedPaper: action.savedPaper,
      };
    }
    case "SET_QUESTIONS": {
      return {
        ...state,
        questions: action.questions,
      };
    }
    case "SET_PAPERPARA": {
      return {
        ...state,
        paperPara: action.paperPara,
      };
    }
    case "SET_CHPTLIST": {
      return {
        ...state,
        chptList: action.chptList,
      };
    }
    default:
      return state;
  }
};

export default reducer;
