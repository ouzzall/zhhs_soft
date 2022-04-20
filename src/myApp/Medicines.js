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

import MedicinesData from "layouts/applications/data-tables/data/MedicinesData";

import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SuiButton from "components/SuiButton";
import { Link } from "react-router-dom";

function Medicines() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <SuiBox>
          <Grid item xs={12} lg={7}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Shelf Count", fontWeight: "bold" }}
                    count="656"
                    // percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "success", component: "fa-solid fa-pills" }}
                  />
                </SuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Self Count", fontWeight: "bold" }}
                    count="130"
                    // percentage={{ color: "success", text: "+3%" }}
                    icon={{ color: "success", component: "fa-solid fa-hand-holding-medical" }}
                  />
                </SuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Total Count", fontWeight: "bold" }}
                    count="686"
                    // percentage={{ color: "error", text: "-2%" }}
                    icon={{ color: "success", component: "fa-solid fa-house-medical-circle-check" }}
                  />
                </SuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Revenue", fontWeight: "bold" }}
                    count="45613"
                    // percentage={{ color: "success", text: "" }}
                    icon={{
                      color: "success",
                      component: "fa-solid fa-circle-dollar-to-slot",
                    }}
                  />
                </SuiBox>
              </Grid>
            </Grid>
          </Grid>
        </SuiBox>
        <Card>
          <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
            <SuiBox>
              <SuiTypography variant="h5" fontWeight="medium">
                Medicines List
              </SuiTypography>
              {/* <SuiTypography variant="button" fontWeight="regular" color="text">
                There are two types of medicines. 1: Shelf, 2: Self. All of the medicines are
                displayed below.
              </SuiTypography> */}
            </SuiBox>
            <SuiBox>
              <Link to="/medicines/new-medicine">
                <SuiButton variant="gradient" color="success">
                  Add Medicine
                </SuiButton>
              </Link>
            </SuiBox>
          </SuiBox>
          <DataTable table={MedicinesData} canSearch />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Medicines;
