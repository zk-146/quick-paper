const numInput = (
  value,
  negMarks,
  hrs,
  mins,
  setMarks,
  setTmins,
  setThrs,
  setNegMarks
) => {
  let pattern = /^[0-9]*$/;
  let pointPattern = /^(10|\d)(\.\d{1,2})?$/;

  if (negMarks) {
    if (pointPattern.test(parseInt(value))) {
      setNegMarks(value);
    } else {
      setNegMarks("");
    }
  } else if (hrs) {
    if (pattern.test(parseInt(value))) {
      if (value <= 6) {
        setThrs(value);
      } else {
        setThrs("");
      }
    } else {
      setThrs("");
    }
  } else if (mins) {
    if (pattern.test(parseInt(value))) {
      if (value <= 59) {
        setTmins(value);
      } else {
        setTmins("");
      }
    } else {
      setTmins("");
    }
  } else {
    if (pattern.test(parseInt(value))) {
      if (value > 10) {
        setMarks("");
      } else {
        setMarks(parseInt(value));
      }
    } else {
      setMarks("");
    }
  }
};

export default numInput;
