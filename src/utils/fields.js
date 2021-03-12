export const page1Fields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },

    { valueName: "barCode", type: "text", label: "Bar Code" },
    { valueName: "generate", type: "text", label: "Generate" },
    { valueName: "itemStyle", type: "text", label: "itemStyle" },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: "Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "company", type: "text", label: "Company" },
    { valueName: "rackNumber", type: "text", label: "Rack No." },
    { valueName: "industry", type: "text", label: "Industry" },
    { valueName: "category", type: "text", label: "Category" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "defSaleQty", type: "text", label: "DEF SALE QTY" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "itemDisc1", type: "text", label: "Item Disc1" },
    { valueName: "disc2", type: "text", label: "Disc2" },
    { valueName: "discount", type: "text", label: "Discount" },
    { valueName: "specialDiscount", type: "text", label: "Special Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "validFrom", type: "text", label: "Valid From" },
    { valueName: "crossCheck", type: "text", label: "Cross Check" },
  ],
  name: "Page 1",
};

export const jewelFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "industry", type: "text", label: "Industry" },
    { valueName: "code", type: "text", label: "Code" },

    { valueName: "barCode", type: "text", label: "Bar Code" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "diamondOrStone", type: "text", label: "Diamond/Stone" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "rate", type: "text", label: "Rate" },
    { valueName: "rateOf", type: "text", label: "Rate Of" },
    { valueName: "making", type: "text", label: "Making" },
    { valueName: "chargeOnMaking", type: "text", label: "Charge" },
    { valueName: "polish", type: "text", label: "Polish" },
    { valueName: "chargeOnPolish", type: "text", label: "Charge" },
    { valueName: "extraGoods", type: "text", label: "Extra Goods" },
    { valueName: "name", type: "text", label: "Name" },
    { valueName: "weight", type: "text", label: "Weight" },
    { valueName: "pcsOrSet", type: "text", label: "Pcs/Set" },
    { valueName: "type2", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },
    { valueName: "purity", type: "text", label: "Purity %" },
    { valueName: "refWiseStock", type: "text", label: "Ref Wise Stock" },
    { valueName: "discount", type: "text", label: "Discount" },
    { valueName: "jobHsnOrSa", type: "text", label: "Job HSN/SA" },
    { valueName: "jobSgst", type: "text", label: "Job SGST" },
    { valueName: "jobCgst", type: "text", label: "Job CGST" },
    { valueName: "jobIgst", type: "text", label: "Job IGST" },
    { valueName: "photo", type: "text", label: "Photo" },
  ],
  name: "Jewellery",
};

export const automobileFields = {
  topFields: [
    { valueName: "part", type: ["text"], label: "Part", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },
    { valueName: "code", type: "text", label: "Code" },

    { valueName: "rackNumber", type: "text", label: "Rack No." },
    { valueName: "name", type: "text", label: "Name" },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "brand", type: "text", label: "Brand" },
    { valueName: "group", type: "text", label: "Group" },
    { valueName: "category", type: "text", label: "Category" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %", required: true },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P.", required: true },
    { valueName: "pRate", type: "text", label: "P. RATE", required: true },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "wholesale", type: "text", label: "Wholesale" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "itemDiscount", type: "text", label: "Item Discount" },
    { valueName: "specialDiscount", type: "text", label: "Special Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "id", type: "text", label: "ID" },
    { valueName: "discount", type: "text", label: "Discount" },
    { valueName: "multiPart", type: "text", label: "Multi Part" },
    { valueName: "modelYear", type: "text", label: "Model End" },
  ],
  name: "Automobile",
};

export const bookStoreFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },
    { valueName: "code", type: "text", label: "Code" },
    { valueName: "rackNumber", type: "text", label: "Rack No." },

    { valueName: "author", type: "text", label: "Author" },
    { valueName: "publisher", type: "text", label: "Publisher" },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: " Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "company", type: "text", label: "Company" },
    { valueName: "publisher2", type: "text", label: "Publisher" },
    { valueName: "author2", type: "text", label: "Author" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "itemDiscount", type: "text", label: "Item Discount" },
    { valueName: "specialDiscount", type: "text", label: "Special Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "id", type: "text", label: "ID" },
    { valueName: "valueIn", type: "text", label: "Value In" },

    { valueName: "discount", type: "text", label: "Discount" },
  ],
  name: "Book Store",
};

export const pharmacyFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },

    { valueName: "packing", type: "text", label: "Packing" },
    { valueName: "unitFirst", type: "text", label: "Unit First" },
    { valueName: "unitSecond", type: "text", label: "Unit Second" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: " Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "company", type: "text", label: "Company" },
    { valueName: "salt", type: "text", label: "Salt" },
    { valueName: "category", type: "text", label: "Category" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "css", type: "text", label: "C.S.S." },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convStri", type: "text", label: "CONV. STRI" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
  ],
  name: "Pharmacy",
};

