import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";

export default {
  columns: [
    { Header: "NAME", accessor: "pName", width: "18%" },
    { Header: "FATHER NAME", accessor: "pFName", width: "18%" },
    { Header: "AGE", accessor: "pAge" },
    { Header: "GENDER", accessor: "pGender" },
    { Header: "WEIGHT (Kg)", accessor: "pWeight" },
    { Header: "HEIGHT", accessor: "pHeight" },
    { Header: "PHONE", accessor: "pPhone" },
    { Header: "ACTION", accessor: "pCheck", width: "9%" },
  ],

  rows: [
    {
      pCheck: <ActionCell />,
      pName: "Mushtaq Bhatti",
      pFName: "Hussain Bhatii",
      pAge: "35",
      pGender: "Male",
      pWeight: "82",
      pHeight: "5'6''",
      pPhone: "0321456789",
    },

    {
      pCheck: <ActionCell />,
      pName: "Mustansir Billa",
      pFName: "Mansoor Billa",
      pAge: "25",
      pGender: "Male",
      pWeight: "92",
      pHeight: "6'2''",
      pPhone: "0322404343",
    },
    {
      pCheck: <ActionCell />,
      pName: "Sana Bucha",
      pFName: "Shaffiq Bucha",
      pAge: "18",
      pGender: "Female",
      pWeight: "47",
      pHeight: "5'8''",
      pPhone: "0321312323",
    },
    {
      pCheck: <ActionCell />,
      pName: "Ahmad Munir",
      pFName: "Munir Ahmed",
      pAge: "18",
      pGender: "Male",
      pWeight: "55",
      pHeight: "5'9''",
      pPhone: "0345232423",
    },
  ],
};
