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
// import WalkingOutputData from "layouts/applications/data-tables/data/WalkingOutputData";

function WalkingOutput() {
  const history = useHistory();
  const { start, end } = history.location.state;
  // console.log(start, end);
  const sendId = new URLSearchParams({ start, end }).toString();
  // console.log(sendId);

  const [billsData, setBillsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  // const [lastFive, setLastFive] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/walking-output?${sendId}`, {
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
        setBillsData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setBillsData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/walking-output?${sendId}`]);

  let bilData = "";

  if (billsData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    billsData.forEach((element) => {
      if (element.discount_amount == null) {
        element.discount_amount = "-";
        element.after_discount = element.bill_price;
      }
    });

    bilData = {
      columns: [
        { Header: "BILL ID", accessor: "id" },
        { Header: "BILL DATE", accessor: "created_at_2" },
        { Header: "BILL COST", accessor: "bill_price" },
        { Header: "DISCOUNT", accessor: "discount_amount" },
        { Header: "FINAL COST", accessor: "after_discount" },
      ],

      rows: billsData,
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
                    Walking Output Detail
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
              {/* <DataTable table={WalkingOutputData} canSearch /> */}
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
              {billsData && <DataTable table={bilData} canSearch />}
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WalkingOutput;
