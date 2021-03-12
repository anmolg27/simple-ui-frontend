import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import { useSelector, useDispatch } from "react-redux";
// import logo from "../../images/pepsi.png";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
// import logo from '../../../src/logo.png'

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 100,
    // width: 74,
    height: 100,
    // height: 66,
    marginLeft: "auto",
    marginRight: "auto",
    // padding: "20px",
    // backgroundColor: "red",
  },
});

const Invoice = ({ invoice, data }) => {
  // const { invoice } = useSelector((state) => state.invoice);
  console.log("data is");
  console.log(invoice);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {invoice.invoice_no && (
          <>
            <InvoiceTitle
              // title="Invoice"
              companyName={invoice.companyName}
              companyAddress={invoice.companyAddress}
              state={invoice.state}
              country={invoice.country}
              companyMobile={invoice.companyMobile}
              invoice_no={invoice.invoice_no}
              operatorName={invoice.operatorName}
              gstNumber={invoice.gstNumber}
              trans_date={invoice.trans_date}
              customerName={
                invoice.customerName ? invoice.customerName : "Cash"
              }
              customerPhone={
                invoice.customerPhone ? invoice.customerPhone : "**********"
              }
            />
            <InvoiceItemsTable invoice={invoice} />
            <InvoiceThankYouMsg />
          </>
        )}
      </Page>
    </Document>
  );
};

export default Invoice;
