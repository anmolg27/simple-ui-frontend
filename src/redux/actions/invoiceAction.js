import { CREATE_INVOICE } from "../actionTypes";
import { invoiceCreator, invoiceNumberGenerator } from "../../utils/functions";
import history from "../../utils/history";
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
  let totalBeforeExtraDiscount = subTotal - discount + gst;
  let itemsDiscount = discount;
  if (transaction.discountOnBill.discountType === "cash")
    discount += transaction.discountOnBill.value;
  else
    discount +=
      ((subTotal + gst - discount) * transaction.discountOnBill.value) / 100;
  return {
    subTotal,
    gst,
    discount,
    total: subTotal + gst - discount,
    totalBeforeExtraDiscount,
    itemsDiscount,
  };
};
export const createInvoice = (data, customer) => (dispatch, getState) => {
  const { data: companyData } = getState().company;
  const { credentials } = getState().user;
  const billStats = calculateTotal(data);
  // console.log("bill stats are");
  // console.log(billStats);
  // console.log("number");
  // console.log(data.billNumber);
  const invoiceNumber = invoiceNumberGenerator(
    data.billNumber,
    companyData.billNumberPrefix
  );
  const items = data.items.map((item, i) => ({
    sno: i + 1,
    desc: item.productName,
    discount: item.discount,
    discountType: "%",
    gst: item.gst,
    rate: item.rate,
    qty: item.quantity,
    variant: "",
  }));
  let date = new Date(data.createdAt).toLocaleDateString();
  let companyAddress = "";
  for (let line in companyData.address) {
    if (companyData.address[line])
      companyAddress += " " + companyData.address[line];
  }
  companyAddress = companyAddress.trim();
  const customerName = customer ? customer.customerName : "CASH";
  const customerMobile = customer ? customer.mobileNumber : "";
  const iv = invoiceCreator(
    invoiceNumber,
    billStats.total,
    billStats.subTotal,
    companyData.companyName,
    customerName,
    billStats.itemsDiscount,
    billStats.discount - billStats.itemsDiscount,
    billStats.gst,
    customerMobile,
    items,
    date,
    companyAddress,
    companyData.gstNumber,
    companyData.country,
    companyData.state,
    "",
    companyData.contactNumber,
    "",
    "",
    "",
    "",
    credentials.userName
  );
  console.log("iv");
  console.log(iv);
  dispatch({ type: CREATE_INVOICE, payload: iv });
  history.push("/home/invoice");
};
