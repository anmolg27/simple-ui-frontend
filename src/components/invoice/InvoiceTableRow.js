import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderBottomColor: "grey",
    // borderBottomWidth: 1,

    alignItems: "center",
    // height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  containerOdd: {
    backgroundColor: "#f5faf9",
  },
  containerEven: {
    backgroundColor: "#dff5ea",
  },
  sno: {
    textAlign: "right",
    paddingRight: 10,
    textTransform: "capitalize",
    paddingTop: 5,
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  description: {
    textAlign: "left",
    paddingLeft: 10,
    textTransform: "capitalize",
    paddingTop: 5,
    width: "43%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  qty: {
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 5,
    // backgroundColor: "red",
    width: "8%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  rate: {
    textAlign: "right",
    paddingRight: 10,
    paddingTop: 5,
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

const InvoiceTableRow = ({ items }) => (
  <>
    {items.map((item, i) => (
      <View
        style={
          i % 2 === 0
            ? { ...styles.container, ...styles.containerEven }
            : { ...styles.container, ...styles.containerOdd }
        }
      >
        <Text style={styles.sno}>{i + 1}</Text>
        <Text style={styles.description}>
          {item.desc}: {item.variant}
        </Text>
        <Text style={styles.qty}>{item.qty}</Text>
        <Text style={styles.rate}>{item.rate}</Text>
        <Text style={styles.discount}>{item.discount}%</Text>
        <Text style={styles.gst}>{item.gst}%</Text>
        <Text style={styles.amount}>{item.qty * item.rate}</Text>
      </View>
    ))}
  </>
);

export default InvoiceTableRow;
