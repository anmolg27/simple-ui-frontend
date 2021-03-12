import React from "react";
import closeIcon from "../../icons/closeIcon.png";
import "./styles.css";
import Input from "../input/input";
export default function Complimentaries(props) {
  const { complimentaryFields, handleComplimentaryClose } = props;
  return (
    <div className="complimentaries-box">
      <h2>Complimentaries</h2>
      <div className="complimentary-table">
        {complimentaryFields.map((field, i) => (
          <div className="complimentary-row row mx-0" key={field["id"]}>
            <div className="col-6 px-2">
              <Input inputProps={field["assetName"]} />
            </div>
            <div className="col-5 px-2">
              <Input inputProps={field["charge"]} />
            </div>
            {complimentaryFields.length - 1 > i && (
              <img
                onClick={() => handleComplimentaryClose(field["id"])}
                src={closeIcon}
              />
            )}

            {/* <Input inputProps={field["charge"]} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
