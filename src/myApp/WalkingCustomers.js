// @mui material components
import Card from "@mui/material/Card";

import "main.css";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { useDispatch } from "react-redux";
import { setShelfList, setSelfList } from "redux/patMedicines";
import { useHistory } from "react-router-dom";

import SuiButton from "components/SuiButton";

import PreviousBillData from "layouts/applications/data-tables/data/PreviousBillData";

function WalkingCustomers() {
  const dispatch = useDispatch();
  const history = useHistory();

  function actionHandle() {
    dispatch(setShelfList([]));
    dispatch(setSelfList([]));
    history.push("/walking-customers/new-walking-customer");
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <Card>
          <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
            <SuiBox>
              <SuiTypography variant="h5" fontWeight="medium">
                Previous Bills List
              </SuiTypography>
              {/* <SuiTypography variant="button" fontWeight="regular" color="text">
                There are two types of medicines. 1: Shelf, 2: Self. All of the medicines are
                displayed below.
              </SuiTypography> */}
            </SuiBox>
            <SuiBox>
              <SuiButton variant="gradient" color="success" onClick={actionHandle}>
                New Customer
              </SuiButton>
            </SuiBox>
          </SuiBox>
          <DataTable table={PreviousBillData} canSearch />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WalkingCustomers;
