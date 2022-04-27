import SuiButton from "components/SuiButton";
import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";
import { Link } from "react-router-dom";

export default {
  columns: [
    { Header: "BILL ID", accessor: "bId" },
    { Header: "BILL DATE", accessor: "bDate" },
    { Header: "VIEW BILL", accessor: "bView" },
    { Header: "ACTION", accessor: "bAction" },
  ],

  rows: [
    {
      bId: "1",
      bDate: "4/11/2021",
      bView: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      bAction: <ActionCell />,
    },
    {
      bId: "2",
      bDate: "5/11/2021",
      bView: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      bAction: <ActionCell />,
    },
    {
      bId: "3",
      bDate: "6/11/2021",
      bView: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      bAction: <ActionCell />,
    },
    {
      bId: "4",
      bDate: "7/11/2021",
      bView: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      bAction: <ActionCell />,
    },
    {
      bId: "5",
      bDate: "8/11/2021",
      bView: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      bAction: <ActionCell />,
    },
  ],
};
