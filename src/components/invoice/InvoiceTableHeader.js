import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#a5cfc7",
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  sno: {
    paddingTop: 5,
    textAlign: "right",
    paddingRight: 5,
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  description: {
    paddingTop: 5,
    textAlign: "left",
    paddingLeft: 10,
    width: "43%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  qty: {
    paddingTop: 5,
    textAlign: "right",
    paddingRight: 10,
    // backgroundColor: "red",
    width: "8%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  rate: {
    paddingTop: 5,
    textAlign: "right",
    paddingRight: 10,
    width: "14%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  discount: {
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 5,
    width: "8%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  gst: {
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 5,
    width: "8%",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 5,
    width: "14%",
    height: "100%",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.sno}>SNo</Text>
    <Text style={styles.description}>Description</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.rate}>Rate</Text>
    <Text style={styles.discount}>Disc</Text>
    <Text style={styles.gst}>GST</Text>
    <Text style={styles.amount}>Amount</Text>
  </View>
);

export default InvoiceTableHeader;
