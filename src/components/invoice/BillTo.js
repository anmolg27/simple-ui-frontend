import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
  },
  headerContainer: {
    textTransform: "capitalize",
    width: "50%",
  },
  invoiceNumberContainer: {
    width: "50%",
  },
  billTo: {
    // marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },

  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.billTo}>Bill To:</Text>
      <Text>{invoice.customerName}</Text>
      <Text>{invoice.address}</Text>
      <Text>{invoice.phone}</Text>
      {/* <Text>{invoice.email}</Text> */}
    </View>
    <View style={styles.invoiceNumberContainer}>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.label}>Invoice No:</Text>
        <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Date: </Text>
        <Text>{invoice.trans_date}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>GSTIN: </Text>
        <Text>{invoice.gstNumber}</Text>
      </View>
    </View>
  </View>
);
export default BillTo;
