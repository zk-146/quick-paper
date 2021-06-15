const MathJax = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  script.async = true;
};
export default MathJax;
