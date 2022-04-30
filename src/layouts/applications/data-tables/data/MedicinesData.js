import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";

export default {
  columns: [
    { Header: "MEDICINE NAME", accessor: "mName", width: "25%" },
    { Header: "MEDICINE TYPE", accessor: "mType", width: "20%" },
    { Header: "MEDICINE EXPIRY", accessor: "mExpiry" },
    { Header: "MEDICINE COUNT", accessor: "mCount" },
    { Header: "MEDICINE PRICE (Rs)", accessor: "mPrice" },
    { Header: "ACTION", accessor: "pCheck", width: "9%" },
  ],

  rows: [
    {
      mName: "Panadol",
      mType: "Shelf",
      mExpiry: "4/11/2021",
      mCount: 42,
      mPrice: "20",
      pCheck: <ActionCell />,
    },
  ],
};
