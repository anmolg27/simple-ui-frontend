import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  companyDetails: {
    width: 240,
    backgroundColor: "whitesmoke",
    padding: 10,
  },
  companyName: {
    textAlign: "center",
    color: "black",
    fontSize: 30,
    textAlign: "left",
    textTransform: "uppercase",
    letterSpacing: 4,
    fontWeight: "bolder",
  },
  companyAddress: {
    textTransform: "capitalize",
    width: 150,
    borderRadius: 5,
  },

  invoiceDetails: {
    // marginLeft: 40,
    width: 270,
    textOverflow: "hidden",
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    // padding: 10,
    // paddingVertical: 10,
    borderRadius: 3,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tableHead: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",

    paddingTop: 2,
    backgroundColor: "#dedede",
    width: "50%",
    height: 25,
    textAlign: "center",
    fontSize: 13,
  },
  tableCell: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",

    paddingTop: 2,
    backgroundColor: "#dbfff2",
    width: "50%",
    height: 25,
    textTransform: "uppercase",
    textAlign: "center",
  },

  reportTitle: {
    color: "brown",
    letterSpacing: 2,
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },
});

const InvoiceTitle = ({
  companyAddress,
  companyName,
  state,
  companyMobile,
  country,
  customerName,
  customerPhone,
  invoice_no,
  trans_date,
  operatorName,
  gstNumber,
}) => (
  <View style={styles.titleContainer}>
    <View style={styles.companyDetails}>
      <Text style={styles.companyName}>{companyName}</Text>
      <Text style={styles.companyAddress}>{companyAddress}</Text>
      <Text style={styles.companyAddress}>
        {state}, {country}
      </Text>
      <Text style={styles.companyAddress}>Phone: {companyMobile}</Text>
    </View>
    <View style={styles.invoiceDetails}>
      <Text style={styles.tableHead}>Invoice</Text>
      <Text style={styles.tableHead}>Date</Text>
      <Text style={styles.tableCell}>{invoice_no}</Text>
      <Text style={styles.tableCell}>{trans_date}</Text>
      <Text style={styles.tableHead}>Customer</Text>
      <Text style={styles.tableHead}>Contact No.</Text>
      <Text style={styles.tableCell}>{customerName}</Text>
      <Text style={styles.tableCell}>{customerPhone}</Text>
      <Text style={styles.tableHead}>GSTIN.</Text>
      <Text style={styles.tableHead}>Billed By</Text>
      <Text style={styles.tableCell}>{gstNumber}</Text>
      <Text style={styles.tableCell}>{operatorName}</Text>
    </View>
  </View>
);

export default InvoiceTitle;
