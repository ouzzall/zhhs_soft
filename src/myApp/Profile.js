import Grid from "@mui/material/Grid";

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
import { setShelfList, setSelfList } from "redux/patMedicines";
import { setReports } from "redux/patReports";
import { setId } from "redux/patId";
import { setDiagnosis } from "redux/patDiagnosis";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = history.location.state;
  const sendId = new URLSearchParams({ id }).toString();
  // console.log(id);

  function actionHandle() {
    dispatch(setShelfList([]));
    dispatch(setSelfList([]));
    dispatch(setId(0));
    dispatch(
      setDiagnosis(
        "<p><strong>Symptoms:</strong><br><br><br><strong>Findings:</strong><br><br><br><strong>Care:</strong><br><br><br><strong>Suggestions:</strong><br><br><br><strong><em><u>By: Hakeem M. Ashraf</u></em></strong></p>"
      )
    );
    dispatch(setReports([]));
    history.push("/check-ups/new-check-up");
  }

  const [getData, setGetData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/patients/profile?${sendId}`, {
      // method: "GET",
      // headers: { "content-Type": "application/json" },
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Not Fetching data from server.");
        }
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setGetData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setGetData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`http://localhost/zhhs_soft_server/api/patients/profile?${sendId}`]);

  return (
    <DashboardLayout>
      {getData && <Header name={getData.name} />}
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} xl={4}>
            {errorL && (
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <SuiBox p={3} pb={15}>
                  {errorL}
                </SuiBox>
              </Grid>
            )}
            {isPending && (
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <SuiBox pt={25} pb={15}>
                  <Oval color="#74c40e" height={80} width={80} />
                </SuiBox>
              </Grid>
            )}
            {getData && (
              <ProfileInfoCard
                title="profile information"
                info={{
                  name: getData.name,
                  fatherName: getData.father_name,
                  gender: getData.gender,
                  age: getData.age,
                  weight: getData.weight,
                  height: getData.height,
                  phone: getData.phone,
                }}
                action={{ route: getData.id, tooltip: "Edit Profile" }}
              />
            )}
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
