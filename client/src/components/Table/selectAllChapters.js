const selectAllChapters = (allChapters, allChaptersChange, selectAll) => {
  let chapters = [...allChapters];
  let length = allChapters.length;
  let i;

  if (selectAll) {
    for (i = 0; i < length; i++) {
      chapters[i] = {
        id: chapters[i].id,
        name: chapters[i].name,
        value: "",
        isChecked: false,
        isCheckBoxDis: false,
        isNumDisabled: true,
        isRandChecked: chapters[i].isRandChecked,
      };
    }
  } else {
    for (i = 0; i < length; i++) {
      chapters[i] = {
        id: chapters[i].id,
        name: chapters[i].name,
        value: chapters[i].value,
        isChecked: true,
        isCheckBoxDis: false,
        isNumDisabled: false,
        isRandChecked: chapters[i].isRandChecked,
      };
    }
  }
  allChaptersChange(chapters);
};
export default selectAllChapters;
