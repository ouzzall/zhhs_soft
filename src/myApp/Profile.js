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

import { useDispatch } from "react-redux";
import { setShelfList, setSelfList } from "redux/patMedicines";
import { setReports } from "redux/patReports";
import { setId, setFeeGlobal, setCheckUpCostGlobal, setDiscountGlobal } from "redux/patId";
import { setDiagnosis } from "redux/patDiagnosis";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";

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
    dispatch(setFeeGlobal(0));
    dispatch(setCheckUpCostGlobal(0));
    dispatch(setDiscountGlobal(0));
    dispatch(
      setDiagnosis(
        "<p><strong>Weight: <u>___________</u> Blood Pressure: <u>__________</u> Sugar: <u>_____________</u></strong></p><p><br></p><p><strong>Symptoms:</strong></p><p><br></p><p><strong>Findings:</strong></p><p><br></p><p><strong>Care:</strong></p><p><br></p><p><strong>Suggestions:</strong></p><p><br></p><p><br></p><p><strong><em><u>By: Hakeem M. Ashraf</u></em></strong></p>"
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

  let useData = "";

  function handleDelete(e) {
    // console.log(e);

    const sendId2 = new URLSearchParams({ id: e }).toString();

    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: "button button-success",
        cancelButton: "button button-error",
      },
      buttonsStyling: false,
    });

    newSwal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          setIsPending(true);
          setGetData(null);
          fetch(`http://localhost/zhhs_soft_server/api/check-ups/profile/delete?${sendId2}`, {
            method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
          })
            .then((response) => response.json())
            .then((resultIn) => {
              // console.log(resultIn);
              setGetData(resultIn.data);
              setIsPending(false);
              setError(false);
            });
          Swal.fire("Deleted!", "Check up has been deleted.", "success");
          // console.log(medicinesData);
        }
      });
  }

  function handleBill(e) {
    // console.log(e);
    history.push(`/check-ups/patient-bill`, { id: e });
  }

  function handlePrescription(e) {
    // console.log(e);
    history.push(`/check-ups/patient-prescription`, { id: e });
  }

  if (getData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    getData[1].forEach((element) => {
      element.action = (
        <SuiBox ml={1}>
          <SuiTypography
            variant="body1"
            color="secondary"
            sx={{ cursor: "pointer", lineHeight: 0 }}
          >
            <Tooltip
              title="Delete Patient"
              placement="left"
              onClick={() => handleDelete(element.id)}
            >
              <Icon>delete</Icon>
            </Tooltip>
          </SuiTypography>
        </SuiBox>
      );

      element.bill = (
        <SuiButton
          variant="gradient"
          onClick={() => handleBill(element.id)}
          size="small"
          color="info"
        >
          View
        </SuiButton>
      );

      element.prescription = (
        <SuiButton
          variant="gradient"
          onClick={() => handlePrescription(element.id)}
          size="small"
          color="info"
        >
          View
        </SuiButton>
      );
      // console.log(element);
    });

    useData = {
      columns: [
        { Header: "ID", accessor: "id" },
        { Header: "CHECK-UP DATE", accessor: "created_at", width: "25%" },
        { Header: "MEDICINE COST", accessor: "check_up_price" },
        { Header: "BILL", accessor: "bill" },
        { Header: "PRESCRIPTION", accessor: "prescription" },
        { Header: "ACTION", accessor: "action" },
      ],
      rows: getData[1],
    };

    // console.log(medData);
  }

  return (
    <DashboardLayout>
      {getData && <Header name={getData[0].name} />}
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
                  name: getData[0].name,
                  fatherName: getData[0].father_name,
                  gender: getData[0].gender,
                  age: getData[0].age,
                  weight: getData[0].weight,
                  height: getData[0].height,
                  phone: getData[0].phone,
                }}
                action={{ route: getData[0].id, tooltip: "Edit Profile" }}
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
                </SuiBox>
                <SuiBox>
                  <SuiButton variant="gradient" color="success" onClick={actionHandle}>
                    New Check Up
                  </SuiButton>
                </SuiBox>
              </SuiBox>
              {errorL && (
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <SuiBox p={3} pb={15}>
                    {errorL}
                  </SuiBox>
                </Grid>
              )}
              {isPending && (
                <Grid container direction="row" justifyContent="center" alignItems="center">
                  <SuiBox pt={3} pb={15}>
                    <Oval color="#74c40e" height={80} width={80} />
                  </SuiBox>
                </Grid>
              )}
              {getData && <DataTable table={useData} canSearch />}
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
