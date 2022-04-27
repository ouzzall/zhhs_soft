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

function NewOperationalCost() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={5}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Item Cost Information</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Item Name
                          </SuiTypography>
                        </SuiBox>
                        <SuiSelect
                          defaultValue={{ value: "Shop Rent", label: "Shop Rent" }}
                          options={[
                            { value: "Shop Rent", label: "Shop Rent" },
                            { value: "Ajwayen", label: "Ajwayen" },
                            { value: "Jarri Butian", label: "Jarri Butian" },
                            { value: "Sonf", label: "Sonf" },
                            { value: "Kacha Badam", label: "Kacha Badam" },
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="item cost" placeholder="eg. 500" />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="item quantity (Mix)"
                          placeholder="eg. 1 Pao"
                        />
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <Link to="/medicines">
                    <SuiButton variant="gradient" color="success">
                      Add
                    </SuiButton>
                  </Link>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Manage Items</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            All Items List
                          </SuiTypography>
                        </SuiBox>
                        <SuiSelect
                          defaultValue={{ value: "Shop Rent", label: "Shop Rent" }}
                          options={[
                            { value: "Shop Rent", label: "Shop Rent" },
                            { value: "Ajwayen", label: "Ajwayen" },
                            { value: "Jarri Butian", label: "Jarri Butian" },
                            { value: "Sonf", label: "Sonf" },
                            { value: "Kacha Badam", label: "Kacha Badam" },
                          ]}
                        />
                        <SuiTypography
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          Hint: Select Item to Delete.
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField type="text" label="new item name" placeholder="eg. Kalwanji" />
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <Link to="/medicines">
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

export default NewOperationalCost;
