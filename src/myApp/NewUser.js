import "main.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from "react-router-dom";

function NewUser() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={30}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">User Information</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="name" placeholder="eg. John Doe" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="password" placeholder="" />
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <Link to="/user-management">
                    <SuiButton variant="gradient" color="success">
                      Add
                    </SuiButton>
                  </Link>
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

export default NewUser;
