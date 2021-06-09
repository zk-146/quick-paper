const handleCheckboxChange = (
  id,
  changeSelectAll,
  allChaptersChange,
  allChapters
) => {
  let index = id - 1;
  let chapters = [...allChapters];
  let length = chapters.length;
  let isChecked = chapters[index].isChecked;

  if (isChecked === false) {
    let i, checkForSelectAll;
    let count = 0;
    chapters[index] = {
      id: chapters[index].id,
      name: chapters[index].name,
      value: chapters[index].value,
      isChecked: true,
      isCheckBoxDis: chapters[index].isCheckBoxDis,
      isNumDisabled: false,
      isRandChecked: chapters[index].isRandChecked,
    };
    for (i = 0; i < length; i++) {
      checkForSelectAll = chapters[i].isChecked;
      if (checkForSelectAll === true) {
        count++;
      }
      if (count === length) {
        changeSelectAll(true);
      }
    }
  } else {
    chapters[index] = {
      id: chapters[index].id,
      name: chapters[index].name,
      value: "",
      isChecked: false,
      isCheckBoxDis: chapters[index].isCheckBoxDis,
      isNumDisabled: true,
      isRandChecked: chapters[index].isRandChecked,
    };
    changeSelectAll(false);
  }
  allChaptersChange(chapters);
};
export default handleCheckboxChange;
