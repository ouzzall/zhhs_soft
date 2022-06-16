// @mui material components
import Card from "@mui/material/Card";
import { useHistory } from "react-router-dom";

import "main.css";
import { Oval } from "react-loader-spinner";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import SuiButton from "components/SuiButton";
import { Grid } from "@mui/material";

import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import OutlinedCounterCard from "examples/Cards/CounterCards/OutlinedCounterCard";
import { useEffect, useState } from "react";
import FormField from "layouts/applications/wizard/components/FormField";

function CostEstimation() {
  const history = useHistory();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let chartData = "";

  function firstClick() {
    // console.log("hello");
    if (startDate && endDate)
      history.push(`/cost-estimation/spendings-detail`, { start: startDate, end: endDate });
    else history.push(`/cost-estimation/spendings-detail`, { start: "", end: "" });
  }
  function secondClick() {
    // console.log("hello");
    if (startDate && endDate)
      history.push(`/cost-estimation/patients-output`, { start: startDate, end: endDate });
    else history.push(`/cost-estimation/patients-output`, { start: "", end: "" });
  }
  function thirdClick() {
    // console.log("hello");
    if (startDate && endDate)
      history.push(`/cost-estimation/walking-output`, { start: startDate, end: endDate });
    else history.push(`/cost-estimation/walking-output`, { start: "", end: "" });
  }
  function fourthClick() {
    // console.log("hello");
    if (startDate && endDate)
      history.push(`/cost-estimation/discount-input`, { start: startDate, end: endDate });
    else history.push(`/cost-estimation/discount-input`, { start: "", end: "" });
  }
  function fiveClick() {
    // console.log("hello");
    if (startDate && endDate)
      history.push(`/cost-estimation/medicine-return`, { start: startDate, end: endDate });
    else history.push(`/cost-estimation/medicine-return`, { start: "", end: "" });
  }

  const sendValues = new URLSearchParams({ start: startDate, end: endDate }).toString();

  const [estimationData, setEstimationData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  if (estimationData) {
    chartData = {
      labels: [
        "Total Spendings",
        "Patients Output",
        "Walking Output",
        // "Total Output",
        "Discounts",
        "Medicine Return",
        "Total Profit",
      ],
      datasets: {
        label: "Cost Estimation",
        backgroundColors: ["primary", "secondary", "dark", "info", "success", "warning"],
        data: [
          estimationData[0],
          estimationData[1],
          estimationData[2],
          estimationData[3],
          estimationData[4],
          // estimationData[1] + estimationData[2],
          estimationData[1] +
            estimationData[2] -
            estimationData[0] -
            estimationData[3] -
            estimationData[4],
        ],
      },
    };

    // console.log(medData);
  }

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/cost-estimation`, {
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
        setEstimationData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setEstimationData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`http://localhost/zhhs_soft_server/api/cost-estimation`]);

  function dateHandler() {
    fetch(`http://localhost/zhhs_soft_server/api/cost-estimation?${sendValues}`, {
      // method: "POST",
      // headers: { "content-Type": "application/json" },
      // body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Not Fetching data from server.");
        }
        return res.json();
      })
      .then((result) => {
        // console.log(result);
        setEstimationData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setEstimationData(null);
          setIsPending(false);
        }
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <SuiBox>
              <Card>
                <SuiBox pt={2} px={3}>
                  <SuiTypography variant="h5" fontWeight="medium">
                    Refine Search
                  </SuiTypography>
                </SuiBox>
                <SuiBox px={3}>
                  <FormField
                    type="date"
                    label="start date"
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="eg. DD/MM/YYYY"
                  />
                </SuiBox>
                <SuiBox px={3}>
                  <FormField
                    type="date"
                    label="end date"
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="eg. DD/MM/YYYY"
                  />
                </SuiBox>
                <SuiBox pt={1} px={3}>
                  <SuiButton variant="gradient" color="success" onClick={dateHandler}>
                    Filter
                  </SuiButton>
                </SuiBox>
                <SuiBox pt={0} px={1}>
                  {errorL && (
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                      <SuiBox p={3} pb={15}>
                        {errorL}
                      </SuiBox>
                    </Grid>
                  )}
                  {isPending && (
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                      <SuiBox pt={15} pb={15}>
                        <Oval color="#74c40e" height={80} width={80} />
                      </SuiBox>
                    </Grid>
                  )}
                  {estimationData && <DefaultDoughnutChart chart={chartData} />}
                </SuiBox>
              </Card>
            </SuiBox>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Card>
              <SuiBox pt={2} px={3}>
                <SuiTypography variant="h5" fontWeight="medium">
                  Cost Estimation
                </SuiTypography>
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
                  <SuiBox pt={15} pb={15}>
                    <Oval color="#74c40e" height={80} width={80} />
                  </SuiBox>
                </Grid>
              )}
              {estimationData && (
                <SuiBox p={3} pt={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} onClick={firstClick}>
                      <OutlinedCounterCard
                        count={estimationData[0]}
                        prefix="Rs."
                        title="Total Spendings"
                      />
                    </Grid>
                    <Grid item xs={12} lg={12} onClick={secondClick}>
                      <OutlinedCounterCard
                        count={estimationData[1]}
                        prefix="Rs."
                        title="Patients Output"
                      />
                    </Grid>
                    <Grid item xs={12} lg={12} onClick={thirdClick}>
                      <OutlinedCounterCard
                        count={estimationData[2]}
                        prefix="Rs."
                        title="Walking Output"
                      />
                    </Grid>
                    <Grid item xs={12} lg={12} onClick={fourthClick}>
                      <OutlinedCounterCard
                        count={estimationData[3]}
                        prefix="Rs."
                        title="Discounts"
                      />
                    </Grid>
                    <Grid item xs={12} lg={12} onClick={fiveClick}>
                      <OutlinedCounterCard
                        count={estimationData[4]}
                        prefix="Rs."
                        title="Medicine Return"
                      />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <OutlinedCounterCard
                        count={
                          estimationData[1] +
                          estimationData[2] -
                          estimationData[0] -
                          estimationData[3] -
                          estimationData[4]
                        }
                        prefix="Rs."
                        title="Total Profit"
                      />
                    </Grid>
                  </Grid>
                </SuiBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CostEstimation;
