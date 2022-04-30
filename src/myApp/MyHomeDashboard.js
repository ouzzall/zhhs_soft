import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

// Images
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import SuiButton from "components/SuiButton";
import DataTable from "examples/Tables/DataTable";
import PatientsCheckUpsData from "layouts/applications/data-tables/data/PatientsCheckUpsData";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import gradientLineChartData from "layouts/dashboards/default/data/gradientLineChartData";
import WeatherCard from "examples/Cards/WeatherCard";
import iconSunCloud from "assets/images/small-logos/icon-sun-cloud.png";

function MyHomeDashboard() {
  // console.log("HELLO FROM CONSOLE");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3}>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <GradientLineChart title="Success of Sales" chart={gradientLineChartData} />
            </Grid>
            <Grid item xs={12} xl={5}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <WeatherCard
                    title="weather today"
                    weather={{ location: "San Francisco", degree: 29 }}
                    icon={{ component: iconSunCloud, text: "cloudy" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={113}
                    // suffix={<>&deg;C</>}
                    title="Medicines"
                    // description="temperature"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={57}
                    // suffix="%"
                    title="Patients"
                    // description="humidity"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={78}
                    // suffix="m³"
                    title="Check Ups"
                    // description="consumption"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DefaultCounterCard
                    count={197}
                    // suffix="GB"
                    title="Walking Customers"
                    // description="all devices"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox>
      <SuiBox my={6} width="100%">
        <Divider />
      </SuiBox>
      <SuiBox pb={3}>
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
              <Link to="/check-ups/new-check-up">
                <SuiButton variant="gradient" color="success">
                  New Check Up
                </SuiButton>
              </Link>
            </SuiBox>
          </SuiBox>
          <DataTable table={PatientsCheckUpsData} canSearch />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyHomeDashboard;
