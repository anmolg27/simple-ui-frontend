import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableBlankSpace from "./InvoiceTableBlankSpace";
import InvoiceTableFooter from "./InvoiceTableFooter";

const tableRowsCount = 11;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
  },
});

const InvoiceItemsTable = ({ invoice }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    <InvoiceTableRow items={invoice.items} />
    {invoice.items.length < tableRowsCount && (
      <InvoiceTableBlankSpace
        itemsCount={invoice.items.length}
        rowsCount={tableRowsCount - invoice.items.length}
      />
    )}
    <InvoiceTableFooter
      gstAmount={invoice.gstAmount}
      subTotal={invoice.subTotal}
      discount={invoice.discount}
      extraDiscount={invoice.extraDiscount}
      balance={invoice.balance}
      rowsCount={
        invoice.items.length < tableRowsCount
          ? tableRowsCount
          : invoice.items.length
      }
    />
  </View>
);

export default InvoiceItemsTable;
