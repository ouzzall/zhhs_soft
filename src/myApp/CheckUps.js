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

import SuiButton from "components/SuiButton";
import PatientsCheckUpsData from "layouts/applications/data-tables/data/PatientsCheckUpsData";

import { useDispatch } from "react-redux";
import { setShelfList, setSelfList, setId, setDiagnosis, setReports } from "redux/patMedicines";
import { useHistory } from "react-router-dom";

function CheckUps() {
  const dispatch = useDispatch();
  const history = useHistory();

  function actionHandle() {
    dispatch(setShelfList([]));
    dispatch(setSelfList([]));
    dispatch(setId(0));
    dispatch(setDiagnosis(""));
    dispatch(setReports([]));
    history.push("/check-ups/new-check-up");
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <Card>
          <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
            <SuiBox>
              <SuiTypography variant="h5" fontWeight="medium">
                Check Ups List
              </SuiTypography>
              {/* <SuiTypography variant="button" fontWeight="regular" color="text">
                There are two types of medicines. 1: Shelf, 2: Self. All of the medicines are
                displayed below.
              </SuiTypography> */}
            </SuiBox>
            <SuiBox>
              <SuiButton variant="gradient" color="success" onClick={actionHandle}>
                New Check Up
              </SuiButton>
            </SuiBox>
          </SuiBox>
          <DataTable table={PatientsCheckUpsData} canSearch />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CheckUps;
