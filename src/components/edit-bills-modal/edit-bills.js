import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.css";
import { discountAllBills } from "../../redux/actions/transactionAction";
import closeIcon from "../../icons/closeIcon.png";
export default function EditBills(props) {
  const dispatch = useDispatch();
  const { setShowModal } = props;
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (isNaN(+discount)) return alert("Please Enter a valid discount");
    // if (+discount > 100 && +discount <= 0)
    //   return alert("Discount can't be greater than 100 and negative");
    setLoading(true);
    dispatch(discountAllBills(+discount, setLoading));
  };
  return (
    <div className="edit-bills-modal">
      <div className="edit-bills-modal__box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} />
        </div>
        <div className="edit-bills__input-box">
          <label htmlFor="discount">Add Discount</label>
          <input
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            id="discount"
            placeholder="in Percent"
            type="number"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="edit-bills__submit-button"
        >
          {loading ? (
            <>
              Loading...
              <div className="ml-2 spinner-border text-danger" role="status">
                <span className="sr-only"></span>
              </div>
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
