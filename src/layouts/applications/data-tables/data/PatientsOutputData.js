import SuiButton from "components/SuiButton";
import ActionCell from "layouts/ecommerce/products/products-list/components/ActionCell";
import { Link } from "react-router-dom";

export default {
  columns: [
    { Header: "PATIENT NAME", accessor: "cName" },
    { Header: "CHECK-UP DATE", accessor: "cDate" },
    { Header: "MEDICINE COST", accessor: "cCost" },
  ],

  rows: [
    {
      cName: "Hamza Ilyas",
      cPhone: "03212483948",
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
      cName: "Waheeda Rehman",
      cPhone: "03232434344",
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
      cName: "Manzoor Pashtin",
      cPhone: "03214564645",
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
      cName: "Jam Safdar",
      cPhone: "03212423553",
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
      cName: "Malik Riaz",
      cPhone: "03213243434",
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
      cName: "Azeem Rahnuma",
      cPhone: "042134234234",
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
      cName: "Mannan Malik",
      cPhone: "0321435459",
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
