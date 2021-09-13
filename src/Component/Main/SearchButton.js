import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchButton(props) {
  const handleClick = () => {
    props.click();
  };

  return (
    <div>
      <button
        onClick={() => {
          handleClick();
        }}
        className="faSearch"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
