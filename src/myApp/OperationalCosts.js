// @mui material components
import Card from "@mui/material/Card";

import "main.css";

import { Oval } from "react-loader-spinner";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import SuiButton from "components/SuiButton";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "@mui/material";

import Icon from "@mui/material/Icon";
// Soft UI Dashboard PRO React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function OperationalCosts() {
  const history = useHistory();

  const [costsData, setCostsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  // const [lastFive, setLastFive] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/costs`, {
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
  }, [`https://zahidhd.tk/zahidhd/api/costs`]);

  let cosData = "";

  function handleEdit(e) {
    // console.log(e);
    history.push(`/operational-costs/edit-operational-cost`, { id: e });
  }

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
          setCostsData(null);
          fetch(`https://zahidhd.tk/zahidhd/api/costs/delete-cost?${sendId}`, {
            method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
          })
            .then((response) => response.json())
            .then((resultIn) => {
              // console.log(resultIn);
              setCostsData(resultIn.data);
              setIsPending(false);
              setError(false);
            });
          Swal.fire("Deleted!", "Your item cost has been deleted.", "success");
          // console.log(medicinesData);
        }
      });
  }

  if (costsData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    costsData[1].forEach((element) => {
      if (element.type === "Self") {
        element.price = "-";
        element.stock = "-";
        element.expiry_date = "-";
      }
      element.action = (
        <SuiBox display="flex" alignItems="center">
          <SuiBox ml={1}>
            <SuiTypography
              variant="body1"
              color="secondary"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <Tooltip title="Edit Medicine" placement="top" onClick={() => handleEdit(element.id)}>
                <Icon>edit</Icon>
              </Tooltip>
            </SuiTypography>
          </SuiBox>
          <SuiBox ml={1}>
            <SuiTypography
              variant="body1"
              color="secondary"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <Tooltip
                title="Delete Medicine"
                placement="left"
                onClick={() => handleDelete(element.id)}
              >
                <Icon>delete</Icon>
              </Tooltip>
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      );
      // console.log(element);
    });

    cosData = {
      columns: [
        { Header: "ID", accessor: "id" },
        { Header: "ITEM NAME", accessor: "name" },
        { Header: "ITEM QUANTITY", accessor: "quantity" },
        { Header: "ITEM COST", accessor: "cost" },
        { Header: "ACTION", accessor: "action" },
      ],

      rows: costsData[1],
    };

    // console.log(medData);
  }

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
                    Last Six Operational Costs
                  </SuiTypography>
                </SuiBox>
                <SuiBox p={2}>
                  {costsData &&
                    costsData[0].map((one) => (
                      <TimelineItem
                        color="info"
                        icon="inventory_2"
                        title={one.name}
                        dateTime={one.created_at}
                        key={one.id}
                      />
                    ))}
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
                </SuiBox>
                <SuiBox>
                  <Link to="/operational-costs/new-operational-cost">
                    <SuiButton variant="gradient" color="success">
                      Add Cost
                    </SuiButton>
                  </Link>
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
              {costsData && <DataTable table={cosData} canSearch />}
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OperationalCosts;
