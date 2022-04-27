import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";

export default {
  columns: [
    { Header: "ITEM NAME", accessor: "iName" },
    { Header: "ITEM QUANTITY", accessor: "iQuantity" },
    { Header: "ITEM COST", accessor: "iCost" },
    { Header: "ACTION", accessor: "uCheck" },
  ],

  rows: [
    {
      uCheck: <ActionCell />,
      iName: "Kalwangi",
      iQuantity: "500 Grams",
      iCost: "450",
    },
    {
      uCheck: <ActionCell />,
      iName: "Sonf",
      iQuantity: "Adh Pao",
      iCost: "1000",
    },
    {
      uCheck: <ActionCell />,
      iName: "Cheeni",
      iQuantity: "5 Kilo",
      iCost: "350",
    },
    {
      uCheck: <ActionCell />,
      iName: "Jarri Butian",
      iQuantity: "6 Kilo",
      iCost: "2500",
    },
    {
      uCheck: <ActionCell />,
      iName: "Majoon Masala ",
      iQuantity: "3 Pao",
      iCost: "1500",
    },
  ],
};
