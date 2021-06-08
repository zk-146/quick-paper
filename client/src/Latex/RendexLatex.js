import React, { useEffect } from "react";

function RenderLatex(props) {
  let node = React.createRef();
  useEffect(() => {
    const renderMath = () => {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, node.current]);
    };
    renderMath();
  }, [node]);
  return <div ref={node}>{props.children}</div>;
}
export default RenderLatex;
