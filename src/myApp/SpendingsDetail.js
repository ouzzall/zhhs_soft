import "main.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewProduct page components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import SpendingsData from "layouts/applications/data-tables/data/SpendingsData";

function SpendingsDetail() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
                <SuiBox>
                  <SuiTypography variant="h5" fontWeight="medium">
                    Spendings Detail
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
              <DataTable table={SpendingsData} canSearch />
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SpendingsDetail;
