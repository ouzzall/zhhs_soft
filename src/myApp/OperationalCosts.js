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
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

import Icon from "@mui/material/Icon";
// Soft UI Dashboard PRO React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import OperationalCostsData from "layouts/applications/data-tables/data/OperationalCostsData";

function OperationalCosts() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SuiBox pt={3} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <SuiBox>
              <Card sx={{ height: "445px" }}>
                <SuiBox pt={3} px={3}>
                  <SuiTypography variant="h6" fontWeight="medium">
                    Last Five Operational Costs
                  </SuiTypography>
                  <SuiBox mt={1} mb={2}>
                    <SuiTypography variant="button" color="text" fontWeight="regular">
                      <SuiTypography display="inline" variant="body2" verticalAlign="middle">
                        <Icon
                          sx={{
                            fontWeight: "bold",
                            color: ({ palette: { success } }) => success.main,
                          }}
                        >
                          arrow_upward
                        </Icon>
                      </SuiTypography>
                      &nbsp;
                      <SuiTypography variant="button" color="text" fontWeight="medium">
                        24
                      </SuiTypography>{" "}
                      Entries this month
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
                <SuiBox p={2}>
                  <TimelineItem
                    color="info"
                    icon="inventory_2"
                    title="Shop Rent"
                    dateTime="26/04/2022"
                  />
                  <TimelineItem
                    color="info"
                    icon="inventory_2"
                    title="Panadol Extra"
                    dateTime="25/04/2022"
                  />
                  <TimelineItem
                    color="info"
                    icon="inventory_2"
                    title="Plastic Bags"
                    dateTime="24/04/2022"
                  />
                  <TimelineItem
                    color="info"
                    icon="inventory_2"
                    title="Employ Fee"
                    dateTime="23/04/2022"
                  />
                  <TimelineItem
                    color="info"
                    icon="inventory_2"
                    title="Kalwanji 500 Grams"
                    dateTime="22/04/2022"
                  />
                </SuiBox>
              </Card>
            </SuiBox>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Card>
              <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
                <SuiBox>
                  <SuiTypography variant="h5" fontWeight="medium">
                    Operational Costs List
                  </SuiTypography>
                  {/* <SuiTypography variant="button" fontWeight="regular" color="text">
                There are two types of medicines. 1: Shelf, 2: Self. All of the medicines are
                displayed below.
              </SuiTypography> */}
                </SuiBox>
                <SuiBox>
                  {/* <Link to="/patients/new-patient">
                <SuiButton variant="gradient" color="success" className="margin_right_cls">
                  Add Item
                </SuiButton>
              </Link> */}
                  <Link to="/operational-costs/new-operational-cost">
                    <SuiButton variant="gradient" color="success">
                      Add Cost
                    </SuiButton>
                  </Link>
                </SuiBox>
              </SuiBox>
              <DataTable table={OperationalCostsData} canSearch />
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OperationalCosts;