export const exciseFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },
    { valueName: "code", type: "text", label: "Code" },

    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: " Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "industry", type: "text", label: "Industry" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "volumeDiscount", type: "text", label: "Volume Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "id", type: "text", label: "ID" },
  ],
  name: "Excise for dealers",
};

export const fmcgFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },

    { valueName: "rackNumber", type: "text", label: "Rack No." },
    { valueName: "author", type: "text", label: "Author" },
    { valueName: "publisher", type: "text", label: "Publisher" },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: " Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "company", type: "text", label: "Company" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "itemDiscount", type: "text", label: "Item Discount" },
    { valueName: "specialDiscount", type: "text", label: "Special Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "freeScheme", type: "text", label: "Free Scheme" },
    { valueName: "validFrom", type: "text", label: "Valid From" },
    { valueName: "saleMargin", type: "text", label: "Sale Margin" },
    { valueName: "purcMrg", type: "text", label: "PURC MRG" },
    { valueName: "mrgType", type: "text", label: "MRG Type" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "narcotic", type: "text", label: "Narcotic" },
    { valueName: "scheduleH", type: "text", label: "Schedule H" },

    { valueName: "scheduleH1", type: "text", label: "Schedule H1" },
  ],
  name: "fmcg",
};

export const garmentFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },

    { valueName: "packing", type: "text", label: "Packing" },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "industry", type: "text", label: "Industry" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "volumeDiscount", type: "text", label: "Volume Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "freeScheme", type: "text", label: "Free Scheme" },
    { valueName: "validFrom", type: "text", label: "Valid From" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "id", type: "text", label: "ID" },
  ],
  name: "Garments",
};

export const mandiFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },

    { valueName: "unitFirst", type: "text", label: "Unit First" },
    { valueName: "unitSecond", type: "text", label: "Unit Second" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "industry", type: "text", label: "Industry" },
    { valueName: "tradingAOrC", type: "text", label: "Trading A/C" },
    { valueName: "auctionAOrC", type: "text", label: "Auction A/C" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "weight", type: "text", label: "Weight" },
    { valueName: "bardana", type: "text", label: "Bardana" },
    { valueName: "rateUnit", type: "text", label: "Rate Unit" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "volumeDiscount", type: "text", label: "Volume Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
  ],
  name: "Mandi",
};

export const mobileFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },

    { valueName: "rackNumber", type: "text", label: "Rack No." },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: " Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "company", type: "text", label: "Company" },
    { valueName: "industry", type: "text", label: "Industry" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "volumeDiscount", type: "text", label: "Volume Discount" },
    { valueName: "onQuantityVol", type: "text", label: "On Quantity" },
    { valueName: "discount", type: "text", label: "Discount" },
    { valueName: "specialDiscount", type: "text", label: "Special Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "imei", type: "text", label: "IMEI" },
  ],
  name: "Mobile",
};

export const pharmaManuFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },
    { valueName: "code", type: "text", label: "Code" },

    { valueName: "packing", type: "text", label: "Packing" },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: " Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "company", type: "text", label: "Company" },
    { valueName: "salt", type: "text", label: "Salt" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "cess", type: "text", label: "CESS" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "volumeDiscount", type: "text", label: "Volume Discount" },
    { valueName: "onQuantityVol", type: "text", label: "On Quantity" },
    { valueName: "specialDiscount", type: "text", label: "Special Discount" },
    { valueName: "onQuantity", type: "text", label: "On Quantity" },
    { valueName: "discount", type: "text", label: "Discount" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "freeScheme", type: "text", label: "Free Scheme" },
    { valueName: "validFrom", type: "text", label: "Valid From" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "narcotic", type: "text", label: "Narcotic" },
    { valueName: "scheduleH", type: "text", label: "Schedule H" },
    { valueName: "scheduleH1", type: "text", label: "Schedule H1" },
  ],
  name: "Pharma Manufacturing",
};

