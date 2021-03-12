import React, { useState, useEffect } from "react";
import closeIcon from "../../icons/closeIcon.png";
import { useSelector } from "react-redux";
import EditGuest from "../edit-guest-modal/edit-guest";
import EditBill from "../edit-bill-modal/edit-bill";
import "./styles.css";
export default function TransactionModal(props) {
  const { selectedTransaction, setShowTransactionModal } = props;
  const [showGuestEdit, setShowGuest] = useState(false);
  const [showBillEdit, setShowBillEdit] = useState(false);
  const { credentials } = useSelector((state) => state.user);
  useEffect(() => {
    document
      .querySelector(".transaction-modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "transaction-modal") {
          setShowTransactionModal(false);
        }
      });
  }, []);
  return (
    <div className="transaction-modal">
      {showGuestEdit && (
        <EditGuest
          setShowModal={setShowGuest}
          transactionId={selectedTransaction._id}
          details={{
            ...selectedTransaction.extraDetails,
            customerName: selectedTransaction.customerName,
            mobileNumber: selectedTransaction.mobileNumber,
          }}
        />
      )}
      {showBillEdit && (
        <EditBill
          setShowModal={setShowBillEdit}
          transactionId={selectedTransaction._id}
          details={{
            rooms: selectedTransaction.rooms,
            extraCharges: selectedTransaction.extraCharges,
            bill: selectedTransaction.bill,
            gst: selectedTransaction.gst,
            discountPercent: selectedTransaction.discountPercent,
            customerName: selectedTransaction.customerName,
            mobileNumber: selectedTransaction.mobileNumber,
          }}
        />
      )}

      <div className="transaction-modal__box">
        <div
          className="close-button"
          onClick={() => setShowTransactionModal(false)}
        >
          <img alt="close icon" src={closeIcon} />
        </div>
        {selectedTransaction.customerName && (
          <>
            <div className="transaction-modal__container">
              <div className="transaction-modal__general-detail-box">
                <div className="transaction-modal__general-detail">
                  <h4> NAME</h4>
                  <p>{selectedTransaction.customerName}</p>
                </div>
                <div className="transaction-modal__general-detail">
                  <h4> MOBILE NO</h4>
                  <p>{selectedTransaction.mobileNumber}</p>
                </div>
                <div className="transaction-modal__general-detail">
                  <h4> INVOICE NO</h4>
                  <p>{selectedTransaction.invoiceNumber}</p>
                </div>
                <div className="transaction-modal__general-detail">
                  <h4> DISCOUNT</h4>
                  <p>{selectedTransaction.discountPercent}%</p>
                </div>
                <div className="transaction-modal__general-detail">
                  <h4> GST</h4>
                  <p>{selectedTransaction.gst}%</p>
                </div>
                <div className="transaction-modal__general-detail">
                  <h4> TOTAL</h4>
                  <p>{selectedTransaction.bill}INR</p>
                </div>
              </div>
              <div className="transaction-modal__extra-detail-box mt-3">
                <h1>Extra Details</h1>
                <div className="transaction-modal__extra-detail-sub-box mt-2 row mx-0">
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> Address</h4>
                    <p>{selectedTransaction.extraDetails.address}</p>
                  </div>
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> Age</h4>
                    <p>{selectedTransaction.extraDetails.age}</p>
                  </div>
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> {selectedTransaction.extraDetails.idType} NO.</h4>
                    <p>{selectedTransaction.extraDetails.idNumber}</p>
                  </div>
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> COMING FROM</h4>
                    <p>{selectedTransaction.extraDetails.comingFrom}</p>
                  </div>
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> GOING TO</h4>
                    <p>{selectedTransaction.extraDetails.goingTo}</p>
                  </div>
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> NATIONALITY</h4>
                    <p>{selectedTransaction.extraDetails.nationality}</p>
                  </div>
                </div>
                <div className="transaction-modal__extra-detail-sub-box mt-2 row mx-0">
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> NO. OF MALE</h4>
                    <p>{selectedTransaction.extraDetails.numberOfMale}</p>
                  </div>
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4>NO. OF FEMALE</h4>
                    <p>{selectedTransaction.extraDetails.numberOfFemale}</p>
                  </div>
                  <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                    <h4> NO. OF KIDS</h4>
                    <p>{selectedTransaction.extraDetails.numberOfKids}</p>
                  </div>
                  {selectedTransaction.extraDetails.vehicleNumber && (
                    <div className="transaction-modal__extra-detail col-6 col-md-4 col-lg-2">
                      <h4> VEHICLE NO.</h4>
                      <p>{selectedTransaction.extraDetails.vehicleNumber}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="transaction-modal__data-box row mx-0  px-0">
                <div className="col-md-7 transaction-modal__rooms mt-4">
                  <div className="transaction-modal__rooms-table">
                    <div className="transaction-modal__header-row row mx-0">
                      <div className="col-2 px-1 col-lg-1">
                        <h3>Room</h3>
                      </div>
                      <div className="col-3 px-1 col-lg-3">
                        <h3>CheckIn</h3>
                      </div>
                      <div className="col-3 px-1 col-lg-3">
                        <h3>CheckOut</h3>
                      </div>
                      <div className="col-2 px-1 col-lg-2">
                        <h3>Rate</h3>
                      </div>
                      <div className="px-1 col-2 d-none d-lg-block d-md-none col-lg-1">
                        <h3>Days</h3>
                      </div>
                      <div className="col-2 px-1 col-lg-2">
                        <h3>Amount</h3>
                      </div>
                    </div>
                    <div className="transaction-modal__details-box row mx-0">
                      {selectedTransaction.rooms.map((room) => (
                        <div
                          key={room.roomNumber}
                          className="col-12 px-0 row mx-0"
                        >
                          <div className="col-2 px-1 col-lg-1">
                            {room.roomNumber}
                          </div>
                          <div className="px-1 col-3 col-lg-3">
                            {room.checkIn}
                          </div>
                          <div className="col-3 px-1 col-lg-3">
                            {room.checkOut}
                          </div>
                          <div className="col-2 px-1 col-lg-2">{room.rate}</div>
                          <div className="col-2 px-1 d-none d-lg-block d-md-none col-lg-1">
                            {room.days}
                          </div>
                          <div className="col-2 px-1 col-lg-2">
                            {room.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-5 transaction-modal__extra-charges mt-4">
                  <div className="transaction-modal__extra-charges-table">
                    <div className="transaction-modal__header-row row mx-0">
                      <div className="col-4 px-1">
                        <h3>Asset</h3>
                      </div>
                      <div className="col-3 px-1">
                        <h3>Rate</h3>
                      </div>
                      <div className="col-2 px-1">
                        <h3>Disc/unit</h3>
                      </div>
                      <div className="col-3 px-1">
                        <h3>Qty</h3>
                      </div>
                    </div>
                    <div className="transaction-modal__details-box row mx-0">
                      {selectedTransaction.extraCharges &&
                        selectedTransaction.extraCharges.length > 0 &&
                        selectedTransaction.extraCharges.map((asset) => (
                          <div
                            key={asset.assetName}
                            className="col-12 px-0 row mx-0"
                          >
                            <div className="col-4 px-1">{asset.assetName}</div>
                            <div className="col-3 px-1">{asset.charge}</div>
                            <div className="col-2 px-1">
                              {asset.discountPerUnit}
                            </div>
                            <div className="col-3 px-1">{asset.quantity}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {credentials && credentials.authorization === "owner" && (
              <>
                <button
                  onClick={() => setShowGuest(true)}
                  className="transaction-modal__edit-guest-button"
                >
                  Edit Guest Details
                </button>
                <button
                  onClick={() => setShowBillEdit(true)}
                  className="transaction-modal__edit-bill-button"
                >
                  Edit Bill
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
