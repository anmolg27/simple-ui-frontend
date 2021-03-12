// import React from "react";
// import { Text, View, StyleSheet } from "@react-pdf/renderer";

// const borderColor = "#90e5fc";
// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row",
//     borderBottomColor: "#bff0fd",
//     borderBottomWidth: 1,
//     alignItems: "center",
//     height: 24,
//     fontSize: 12,
//     fontStyle: "bold",
//   },
//   description: {
//     width: "85%",
//     // height: "100%",
//     textAlign: "right",
//     borderRightColor: borderColor,
//     borderRightWidth: 1,
//     paddingRight: 8,
//   },
//   total: {
//     width: "15%",
//     textAlign: "right",
//     paddingRight: 8,
//   },
// });

// const InvoiceTableFooter = ({ items, invoice }) => {
//   // const total = items
//   //   .map((item) => item.qty * item.rate)
//   //   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//   return (
//     <>
//       <View style={styles.row}>
//         <Text style={styles.description}>SUB TOTAL</Text>
//         <Text style={styles.total}>{invoice.subTotal.toFixed(2)}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.description}>
//           DISCOUNT: {invoice.discountPercent}%{" "}
//         </Text>
//         <Text style={styles.total}>{invoice.discountAmount.toFixed(2)}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.description}>GST: {invoice.gst}%</Text>
//         <Text style={styles.total}>{invoice.gstAmount.toFixed(2)}</Text>
//       </View>
//       <View style={styles.row}>
//         <Text style={styles.description}>TOTAL</Text>
//         <Text style={styles.total}>{invoice.balance.toFixed(2)}</Text>
//       </View>
//     </>
//   );
// };

// export default InvoiceTableFooter;

import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
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
  description: {
    textAlign: "right",
    textTransform: "capitalize",
    paddingTop: 5,
    paddingRight: 10,
    width: "86%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    height: "100%",
  },

  amount: {
    paddingTop: 5,
    textAlign: "right",
    paddingRight: 10,
    width: "14%",
    height: "100%",
  },
});

const InvoiceTableFooter = ({
  gstAmount,
  subTotal,
  discount,
  extraDiscount,
  rowsCount,
}) => (
  <>
    <View
      style={
        (0 + rowsCount) % 2 === 0
          ? {
              ...styles.container,
              ...styles.containerEven,
              borderTopColor: borderColor,
              borderTopWidth: 1,
            }
          : {
              ...styles.container,
              ...styles.containerOdd,
              borderTopColor: borderColor,
              borderTopWidth: 1,
            }
      }
    >
      <Text style={styles.description}>SubTotal</Text>
      <Text style={styles.amount}>{subTotal}</Text>
    </View>
    <View
      style={
        (1 + rowsCount) % 2 === 0
          ? { ...styles.container, ...styles.containerEven }
          : { ...styles.container, ...styles.containerOdd }
      }
    >
      <Text style={styles.description}>Discount</Text>
      <Text style={styles.amount}>{discount}</Text>
    </View>
    <View
      style={
        (2 + rowsCount) % 2 === 0
          ? { ...styles.container, ...styles.containerEven }
          : { ...styles.container, ...styles.containerOdd }
      }
    >
      <Text style={styles.description}>G.S.T</Text>
      <Text style={styles.amount}>{gstAmount}</Text>
    </View>

    <View
      style={
        (3 + rowsCount) % 2 === 0
          ? { ...styles.container, ...styles.containerEven }
          : { ...styles.container, ...styles.containerOdd }
      }
    >
      <Text style={styles.description}>Extra Discount</Text>
      <Text style={styles.amount}>{extraDiscount}</Text>
    </View>
    <View
      style={
        (4 + rowsCount) % 2 === 0
          ? { ...styles.container, ...styles.containerEven }
          : { ...styles.container, ...styles.containerOdd }
      }
    >
      <Text style={styles.description}>Total</Text>
      <Text style={styles.amount}>
        {parseFloat(
          eval("subTotal - discount + gstAmount - extraDiscount")
        ).toFixed(2)}
      </Text>
    </View>
  </>
);

export default InvoiceTableFooter;
