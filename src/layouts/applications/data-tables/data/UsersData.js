import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";

export default {
  columns: [
    { Header: "NAME", accessor: "uName" },
    { Header: "PASSWORD", accessor: "uPass" },
    { Header: "ACTION", accessor: "uCheck" },
  ],

  rows: [
    {
      uCheck: <ActionCell />,
      uName: "Muhammad Ashraf",
      uPass: "ripazha123",
    },
    {
      uCheck: <ActionCell />,
      uName: "Muhammad Usama Ashraf",
      uPass: "hesoyam123",
    },
    {
      uCheck: <ActionCell />,
      uName: "Muhammad Anas Ashraf",
      uPass: "pdnejoh123",
    },
    {
      uCheck: <ActionCell />,
      uName: "Muhammad Shaffiq",
      uPass: "akjyhgh123",
    },
    {
      uCheck: <ActionCell />,
      uName: "Nazir Bhatti",
      uPass: "hgsssdli123",
    },
  ],
};
