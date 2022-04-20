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
import UsersData from "layouts/applications/data-tables/data/UsersData";

function Users() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <Card>
          <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
            <SuiBox>
              <SuiTypography variant="h5" fontWeight="medium">
                Users List
              </SuiTypography>
            </SuiBox>
            <SuiBox>
              <Link to="/user-management/new-user">
                <SuiButton variant="gradient" color="success">
                  Add User
                </SuiButton>
              </Link>
            </SuiBox>
          </SuiBox>
          <DataTable table={UsersData} canSearch />
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
