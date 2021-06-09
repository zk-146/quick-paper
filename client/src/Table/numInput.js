const numInput = (event, id, allChapters, allChaptersChange) => {
  let pattern = /^([0-1]?[0-9]|20)$/;
  let value = event.target.value;
  let index = id - 1;
  let chapters = [...allChapters];

  if (pattern.test(value)) {
    chapters[index] = {
      id: chapters[index].id,
      name: chapters[index].name,
      value: value,
      isChecked: chapters[index].isChecked,
      isCheckBoxDis: chapters[index].isCheckBoxDis,
      isNumDisabled: chapters[index].isNumDisabled,
      isRandChecked: chapters[index].isRandChecked,
    };
  } else {
    alert("Input should be number only and it should not be more than 20!");
    chapters[index] = {
      id: chapters[index].id,
      name: chapters[index].name,
      value: "",
      isChecked: chapters[index].isChecked,
      isCheckBoxDis: chapters[index].isCheckBoxDis,
      isNumDisabled: chapters[index].isNumDisabled,
      isRandChecked: chapters[index].isRandChecked,
    };
  }
  allChaptersChange(chapters);
};
export default numInput;
