import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Refactoring } from "./refactoring/Refactoring";
import { Complexity } from "./complexity/Complexity";
import React from "react";
import style from "./CodeBox.module.css";
import { ComplexityData, RefactoringData } from "../hooks/query";

interface CodeBoxProps {
  type: string;
  data: RefactoringData | ComplexityData;
}

const CodeBox = React.memo(({ type, data }: CodeBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <div className={style.info_box}>
      <div className={style.box_title}>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{type}</span>
          <FontAwesomeIcon
            icon={faChevronUp}
            className={
              isModalOpen
                ? style.code_arrow
                : style.code_arrow + " " + style.code_spin
            }
            onClick={modalOpen}
          />
        </div>
        <hr />
      </div>
      {type === "REFACTORING" ? (
        <Refactoring isModalOpen={isModalOpen} data={data} />
      ) : null}
      {type === "TIME COMPLEXITY" ? (
        <Complexity isModalOpen={isModalOpen} data={data} />
      ) : null}
      {type === "SPACE COMPLEXITY" ? (
        <Complexity isModalOpen={isModalOpen} data={data} />
      ) : null}
    </div>
  );
});
CodeBox.displayName = "CodeBox";
export default CodeBox;