// @mui material components
import Card from "@mui/material/Card";
import { useHistory } from "react-router-dom";

import "main.css";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import SuiButton from "components/SuiButton";
import { Grid } from "@mui/material";

import SuiDatePicker from "components/SuiDatePicker";
import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import defaultDoughnutChartData from "layouts/pages/charts/data/defaultDoughnutChartData";
import OutlinedCounterCard from "examples/Cards/CounterCards/OutlinedCounterCard";

function CostEstimation() {
  const history = useHistory();

  function firstClick() {
    // console.log("hello");
    history.push("/cost-estimation/spendings-detail");
  }
  function secondClick() {
    // console.log("hello");
    history.push("/cost-estimation/patients-output");
  }
  function thirdClick() {
    // console.log("hello");
    history.push("/cost-estimation/walking-output");
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <SuiBox>
              <Card>
                <SuiBox pt={2} px={3}>
                  <SuiTypography variant="h5" fontWeight="medium">
                    Refine Search
                  </SuiTypography>
                </SuiBox>
                <SuiBox pt={1} px={3}>
                  <SuiDatePicker input={{ placeholder: "Start Date" }} className="date_width" />
                </SuiBox>
                <SuiBox pt={1} px={3}>
                  <SuiDatePicker input={{ placeholder: "End Date" }} className="date_width" />
                </SuiBox>
                <SuiBox pt={1} px={3}>
                  <SuiButton variant="gradient" color="success">
                    Filter
                  </SuiButton>
                </SuiBox>
                <SuiBox pt={0} px={1}>
                  <DefaultDoughnutChart chart={defaultDoughnutChartData} />
                </SuiBox>
              </Card>
            </SuiBox>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Card>
              <SuiBox pt={2} px={3}>
                <SuiTypography variant="h5" fontWeight="medium">
                  Cost Estimation
                </SuiTypography>
              </SuiBox>
              <SuiBox p={3} pt={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12} onClick={firstClick}>
                    <OutlinedCounterCard count={24637} prefix="Rs." title="Total Spendings" />
                  </Grid>
                  <Grid item xs={12} lg={12} onClick={secondClick}>
                    <OutlinedCounterCard count={23534} prefix="Rs." title="Patients Output" />
                  </Grid>
                  <Grid item xs={12} lg={12} onClick={thirdClick}>
                    <OutlinedCounterCard count={11343} prefix="Rs." title="Walking Output" />
                  </Grid>
                  <Grid item xs={12} lg={12}>
                    <OutlinedCounterCard count={10240} prefix="Rs." title="Total Profit" />
                  </Grid>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CostEstimation;