export const plywoodFields = {
  topFields: [
    { valueName: "product", type: ["text"], label: "Product", required: true },
    { valueName: "status", type: "text", label: "Status" },
    { valueName: "type", type: "text", label: "Type" },
    { valueName: "hide", type: "text", label: "Hide" },

    { valueName: "rackNumber", type: "text", label: "Rack No." },
    { valueName: "unit", type: "text", label: "Unit" },
    { valueName: "decimal", type: "text", label: "Decimal" },
    { valueName: "fastSearch", type: "text", label: " Fast Search" },
    { valueName: "colorType", type: "text", label: "Color Type" },
    { valueName: "itemType", type: "text", label: "Item Type" },
    { valueName: "group", type: "text", label: "Group" },
    { valueName: "hsnOrSac", type: "text", label: "HSN/SAC" },
  ],
  bottomFields: [
    { valueName: "local", type: "text", label: "Local" },
    { valueName: "sgst", type: "text", label: "SGST %" },
    { valueName: "cgst", type: "text", label: "CGST %" },
    { valueName: "central", type: "text", label: "Central" },
    { valueName: "igst", type: "text", label: "IGST" },
    { valueName: "mrp", type: "text", label: "M.R.P." },
    { valueName: "pRate", type: "text", label: "P. RATE" },
    { valueName: "cost", type: "text", label: "Cost" },
    { valueName: "rateA", type: "text", label: "RATE A" },
    { valueName: "rateB", type: "text", label: "RATE B" },
    { valueName: "rateC", type: "text", label: "RATE C" },
    { valueName: "convBox", type: "text", label: "CONV. BOX" },
    { valueName: "convCas", type: "text", label: "CONV. CAS" },
    { valueName: "negativity", type: "text", label: "Negativity" },
    { valueName: "minQty", type: "text", label: "Min Qty" },
    { valueName: "maxQty", type: "text", label: "Max Qty" },
    { valueName: "reorderQty", type: "text", label: "Reorder Qty" },
    { valueName: "days", type: "text", label: "Days" },
    { valueName: "maxDiscount", type: "text", label: "Max Discount" },
    { valueName: "purcDisc", type: "text", label: "Purc Disc" },
    { valueName: "f6Rate", type: "text", label: "F6RATE" },
    { valueName: "minMargin", type: "text", label: "Min Margin" },
    { valueName: "discLess", type: "text", label: "Disc Less" },
    { valueName: "id", type: "text", label: "ID" },
  ],
  name: "PlyWood",
};

