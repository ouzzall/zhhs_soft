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

function DiscountInput() {
  const history = useHistory();
  const { start, end } = history.location.state;
  // console.log(start, end);
  const sendId = new URLSearchParams({ start, end }).toString();

  const [patientsData, setPatientsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/discount-input?${sendId}`, {
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
        setPatientsData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setPatientsData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/patient-output?${sendId}`]);

  let patData = "";

  if (patientsData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    patientsData.forEach((element) => {
      // console.log(element);
      if (element.check_up_id === 0) {
        element.check_up_id = "-";
      }
      if (element.walking_bill_id === 0) {
        element.walking_bill_id = "-";
      }
    });

    patData = {
      columns: [
        { Header: "ID", accessor: "id" },
        { Header: "BILL ID", accessor: "walking_bill_id" },
        { Header: "CHECK-UP ID", accessor: "check_up_id" },
        { Header: "TOTAL", accessor: "total_amount" },
        { Header: "DISCOUNT", accessor: "discount_amount" },
        { Header: "FINAL", accessor: "after_discount" },
      ],

      rows: patientsData,
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
                    Discounts Input (Read Only)
                  </SuiTypography>
                </SuiBox>
              </SuiBox>
              {/* <DataTable table={PatientsOutputData} canSearch /> */}
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
              {patientsData && <DataTable table={patData} canSearch />}
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DiscountInput;
