import "main.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { Oval } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// NewProduct page components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

function SpendingsDetail() {
  const history = useHistory();
  const { start, end } = history.location.state;
  // console.log(start, end);
  const sendId = new URLSearchParams({ start, end }).toString();
  // console.log(sendId);

  const [costsData, setCostsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  // const [lastFive, setLastFive] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/costs?${sendId}`, {
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
        setCostsData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setCostsData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`http://localhost/zhhs_soft_server/api/costs?${sendId}`]);

  let cosData = "";

  if (costsData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    costsData[1].forEach((element) => {
      if (element.type === "Self") {
        element.price = "-";
        element.stock = "-";
        element.expiry_date = "-";
      }
      // console.log(element);
    });

    cosData = {
      columns: [
        { Header: "ID", accessor: "id" },
        { Header: "ITEM NAME", accessor: "name" },
        { Header: "ITEM NOTE", accessor: "quantity" },
        { Header: "ITEM COST", accessor: "cost" },
      ],

      rows: costsData[1],
    };

    // console.log(medData);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
                <SuiBox>
                  <SuiTypography variant="h5" fontWeight="medium">
                    Spendings Detail
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
              {/* <DataTable table={SpendingsData} canSearch /> */}
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
              {costsData && <DataTable table={cosData} canSearch />}
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SpendingsDetail;