export const ledgerFields = [
  {
    valueName: "ledgerName",
    type: "text",
    // options: ["yes", "no"],
    label: "Ledger Name",
    required: true,
  },
  { valueName: "Station", type: "text", label: "Station" },
  {
    valueName: "accountGroup",
    type: "dropdown",
    options: [
      "Bank Accounts",
      "Bank OCC A/C",
      "Branch/Divisions",
      "Capital Account",
      "Capital work-in-progress",
      "Cash-in-hand",
      "Current Assets",
      "Current Investments",
      "Current Liabilities",
      "Deferred Tax Asset",
      "Deferred Tax Liability",
      "Duties & Taxes",
      "Employee Benefit Expense",
      "Exceptional Items",
      "Expenditure Account",
      "Expenses(Direct) (Mfg./Trgd. Expenses)",
    ],
    label: "Account Group",
    required: true,
  },
  {
    valueName: "balancingMethod",
    type: "dropdown",
    options: ["Bill by bill", "FIFO base", "On Account"],
    label: "Balancing Method",
    required: true,
  },
  { valueName: "opening", type: "number", label: "Opening", required: true },
  { valueName: "mailTo", type: "text", label: "Mail To" },
  { valueName: "address", type: "text", label: "Address" },
  { valueName: "pinCode", type: "number", label: "Pin Code", required: true },
  { valueName: "email", type: "email", label: "E-MAIL", required: true },
  { valueName: "website", type: "text", label: "Web Site" },
  { valueName: "contactPerson", type: "text", label: "Contact Person" },
  { valueName: "designation", type: "text", label: "Designation" },
  {
    valueName: "phoneNumberOffice",
    type: "number",
    label: "Phone Number(Off)",
    required: true,
  },
  {
    valueName: "phoneNumberResidence",
    type: "number",
    label: "Phone Number(Res)",
  },
  // {
  //   valueName: "mobile",
  //   type: "modal",
  //   label: "Mobile No.",
  //   labels: [
  //     { label: "mobile number 1", type: "number" },
  //     { label: "mobile number 2", type: "number" },
  //     { label: "mobile number 3", type: "number" },
  //     { label: "mobile number 4", type: "number" },
  //   ],
  // },
  { valueName: "mobile", type: "number", label: "Mobile No." },
  { valueName: "faxNumber", type: "number", label: "Fax No." },
  { valueName: "freezUpto", type: "text", label: "Freez Upto" },
  { valueName: "dlNumber", type: "number", label: "D.L. No." },
  // { valueName: "gstNumber", type: "text", label: "GST No." },
  // { valueName: "vatNumber", type: "text", label: "VAT No." },
  // { valueName: "stNumber", type: "text", label: "S.T. No." },
  // { valueName: "foodHeading", type: "text", label: "Food Heading" },
  // { valueName: "extraHeading", type: "text", label: "Extra Heading" },
  {
    valueName: "itPanNumber",
    type: "number",
    label: "I.T. PAN No.",
    required: true,
  },
  // { valueName: "billExportOn", type: "text", label: "Bill Export On" },
  // { valueName: "eCode", type: "text", label: "E.Code" },
  // { valueName: "password", type: "text", label: "Password" },
  {
    valueName: "ledgerCategory",
    type: "dropdown",
    options: ["Retailers", "Stockist", "Distributors", "Others"],
    label: "Ledger Category",
    required: true,
  },
  // { valueName: "color", type: "text", label: "Color" },
  {
    valueName: "state",
    type: "dropdown",
    options: [
      "Andaman & Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra & Nagar Haveli & Daman & Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu & Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odhisha",
      "Punjab",
      "PuduCherry",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ],
    label: "State",
    required: true,
  },
  {
    valueName: "country",
    type: "dropdown",
    options: ["India"],
    label: "Country",
    required: true,
  },
  {
    valueName: "ledgerType",
    type: "dropdown",
    options: [
      "Registered",
      "Unregistered",
      "Composition",
      "SEZ",
      "RCM compulsory",
      "GST Reversal",
      "Related",
      "UIN Holder",
      "Prohibited",
    ],
    label: "Ledger Type",
    required: true,
  },
  // { valueName: "eccCodeNumber", type: "text", label: "ECC Code No." },
  // {
  //   valueName: "exciseRegistrationNumber",
  //   type: "text",
  //   label: "Excise Reg No.",
  // },
  // { valueName: "iecCode", type: "text", label: "IEC Code" },
  // { valueName: "range", type: "text", label: "Range" },
  // { valueName: "division", type: "text", label: "Division" },
  // { valueName: "commissionRate", type: "text", label: "Commission Rate" },
  // { valueName: "panNumber", type: "text", label: "PAN No." },
  // { valueName: "companyName", type: "text", label: "Company Name" },
  // { valueName: "address", type: "text", label: "Address" },
  // { valueName: "companyType", type: "text", label: "Company Type" },
  // { valueName: "regdOffPhone", type: "text", label: "Regd.Off.Address" },
  // { valueName: "workOffAddress", type: "text", label: "Work Off.Address" },
  // { valueName: "workOffPhone", type: "text", label: "Work Off.Phone" },
  // { valueName: "directorA", type: "text", label: "Director (A)" },
  // { valueName: "phoneA", type: "text", label: "Phone" },
  // { valueName: "residenceAddressA", type: "text", label: "Res.Address" },

  // { valueName: "directorB", type: "text", label: "Director (B)" },
  // { valueName: "phoneB", type: "text", label: "Phone" },
  // { valueName: "residenceAddressB", type: "text", label: "Res.Address" },

  // { valueName: "directorC", type: "text", label: "Director (C)" },
  // { valueName: "phoneC", type: "text", label: "Phone" },
  // { valueName: "residenceAddressC", type: "text", label: "Res.Address" },

  // { valueName: "directorC", type: "text", label: "Director (C)" },
  // { valueName: "phoneC", type: "text", label: "Phone" },
  // { valueName: "residenceAddressC", type: "text", label: "Res.Address" },
  // { valueName: "directorC", type: "text", label: "Director (C)" },
  // { valueName: "phoneC", type: "text", label: "Phone" },
  // { valueName: "residenceAddressC", type: "text", label: "Res.Address" },
  // { valueName: "directorC", type: "text", label: "Director (C)" },
  // { valueName: "phoneC", type: "text", label: "Phone" },
  // { valueName: "residenceAddressC", type: "text", label: "Res.Address" },
  // { valueName: "accountGroup", type: "text", label: "Account Group" },
  // { valueName: "bankAccountNumber", type: "text", label: "Bank Account No." },
  // { valueName: "bankName", type: "text", label: "Bank Name" },
  // { valueName: "bankBranchName", type: "text", label: "Bank Branch Name" },
  // { valueName: "bankCity", type: "text", label: "Bank City" },
  // { valueName: "ifscCode", type: "text", label: "IFSC Code" },
  // { valueName: "micrCode", type: "text", label: "MICR Code" },
  // {
  //   valueName: "accountHolderName",
  //   type: "text",
  //   label: "Acc. Holder Name",
  // },
  // { valueName: "address", type: "text", label: "Address" },
  // { valueName: "address", type: "text", label: "Address" },
  // { valueName: "address", type: "text", label: "Address" },
];
