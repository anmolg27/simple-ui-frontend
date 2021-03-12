import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkOutCustomer } from "../../redux/actions/customerAction";
import uniqid from "uniqid";
import { invoiceNumberGenerator } from "../../utils/functions";
import {
  calculateAmount,
  calculateNumberOfDays,
  returnDate,
} from "../../utils/functions";
import Input from "../input/input";
import "./styles.css";
const parseParams = (pString) => {
  let tempObject = {};
  let temp = pString.replace("?", "").replace("%20", " ").split("&");

  temp.forEach((ps) => {
    let t = ps.split("=");
    tempObject[`${t[0]}`] = t[1];
  });
  return tempObject;
};
export default function CheckOut(props) {
  const { customers, loading } = useSelector((state) => state.customers);
  const { data } = useSelector((state) => state.company);
  const { rooms } = useSelector((state) => state.rooms);
  const [customerData, setCustomerData] = useState({});
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [gst, setGst] = useState("0");
  const [discount, setDiscount] = useState("0");
  const [discountInCash, setDiscountInCash] = useState("0");
  const [roomSubTotal, setRoomSubTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [extraCharges, setExtraCharges] = useState("0");
  const [totalAmount, setTotalAmount] = useState("0");
  const dispatch = useDispatch();
  // const [assetDiscounts, setAssetDiscounts] = useState([]);
  const [assetTableFields, setAssetTableFields] = useState([]);
  // useEffect(() => {});
  const [invoiceNumber, setInvoiceNumber] = useState({
    valueName: "invoiceNumber",
    label: "Invoice No.",
    disabled: true,
    type: "text",
    required: true,
    value: "",
    handleChange: (val) => {
      setInvoiceNumber((flds) => ({ ...flds, value: val }));
    },
  });
  useEffect(() => {
    if (data.invoiceNumbers) {
      setInvoiceNumber((fld) => ({
        ...fld,
        value: invoiceNumberGenerator(
          data.invoiceNumbers,
          data.billNumberPrefix
        ),
      }));
    }
  }, [data]);
  function generateAssetField(
    assetName = "",
    rate = "",
    quantity = "",
    amount = ""
  ) {
    let tempField = {};

    tempField["id"] = uniqid("assetstable-");
    tempField["assetName"] = {
      value: assetName,
    };

    tempField["rate"] = {
      value: rate,
    };
    tempField["quantity"] = {
      value: quantity,
    };
    tempField["discount"] = {
      handleChange: (val) => {
        setAssetTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.discount.value = val.replace("e", "");
              fld.amount.value =
                (parseFloat(fld.rate.value) - (parseFloat(val) || 0)) *
                parseInt(fld.quantity.value);
            }
            return fld;
          })
        );
      },
      value: 0,
    };
    tempField["amount"] = {
      value: amount,
    };
    return tempField;
  }
  const handleSubmit = () => {
    if (customerData.rooms.every((room) => room.isCheckingOut !== "yes"))
      return alert("please checkout any single room atleast");
    let fieldsObject = customerData;
    if (assetTableFields.length > 0)
      fieldsObject.extraCharges = assetTableFields.map((ast) => ({
        assetName: ast.assetName.value,
        quantity: ast.quantity.value,
        charge: ast.rate.value,
        amount: ast.amount.value,
        discountPerUnit: parseFloat(ast.discount.value) || 0,
      }));
    fieldsObject.rooms = fieldsObject.rooms.filter(
      (room) => room.isCheckingOut === "yes"
    );
    fieldsObject.bill = totalAmount;
    fieldsObject.rooms = fieldsObject.rooms.map((room) => {
      delete room.hasCheckedOut;
      delete room.isCheckingOut;
      room.checkOut = `${returnDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      )}T${
        new Date().getHours().toString().length === 1
          ? `0${new Date().getHours()}`
          : new Date().getHours()
      }:${
        new Date().getMinutes().toString().length === 1
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes()
      }`;
      return room;
    });
    fieldsObject["invoiceNumber"] = invoiceNumber.value;
    fieldsObject["gst"] = parseFloat(gst);
    fieldsObject["discountPercentOnRooms"] = parseFloat(discount) || 0;
    fieldsObject["discountPercent"] = (
      (100 * (parseFloat(discountAmount) || 0)) /
      ((parseFloat(totalAmount) || 0) -
        (parseFloat(taxAmount) || 0) +
        (parseFloat(discountAmount) || 0))
    ).toFixed(2);
    console.log("fields object are");
    console.log(fieldsObject);
    dispatch(checkOutCustomer(fieldsObject, props.history));
  };
  useEffect(() => {
    if (customerData.rooms) {
      let temp = 0;
      customerData.rooms.forEach((room) => {
        if (room.isCheckingOut === "yes") temp += room.amount;
      });
      setSubTotal(
        temp +
          assetTableFields.reduce((a, b) => {
            // console.log("b is");
            // console.log(b);
            a += parseFloat(b.quantity.value) * (parseFloat(b.rate.value) || 0);
            return a;
          }, 0)
      );
      setRoomSubTotal(parseFloat(temp));
      let tempDisc = parseFloat(discount);
      if (discount === "") tempDisc = 0;
      let tempDiscAmount = (temp * tempDisc) / 100;
      console.log("tempDiscAmount before");
      console.log(tempDiscAmount);
      console.log(assetTableFields);
      tempDiscAmount += assetTableFields.reduce((a, b) => {
        console.log("b is");
        console.log(b);
        a += parseFloat(b.quantity.value) * (parseFloat(b.discount.value) || 0);
        return a;
      }, 0);
      setDiscountAmount(Math.round(parseFloat(tempDiscAmount)).toFixed(2));

      temp = temp - (temp * tempDisc) / 100;

      assetTableFields.forEach((asset) => {
        temp += parseFloat(asset.amount.value);
      });
      // setSubTotal(temp);

      setTaxAmount((temp * parseFloat(gst)) / 100);
      temp = temp + (temp * parseFloat(gst)) / 100;
      let tempExtra = parseFloat(extraCharges);
      if (extraCharges === "") tempExtra = 0;
      temp = temp + tempExtra;
      setTotalAmount(parseFloat(temp.toFixed(2)));
    }
  }, [customerData, gst, discount, extraCharges, assetTableFields]);
  useEffect(() => {
    if (customers.length > 0 && rooms.length > 0) {
      let tempSelected = props.match.params;
      tempSelected = customers.find(
        (customer) => customer._id === tempSelected.customerId
      );
      if (tempSelected) {
        tempSelected.rooms = tempSelected.rooms.filter(
          (room) => !room.hasCheckedOut
        );
        let tempRooms = tempSelected.rooms.map((room) => room.roomNumber);
        let tempRooomss = rooms.filter((room) =>
          tempRooms.includes(room.roomNumber)
        );
        tempSelected.rooms = tempSelected.rooms.map((room) => ({
          ...room,
          isCheckingOut: "no",
          rate: parseFloat(
            tempRooomss.find(
              (roomData) => roomData.roomNumber === room.roomNumber
            ).chargePerDay
          ),
          days: calculateNumberOfDays(room.checkIn, room.checkOut),
          amount: calculateAmount(
            tempRooomss.find(
              (roomData) => roomData.roomNumber === room.roomNumber
            ).chargePerDay,
            room.checkIn,
            room.checkOut
          ),
        }));
        setAssetTableFields(
          tempSelected.extraCharges.map((asset) =>
            generateAssetField(
              asset.assetName,
              asset.charge,
              asset.quantity,
              asset.amount
            )
          )
        );
        setSelectedRooms(tempRooomss);
        setCustomerData(tempSelected);
      }
    }
  }, [customers, rooms, props.match.params]);
  return (
    <>
      <button
        onClick={() => props.history.push("/home")}
        className="back-button"
      >
        &larr; Back
      </button>
      {customerData.rooms && selectedRooms && (
        <div className="check-out">
          <h2>CheckOut</h2>
          <div className="check-out__invoice-number">
            <Input inputProps={invoiceNumber} />
          </div>

          <div className="check-out__first-row row mx-0 px-0 mt-3">
            <div className="col-12 col-md-3 pb-5 check-out__customer-details">
              <p className="check-out__customer-name">
                {customerData.customerName}
              </p>
              <p className="check-out__mobile">{customerData.mobileNumber}</p>
              {customerData.extraDetails.vehicleNumber && (
                <p className="check-out__vehicle">
                  {customerData.extraDetails.vehicleNumber}
                </p>
              )}
              <p className="check-out__address">
                {customerData.extraDetails.address}
              </p>
            </div>
            <div className="col-12 col-md-9 px-0">
              <div className="check-out__table col-12 row px-0">
                <div className="col-12 check-out__heading-row row px-0 mx-0">
                  <h3 className="col-2 col-md-2">Room No.</h3>
                  <h3 className="col-3 col-md-3">Check In</h3>
                  <h3 className="col-3 col-md-3">Check Out</h3>
                  <h3 className="col-2 col-md-2">Amount</h3>
                  <h3 className="col-2 col-md-2">Checking out?</h3>
                </div>
                {customerData.rooms.map((room) => (
                  <div
                    key={uniqid("cData")}
                    className="col-12 check-out__row row px-0 mx-0"
                  >
                    <p className="col-2 col-md-2">{room.roomNumber}</p>
                    <p className="col-3 col-md-3">
                      {room.checkIn.replace("T", "/")}
                    </p>
                    <p className="col-3 col-md-3">
                      <input
                        type="datetime-local"
                        defaultValue={room.checkOut}
                        onChange={(event) => {
                          setCustomerData((cust) => ({
                            ...cust,
                            rooms: cust.rooms.map((cRoom) => {
                              if (cRoom.roomNumber === room.roomNumber) {
                                cRoom.checkOut = event.target.value;
                                cRoom.amount = calculateAmount(
                                  cRoom.rate,
                                  cRoom.checkIn,
                                  event.target.value
                                );
                                cRoom.days = calculateNumberOfDays(
                                  cRoom.checkIn,
                                  event.target.value
                                );
                              }
                              return cRoom;
                            }),
                          }));
                        }}
                      />
                    </p>
                    <p className="col-2 col-md-2">{room.amount} INR</p>
                    <div className="col-2 col-md-2">
                      <select
                        value={room.isCheckingOut}
                        onChange={(event) => {
                          setDiscountInCash(0);
                          setDiscount(0);
                          setCustomerData((data) => ({
                            ...data,
                            rooms: data.rooms.map((roome) => {
                              if (roome.roomNumber === room.roomNumber)
                                roome.isCheckingOut = event.target.value;
                              return roome;
                            }),
                          }));
                        }}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mx-0 mt-5 px-0">
            <div className="check-out__asset-col col-12 col-md-6 row mx-0 p-0">
              <div className="check-out__asset-heading-row col-12 row mx-0">
                <div className="col-3 px-2 ">
                  <h3>Asset</h3>
                </div>
                <div className="col-1 px-2 ">
                  <h3>Qty</h3>
                </div>
                <div className="col-3 px-2 ">
                  <h3>Charge</h3>
                </div>
                <div className="col-2 px-2 ">
                  <h3>Disc/unit</h3>
                </div>
                <div className="col-3 px-2">
                  <h3>Amount</h3>
                </div>
              </div>
              <div className="check-out__asset-details col-12 row mx-0">
                {assetTableFields.length > 0 &&
                  assetTableFields.map((asset) => (
                    <div
                      key={asset.id}
                      className="check-out__asset-row px-0 col-12 row mx-0"
                    >
                      <div className="col-3 px-2 black-border__right">
                        <p>{asset.assetName.value}</p>
                      </div>
                      <div className="col-1 px-2 black-border__right">
                        <p>{asset.quantity.value}</p>
                      </div>
                      <div className="col-3 px-2 black-border__right">
                        <p>{asset.rate.value} INR</p>
                      </div>
                      <div className="col-2 px-2 black-border__right">
                        <input
                          type="number"
                          className="pl-1 check-out__asset-discount"
                          value={asset.discount.value}
                          onChange={(e) => {
                            asset.discount.handleChange(e.target.value);
                          }}
                        />{" "}
                        INR
                      </div>
                      <div className="col-3 px-2">
                        <p>{asset.amount.value} INR</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-6 col-md-3 mt-3">
              <div className="check-out__extra-charges-box">
                <p>Discount</p>
                <div className="check-out__extra-charges-input-box">
                  <label>In Percent</label>
                  <input
                    type="number"
                    // placeholder="In Percent"
                    value={discount}
                    onChange={(event) => {
                      setDiscount(event.target.value);
                      if (roomSubTotal !== 0)
                        setDiscountInCash(
                          (
                            ((parseFloat(event.target.value) || 0) *
                              roomSubTotal) /
                            100
                          ).toFixed(2)
                        );
                    }}
                  />
                </div>
                <div className="check-out__extra-charges-input-box">
                  <label>In Cash</label>
                  <input
                    type="number"
                    className="ml-2"
                    // placeholder="In amount"
                    value={discountInCash}
                    onChange={(event) => {
                      setDiscountInCash(parseFloat(event.target.value));
                      if (roomSubTotal !== 0)
                        setDiscount(
                          (
                            ((parseFloat(event.target.value) || 0) /
                              roomSubTotal) *
                            100
                          ).toFixed(2)
                        );
                    }}
                  />
                </div>
              </div>
              <div className="check-out__gst-box mt-3">
                <p>G.S.T%</p>
                <select
                  value={gst}
                  onChange={(event) => setGst(event.target.value)}
                >
                  <option value="0">0</option>
                  <option value="5">5</option>
                  <option value="12">12</option>
                  <option value="18">18</option>
                  <option value="28">28</option>
                </select>
              </div>
            </div>

            <div className="col-6 col-md-3 mt-3 pr-0">
              <div className="check-out_total-box">
                <h2>Sub Total</h2>
                <p>{subTotal} INR</p>
              </div>
              <div className="check-out_total-box">
                <h2>Discount</h2>
                <p>{discountAmount} INR</p>
              </div>
              <div className="check-out_total-box">
                <h2>Tax</h2>
                <p>{taxAmount} INR</p>
              </div>
              <div className="check-out_total-box">
                <h2>Total</h2>
                <p>{totalAmount} INR</p>
              </div>
              <div className="check-out__submit">
                <button disabled={loading} onClick={() => handleSubmit()}>
                  {loading ? (
                    <div className="spinner-border text-success" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
