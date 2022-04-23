import "main.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Link } from "react-router-dom";

function NewPatient() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Patient Information</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="name" placeholder="eg. John Doe" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="father name" placeholder="eg. Patrick Doe" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Gender
                          </SuiTypography>
                        </SuiBox>
                        <SuiSelect
                          defaultValue={{ value: "Male", label: "Male" }}
                          options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                            { value: "RatherNotSay", label: "Rather Not Say" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="number" label="age" placeholder="eg. 25" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="number" label="weight (Kg)" placeholder="eg. 75" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="height X'X''" placeholder="eg. 5,6" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="phone" placeholder="eg. 03XX-XXXXXXX" />
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <Link to="/patients">
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

export default NewPatient;
