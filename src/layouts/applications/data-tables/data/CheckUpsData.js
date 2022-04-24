import SuiButton from "components/SuiButton";
import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";
import { Link } from "react-router-dom";

export default {
  columns: [
    { Header: "CHECK-UP DATE", accessor: "cDate", width: "25%" },
    { Header: "MEDICINE DAYS", accessor: "cDays", width: "20%" },
    { Header: "MEDICINE COST", accessor: "cCost" },
    { Header: "BILL", accessor: "cBtn1" },
    { Header: "PRESCRIPTION", accessor: "cBtn2" },
    { Header: "ACTION", accessor: "cCheck" },
  ],

  rows: [
    {
      cDate: "18/04/2022",
      cDays: "25",
      cCost: "2500",
      cBtn1: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cBtn2: (
        <Link to="/patients/profile/patient-prescription">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cCheck: <ActionCell />,
    },
    {
      cDate: "23/01/2022",
      cDays: "30",
      cCost: "3000",
      cBtn1: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cBtn2: (
        <Link to="/patients/profile/patient-prescription">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cCheck: <ActionCell />,
    },
    {
      cDate: "23/12/2021",
      cDays: "15",
      cCost: "1700",
      cBtn1: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cBtn2: (
        <Link to="/patients/profile/patient-prescription">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cCheck: <ActionCell />,
    },
    {
      cDate: "12/09/2021",
      cDays: "45",
      cCost: "3500",
      cBtn1: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cBtn2: (
        <Link to="/patients/profile/patient-prescription">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cCheck: <ActionCell />,
    },
    {
      cDate: "14/07/2021",
      cDays: "15",
      cCost: "2500",
      cBtn1: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cBtn2: (
        <Link to="/patients/profile/patient-prescription">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cCheck: <ActionCell />,
    },
    {
      cDate: "12/06/2021",
      cDays: "20",
      cCost: "400",
      cBtn1: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cBtn2: (
        <Link to="/patients/profile/patient-prescription">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cCheck: <ActionCell />,
    },
    {
      cDate: "23/03/2021",
      cDays: "18",
      cCost: "2300",
      cBtn1: (
        <Link to="/patients/profile/patient-bill">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cBtn2: (
        <Link to="/patients/profile/patient-prescription">
          <SuiButton variant="gradient" size="small" color="info">
            View
          </SuiButton>
        </Link>
      ),
      cCheck: <ActionCell />,
    },
  ],
};
