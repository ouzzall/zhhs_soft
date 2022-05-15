import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/pages/profile/components/Header";
import { Card } from "@mui/material";
import SuiTypography from "components/SuiTypography";
import DataTable from "examples/Tables/DataTable";
import SuiButton from "components/SuiButton";
import CheckUpsData from "layouts/applications/data-tables/data/CheckUpsData";

import { useDispatch } from "react-redux";
import { setShelfList, setSelfList, setId, setDiagnosis, setReports } from "redux/patMedicines";
import { useHistory } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  function actionHandle() {
    dispatch(setShelfList([]));
    dispatch(setSelfList([]));
    dispatch(setId(0));
    dispatch(setDiagnosis(""));
    dispatch(setReports([]));
    history.push("/check-ups/new-check-up");
  }

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Anas Asharf. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ipsum mauris, efficitur placerat purus in, semper rutrum tellus. Aenean vel hendrerit odio. Maecenas in dolor lorem."
              info={{
                fullName: "Muhammad Anas Ashraf",
                mobile: "03214569789",
                email: "anas@mail.com",
                location: "Pakistan",
              }}
              social={[
                {
                  link: "#",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "#",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "#",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={8} xl={8}>
            <Card>
              <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
                <SuiBox>
                  <SuiTypography variant="h5" fontWeight="medium">
                    Previous Check Ups
                  </SuiTypography>
                  {/* <SuiTypography variant="button" fontWeight="regular" color="text">
                There are two types of medicines. 1: Shelf, 2: Self. All of the medicines are
                displayed below.
              </SuiTypography> */}
                </SuiBox>
                <SuiBox>
                  <SuiButton variant="gradient" color="success" onClick={actionHandle}>
                    New Check Up
                  </SuiButton>
                </SuiBox>
              </SuiBox>
              <DataTable table={CheckUpsData} canSearch />
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
