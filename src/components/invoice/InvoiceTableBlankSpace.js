import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",
    height: 22,
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
    textTransform: "capitalize",
    padding: 5,
    width: "5%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  description: {
    textAlign: "left",
    textTransform: "capitalize",
    paddingTop: 5,
    paddingHorizontal: 10,
    width: "43%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  qty: {
    textAlign: "right",

    padding: 5,
    width: "8%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  rate: {
    textAlign: "right",

    padding: 5,
    width: "14%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  discount: {
    textAlign: "right",

    padding: 5,
    width: "8%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },
  gst: {
    textAlign: "right",

    padding: 5,
    width: "8%",
    height: "100%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: { textAlign: "right", padding: 5, width: "14%", height: "100%" },
});

const InvoiceTableRow = ({ itemsCount, rowsCount }) => {
  const blankRows = Array(rowsCount).fill(0);
  return (
    <>
      {blankRows.map((x, i) => (
        <View
          style={
            (i + itemsCount) % 2 === 0
              ? { ...styles.container, ...styles.containerEven }
              : { ...styles.container, ...styles.containerOdd }
          }
        >
          <Text style={styles.sno}></Text>
          <Text style={styles.description}></Text>
          <Text style={styles.qty}></Text>
          <Text style={styles.rate}></Text>
          <Text style={styles.discount}></Text>
          <Text style={styles.gst}></Text>
          <Text style={styles.amount}></Text>
        </View>
      ))}
    </>
  );
};

export default InvoiceTableRow;
