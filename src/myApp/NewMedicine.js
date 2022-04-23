import "main.css";
import { useState } from "react";

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

function NewMedicine() {
  const [moreOption, setMoreOption] = useState(true);

  function handleChange(e) {
    // console.log(e.value);
    if (e.value === "Shelf") {
      setMoreOption(true);
    } else {
      setMoreOption(false);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={5}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Medicine Information</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="name"
                          placeholder="eg. Entamizole DS 500 mg"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                          <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            textTransform="capitalize"
                          >
                            Medicine Type
                          </SuiTypography>
                        </SuiBox>
                        <SuiSelect
                          defaultValue={{ value: "Shelf", label: "Shelf" }}
                          options={[
                            { value: "Shelf", label: "Shelf" },
                            { value: "Self", label: "Self" },
                          ]}
                          onChange={handleChange}
                        />
                      </Grid>
                      {moreOption && (
                        <Grid item xs={12} sm={6}>
                          <FormField type="number" label="price" placeholder="eg. 1500" />
                        </Grid>
                      )}
                      {moreOption && (
                        <Grid item xs={12} sm={6}>
                          <FormField type="date" label="expiry date" placeholder="eg. DD/MM/YYYY" />
                        </Grid>
                      )}
                      {moreOption && (
                        <Grid item xs={12} sm={6}>
                          <FormField type="number" label="count" placeholder="eg. 300" />
                        </Grid>
                      )}
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

export default NewMedicine;
