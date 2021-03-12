import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import "./styles.css";
import { updateAndGetTransactions } from "../../redux/actions/transactionAction";
import TransactionModal from "../transaction-modal/transaction-modal";
export default function BookingHistory(props) {
  const dispatch = useDispatch();
  const { transactions, loading } = useSelector((state) => state.transactions);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  useEffect(() => {
    dispatch(updateAndGetTransactions());
  }, [dispatch]);
  return (
    <>
      <button
        onClick={() => props.history.push("/home")}
        className="back-button"
      >
        &larr; Back
      </button>
      {/* <h5>Bookings' History</h5> */}
      {showTransactionModal && (
        <TransactionModal
          selectedTransaction={selectedTransaction}
          setShowTransactionModal={setShowTransactionModal}
        />
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="booking-history">
          <div className="booking-history__table">
            <div className="booking-history__header-row row mx-0 px-0">
              <div className="booking-history__customer-name-header col-3">
                Customer's Name
              </div>
              <div className="booking-history__mobile-number-header col-2">
                Mobile No.
              </div>
              <div className="booking-history__rooms-booked-header col-3">
                Rooms Booked
              </div>
              <div className="booking-history__total-header col-2">
                Total Bill
              </div>
            </div>
            <div className="booking-history__details-box row mx-0 px-0">
              {transactions.length > 0
                ? transactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="booking-history__details-row col-12 row mx-0 px-0"
                    >
                      <div className="booking-history__customer-name col-3">
                        {transaction.customerName}
                      </div>
                      <div className="booking-history__customer-mobile-number col-2">
                        {transaction.mobileNumber}
                      </div>
                      <div className="booking-history__customer-rooms-booked col-3">
                        {transaction.rooms
                          .map((room) => room.roomNumber)
                          .join(", ")}
                      </div>
                      <div className="booking-history__customer-total col-2">
                        {transaction.bill}
                      </div>
                      <div className="booking-history__view-more col-2 px-5">
                        <button
                          className="booking-history__view-more-button"
                          onClick={() => {
                            setShowTransactionModal(true);
                            setSelectedTransaction(transaction);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
