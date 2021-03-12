import moment from "moment";
export const returnTimestamp = (date) => {
  let tempDate = date.split("T");
  let tempTime = tempDate[1];
  tempTime = tempTime.split(":");
  tempDate = tempDate[0];
  tempDate = tempDate.split("-");
  let year = parseFloat(tempDate[0]);
  let month = parseFloat(tempDate[1]) - 1;
  let day = parseFloat(tempDate[2]);
  let hours = parseFloat(tempTime[0]);
  let minutes = parseFloat(tempTime[1]);
  let datum = new Date(Date.UTC(year, month, day, hours, minutes));
  return datum.getTime() / 1000;
};
export const returnDate = (year, month, date) => {
  let monthString = month.toString();
  monthString = monthString.length === 1 ? `0${monthString}` : monthString;
  let dateString = date.toString();
  dateString = dateString.length === 1 ? `0${dateString}` : dateString;
  return `${year}-${monthString}-${dateString}`;
};
export const returnCurrentDateAndTime = () => {
  return `${returnDate(
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
};
export const returnTomorrowDate = () => {
  let d = new Date();
  d.setDate(new Date().getDate() + 1);
  return d;
};
export const isDateABeforeDateB = (dateA, dateB) => {
  let tempA = dateA.split("T");
  let tempB = dateB.split("T");
  // let tempC = dateC.split("T");
  tempA[1] = parseInt(tempA[1].replace(":", ""));
  tempB[1] = parseInt(tempB[1].replace(":", ""));
  // tempC[1] = parseInt(tempC[1].replace(":", ""));
  if (tempA[0] === tempB[0]) {
    if (tempA[1] < tempB[1]) return true;
    else return false;
  } else {
    let tA = tempA[0].split("-").map((dt) => parseInt(dt));
    tA = moment([tA[0], tA[1] - 1, tA[2]]);
    let tB = tempB[0].split("-").map((dt) => parseInt(dt));
    tB = moment([tB[0], tB[1] - 1, tB[2]]);

    let tBDiff = tB.diff(tA);

    if (tBDiff > 0) return true;
    else return false;
  }
};
export const isDateABetweenDateBAndDateC = (dateA, dateB, dateC) => {
  let tempA = dateA.split("T");
  let tempB = dateB.split("T");
  let tempC = dateC.split("T");
  tempA[1] = parseInt(tempA[1].replace(":", ""));
  tempB[1] = parseInt(tempB[1].replace(":", ""));
  tempC[1] = parseInt(tempC[1].replace(":", ""));
  if (tempA[0] === tempB[0]) {
    if (tempA[1] < tempB[1]) return false;
    else return true;
  } else if (tempA[0] === tempC[0]) {
    if (tempA[1] > tempC[1]) return false;
    else return true;
  } else {
    let tA = tempA[0].split("-").map((dt) => parseInt(dt));
    tA = moment([tA[0], tA[1] - 1, tA[2]]);
    let tB = tempB[0].split("-").map((dt) => parseInt(dt));
    tB = moment([tB[0], tB[1] - 1, tB[2]]);
    let tC = tempC[0].split("-").map((dt) => parseInt(dt));
    tC = moment([tC[0], tC[1] - 1, tC[2]]);
    let tBDiff = tB.diff(tA);
    let tCDiff = tC.diff(tA);
    if (tBDiff > 0 && tCDiff > 0) return false;
    else if (tBDiff < 0 && tCDiff > 0) return true;
    if (tBDiff < 0 && tCDiff < 0) return false;
  }
};
export const invoiceNumberGenerator = (number, prefix) => {
  let temp = number.toString();
  // if (numbers.length === 0) temp = 1;
  // else temp = parseInt(numbers[numbers.length - 1].split("-")[1]) + 1;
  // numbers.push(parseInt(numbers[numbers.length - 1]) + 1);
  let tempLength = temp.length;
  if (tempLength < 4) {
    let zeros = "";
    for (let i = 0; i < 4 - tempLength; i++) {
      zeros += "0";
    }
    temp = zeros + temp;
  }
  // console.log("bill number is ");
  // console.log(`${prefix}-${temp}`);
  return `${prefix}-${temp}`;
};
export const calculateNumberOfDays = (checkIn, checkOut) => {
  let checkOutArr = checkOut.split("T");
  let checkInArr = checkIn.split("T");
  checkInArr[1] = parseInt(checkInArr[1].replace(":", ""));
  checkOutArr[1] = parseInt(checkOutArr[1].replace(":", ""));
  if (checkInArr[0] === checkOutArr[0]) return 1;
  else {
    let checkInDate = checkInArr[0].split("-").map((dt) => parseInt(dt));

    let checkOutDate = checkOutArr[0].split("-").map((dt) => parseInt(dt));
    checkInDate = moment([checkInDate[0], checkInDate[1] - 1, checkInDate[2]]);
    checkOutDate = moment([
      checkOutDate[0],
      checkOutDate[1] - 1,
      checkOutDate[2],
    ]);

    let numberOfDays = checkOutDate.diff(checkInDate, "days");
    if (checkOutArr[1] < 1200) return numberOfDays < 0 ? 0 : numberOfDays;
    else return numberOfDays + 1 < 0 ? 0 : numberOfDays + 1;
  }
};
export const calculateAmount = (rate, checkIn, checkOut) => {
  let checkOutArr = checkOut.split("T");
  let checkInArr = checkIn.split("T");
  checkInArr[1] = parseInt(checkInArr[1].replace(":", ""));
  checkOutArr[1] = parseInt(checkOutArr[1].replace(":", ""));
  if (checkInArr[0] === checkOutArr[0]) return rate;
  else {
    let checkInDate = checkInArr[0].split("-").map((dt) => parseInt(dt));

    let checkOutDate = checkOutArr[0].split("-").map((dt) => parseInt(dt));
    checkInDate = moment([checkInDate[0], checkInDate[1] - 1, checkInDate[2]]);
    checkOutDate = moment([
      checkOutDate[0],
      checkOutDate[1] - 1,
      checkOutDate[2],
    ]);

    let numberOfDays = checkOutDate.diff(checkInDate, "days");
    if (checkOutArr[1] < 1200)
      return numberOfDays * rate < 0 ? 0 : numberOfDays * rate;
    else return (numberOfDays + 1) * rate < 0 ? 0 : (numberOfDays + 1) * rate;
  }
};

export const invoiceCreator = (
  invoiceNumber,
  total,
  subTotal,
  companyName,
  customerName,
  discount,
  extraDiscount,
  gstAmount,
  mobileNumber,
  items,
  date,
  companyAddress,
  gstNumber,
  country,
  state,
  jurisdiction,
  companyMobile,
  manufacturingLicenseNumber,
  dlNumber,
  foodLicenseNumber,
  vatNumber,
  operatorName
) => {
  return {
    country,
    state,
    jurisdiction,
    companyMobile,
    manufacturingLicenseNumber,
    dlNumber,
    foodLicenseNumber,
    vatNumber,
    operatorName,
    invoice_no: invoiceNumber,
    balance: total,
    customerName: customerName,
    companyName: companyName,
    customerPhone: mobileNumber,
    companyAddress: companyAddress,
    trans_date: date,
    subTotal,
    gstNumber,
    gstAmount,
    discount,
    extraDiscount,
    items,
  };
};
