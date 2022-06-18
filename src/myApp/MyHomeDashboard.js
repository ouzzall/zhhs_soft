import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

// Images
import { Card } from "@mui/material";
import SuiButton from "components/SuiButton";
import DataTable from "examples/Tables/DataTable";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
// import WeatherCard from "examples/Cards/WeatherCard";
// import iconSunCloud from "assets/images/small-logos/icon-sun-cloud.png";

import { Oval } from "react-loader-spinner";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setShelfList, setSelfList } from "redux/patMedicines";
import { setReports } from "redux/patReports";
import { setId } from "redux/patId";
import { setDiagnosis } from "redux/patDiagnosis";
import { useHistory } from "react-router-dom";

function MyHomeDashboard() {
  // console.log("HELLO FROM CONSOLE");

  const dispatch = useDispatch();
  const history = useHistory();

  function actionHandle() {
    dispatch(setShelfList([]));
    dispatch(setSelfList([]));
    dispatch(setId(0));
    dispatch(
      setDiagnosis(
        "<p><strong>Weight: <u>___________</u> Blood Pressure: <u>__________</u> Sugar: <u>_____________</u></strong></p><p><br></p><p><strong>Symptoms:</strong></p><p><br></p><p><strong>Findings:</strong></p><p><br></p><p><strong>Care:</strong></p><p><br></p><p><strong>Suggestions:</strong></p><p><br></p><p><br></p><p><strong><em><u>By: Hakeem M. Ashraf</u></em></strong></p>"
      )
    );
    dispatch(setReports([]));
    history.push("/check-ups/new-check-up");
  }

  const [checkData, setCheckData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/my-dashboard`, {
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
        setCheckData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setCheckData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/my-dashboard`]);

  let useData = "";
  let chartData = "";

  function handleDelete(e) {
    // console.log(e);

    const sendId = new URLSearchParams({ id: e }).toString();

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
          setCheckData(null);
          fetch(`https://zahidhd.tk/zahidhd/api/check-ups/delete?${sendId}`, {
            method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
          })
            .then((response) => response.json())
            .then((resultIn) => {
              // console.log(resultIn);
              setCheckData(resultIn.data);
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

  if (checkData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    checkData[0].forEach((element) => {
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
        { Header: "PATIENT NAME", accessor: "name" },
        { Header: "PATIENT PHONE", accessor: "phone" },
        { Header: "CHECK-UP DATE", accessor: "created_at" },
        { Header: "CHECK-UP COST", accessor: "check_up_price" },
        { Header: "BILL", accessor: "bill" },
        { Header: "PRESCRIPTION", accessor: "prescription" },
        { Header: "ACTION", accessor: "action" },
      ],
      rows: checkData[0],
    };

    // console.log(medData);
  }

  if (checkData) {
    chartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Patients",
          color: "info",
          data: checkData[2],
        },
        {
          label: "Walking Customers",
          color: "dark",
          data: checkData[3],
        },
      ],
    };
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3}>
        <SuiBox mb={3}>
          {checkData && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <GradientLineChart title="Success of Sales" chart={chartData} />
              </Grid>
              <Grid item xs={12} xl={5}>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12}>
                  <WeatherCard
                    title="weather today"
                    weather={{ location: "San Francisco", degree: 29 }}
                    icon={{ component: iconSunCloud, text: "cloudy" }}
                  />
                </Grid> */}
                  <Grid item xs={12} md={6}>
                    <DefaultCounterCard
                      count={checkData[1][0]}
                      // suffix={<>&deg;C</>}
                      title="Medicines"
                      // description="temperature"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DefaultCounterCard
                      count={checkData[1][1]}
                      // suffix="%"
                      title="Patients"
                      // description="humidity"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DefaultCounterCard
                      count={checkData[1][2]}
                      // suffix="m³"
                      title="Check Ups"
                      // description="consumption"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DefaultCounterCard
                      count={checkData[1][3]}
                      // suffix="GB"
                      title="Walking Customers"
                      // description="all devices"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </SuiBox>
      </SuiBox>
      <SuiBox my={6} width="100%">
        <Divider />
      </SuiBox>
      <SuiBox pb={3}>
        <Card>
          <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
            <SuiBox>
              <SuiTypography variant="h5" fontWeight="medium">
                Check Ups List
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
              <SuiBox p={3} pb={15}>
                <Oval color="#74c40e" height={80} width={80} />
              </SuiBox>
            </Grid>
          )}
          {checkData && <DataTable table={useData} canSearch />}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyHomeDashboard;
