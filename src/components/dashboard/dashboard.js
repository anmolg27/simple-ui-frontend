import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import PrebookedRoomModal from "../prebooked-room-modal/prebooked-room-modal";
import BillingModal from "../billing-modal/billing-modal";
import {
  returnDate,
  returnCurrentDateAndTime,
  isDateABetweenDateBAndDateC,
  isDateABeforeDateB,
  returnTimestamp,
} from "../../utils/functions";
import { fetchCustomers } from "../../redux/actions/customerAction";
import { fetchBills } from "../../redux/actions/transactionAction";

import CustomerForm from "../customer-form/customer-form";
import EditBills from "../edit-bills-modal/edit-bills";
import AddOn from "../add-on/add-on";
import RoomDetail from "../room-detail-modal/RoomDetail";
// import CompanyForm from "../company-form/company-form";
// import Pos from '../pos/pos'
import "./styles.css";
// import checkOutIcon from "../../icons/check-out.svg";
// import checkInIcon from "../../icons/check-in.svg";
// import editIcon from "../../icons/pencil.svg";
// import addOnIcon from "../../icons/hotel-bell.svg";

export default function Ledger(props) {
  const dispatch = useDispatch();
  const [showBillModal, setShowBillModal] = useState(false);
  const [billID, setBillID] = useState("");
  const [total, setTotal] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditBills, setShowEditBills] = useState(false);
  const {
    customers,
    loading: customersLoading,
    hasMore: hasMoreCustomers,
    loadingMore: loadingMoreCustomers,
  } = useSelector((state) => state.customers);
  // const { data, loading: companyLoading } = useSelector(
  //   (state) => state.company
  // );
  const {
    transactions,
    loading: transactionsLoading,
    hasMore: hasMoreTransactions,
    loadingMore: loadingMoreTransactions,
  } = useSelector((state) => state.transactions);
  // const [roomAction, setRoomAction] = useState("");
  const [selectedReservedCustomer, setSelectedReservedCustomer] = useState({});
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRoomForAddOn, setSelectedRoomForAddOn] = useState(null);
  const [showRoomDetail, setShowRoomDetail] = useState(false);

  const [showAddOn, setShowAddOn] = useState(false);
  // const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showPrebookedRoomModal, setShowPrebookedRoomModal] = useState(false);
  const calculateTotal = (transaction) => {
    let subTotal = 0,
      gst = 0,
      discount = 0,
      total = 0;
    transaction.items.forEach((item) => {
      let tempDiscRate, tempSub;
      tempSub = item.rate;
      subTotal += tempSub * item.quantity;
      tempDiscRate = (item.rate * item.discount) / 100;
      discount += tempDiscRate * item.quantity;
      if (transaction.gstStructure !== "bill wise") {
        gst += ((tempSub - tempDiscRate) * item.quantity * item.gst) / 100;
      }
    });
    if (transaction.gstStructure === "bill wise") {
      gst = ((subTotal - discount) * transaction.gst) / 100;
    }
    if (transaction.discountOnBill.discountType === "cash")
      discount += transaction.discountOnBill.value;
    else
      discount +=
        ((subTotal + gst - discount) * transaction.discountOnBill.value) / 100;
    return subTotal + gst - discount;
  };

  return (
    <div className="dashboard-home-container">
      {showEditBills && <EditBills setShowModal={setShowEditBills} />}
      {showBillModal && (
        <BillingModal
          billID={billID}
          closeModal={() => setShowBillModal(false)}
          total={total}
          customer={selectedCustomer}
        />
      )}
      {showRoomDetail && (
        <RoomDetail
          selectedRoom={selectedRoom}
          setShowModal={setShowRoomDetail}
        />
      )}
      {showCustomerForm && (
        <CustomerForm
          customer={selectedCustomer}
          // roomAction={roomAction}
          // selectedRoom={selectedRoom}
          closeModal={() => setShowCustomerForm(false)}
        />
      )}
      {/* {showCompanyForm && (
        <CompanyForm closeModal={() => setShowCompanyForm(false)} />
      )} */}
      {showAddOn && (
        <AddOn
          closeModal={() => setShowAddOn(false)}
          selectedRoom={selectedRoomForAddOn}
        />
      )}
      {showPrebookedRoomModal && (
        <PrebookedRoomModal
          room={selectedReservedCustomer}
          setShowModal={setShowPrebookedRoomModal}
        />
      )}
      {customersLoading || transactionsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="row mx-0">
            <div className="col-6 col-md-3 px-2">
              <button
                onClick={() => {
                  props.history.push("/home/pos");
                }}
                className="dashboard-home__box-1 check-in"
              >
                <span>New Bill</span>
              </button>
            </div>
            <div className="col-6 col-md-3 px-2">
              <button
                onClick={() => {
                  // setRoomAction("add");
                  setSelectedCustomer(null);
                  setShowCustomerForm(true);
                }}
                className="dashboard-home__box-1 add-rooms"
              >
                <span>New Customer</span>
              </button>
            </div>
            <div className="col-6 col-md-3 px-2">
              <button
                onClick={() => {
                  props.history.push("/home/newRegistration?type=reservation");
                }}
                className="dashboard-home__box-1 reservation"
              >
                <span>Customers</span>
              </button>
            </div>
            <div className="col-6 col-md-3 px-2">
              <button
                className="dashboard-home__box-1 booking-history"
                onClick={() => {
                  props.history.push("/home/bookingHistory");
                }}
              >
                <span>Transactions</span>
              </button>
            </div>
          </div>
          <div className="row mx-0 dashboard-home__border my-3"></div>
          <div className="row mx-0 dashboard-home__main">
            <div className="col-md-6 px-2">
              <div className="dashboard-home__table">
                <h2>Customers</h2>
                <div className="dashboard-home__table-list row mx-0">
                  <div className="dashboard-home__table-heading-row row mx-0  col-12">
                    <h3 className="col-3">Name</h3>
                    <h3 className="col-3">Contact</h3>
                    <h3 className="col-2">Area</h3>
                    <h3 className="col-2">Balance</h3>
                  </div>
                  <div className="row mx-0 px-0 dashboard-home__table-content col-12">
                    {!customersLoading &&
                      customers.length > 0 &&
                      customers.map((customer) => (
                        <div
                          key={customer._id}
                          className="dashboard-home__table-row row mx-0 px-0 col-12"
                        >
                          <p className="col-3">{customer.customerName}</p>
                          <p className="col-3">{customer.mobileNumber}</p>
                          <p className="col-2">{customer.area}</p>
                          <p className="col-2">
                            {+customer.balance.toFixed(2)} RS
                          </p>
                          <div className="col-2 dashboard__edit text-right">
                            <i
                              className="fa fa-pencil-square"
                              aria-hidden="true"
                              onClick={() => {
                                setSelectedCustomer(customer);
                                setShowCustomerForm(true);
                              }}
                            ></i>
                          </div>
                        </div>
                      ))}
                    <div className="dashboard-home__load-more mx-0 px-0 col-12">
                      {hasMoreCustomers ? (
                        <>
                          <button
                            className="load-more-button"
                            disabled={loadingMoreCustomers}
                            onClick={() => {
                              dispatch(fetchCustomers(customers.length));
                            }}
                          >
                            {loadingMoreCustomers ? (
                              <>
                                <p className="dashboard__loading-text mb-0 mr-3">
                                  Loading
                                </p>
                                <div
                                  className="dashboard__spinner-border spinner-border"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <p>Load More</p>
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <p className="px-5">
                          {" "}
                          {customers.length === 0
                            ? "You have no customers at the moment. Create them by clicking New Customer button"
                            : customers.length < 10
                            ? ""
                            : "No more customers."}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 px-2">
              <div className="dashboard-home__table">
                <h2>Bills</h2>
                <div className="dashboard-home__table-list row mx-0">
                  <div className="dashboard-home__table-heading-row row mx-0 px-0 col-12">
                    <h3 className="col-3">Name</h3>
                    <h3 className="col-2">Paid?</h3>
                    <h3 className="col-2">Total</h3>
                    <div className="col-5 text-right">
                      {transactions.length > 0 && (
                        <button
                          onClick={() => setShowEditBills(true)}
                          className="dashboard__edit-all-button"
                        >
                          Edit Bills
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="row mx-0 dashboard-home__table-content px-0 col-12">
                    {!transactionsLoading &&
                      transactions.length > 0 &&
                      transactions.map((transaction) => (
                        <div
                          key={transaction._id}
                          className="dashboard-home__table-row row mx-0 px-0 col-12"
                        >
                          <p className="col-3">
                            {transaction.customer.customerName}
                          </p>
                          <p className="col-2">
                            {transaction.hasPaid ? "Yes" : "No"}
                          </p>
                          <p className="col-2">
                            {(+calculateTotal(transaction)).toFixed(2)} Rs
                          </p>

                          <div className="col-5 text-right pr-2">
                            {!transaction.hasPaid && (
                              <>
                                <button
                                  onClick={() => {
                                    setTotal(+calculateTotal(transaction));

                                    if (transaction.customer.customerID) {
                                      setSelectedCustomer({
                                        customerName:
                                          transaction.customer.customerName,
                                        _id: transaction.customer.customerID,
                                      });
                                    } else setSelectedCustomer(null);
                                    setBillID(transaction._id);
                                    setShowBillModal(true);
                                  }}
                                  className="dashboard__pay-button mr-2"
                                >
                                  Pay Now
                                </button>
                                {/* <button className="dashboard__edit-button">
                                  Edit
                                </button> */}
                              </>
                            )}
                          </div>
                        </div>
                      ))}

                    <div className="dashboard-home__load-more mx-0 px-0 col-12">
                      {hasMoreTransactions ? (
                        <>
                          <button
                            className="load-more-button"
                            disabled={loadingMoreTransactions}
                            onClick={() => {
                              dispatch(fetchBills(transactions.length));
                            }}
                          >
                            {loadingMoreTransactions ? (
                              <>
                                <p className="dashboard__loading-text mb-0 mr-3">
                                  Loading
                                </p>
                                <div
                                  className="dashboard__spinner-border spinner-border"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <p>Load More</p>
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <p className="px-5">
                          {" "}
                          {transactions.length === 0
                            ? "You have no bills at the moment. Create them by clicking New Bill button"
                            : transactions.length < 10
                            ? ""
                            : "No more Transactions."}{" "}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
