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

import Grid from "@mui/material/Grid";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import SuiButton from "components/SuiButton";
import { Link, useHistory } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Icon, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function Medicines() {
  const history = useHistory();

  const [medicinesData, setMedicinesData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  const [shelfCount, setShelfCount] = useState(0);
  const [selfCount, setSelfCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/medicines`, {
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
        setMedicinesData(result.data);
        setIsPending(false);
        setError(false);
        setShelfCount(result.data[0][0]);
        setSelfCount(result.data[0][1]);
        setTotalCount(result.data[0][2]);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setMedicinesData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/medicines`]);

  let medData = "";

  function handleEdit(e) {
    // console.log(e);
    history.push(`/medicines/edit-medicine`, { id: e });
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
          setMedicinesData(null);
          fetch(`https://zahidhd.tk/zahidhd/api/medicines/delete-medicine?${sendId}`, {
            method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
          })
            .then((response) => response.json())
            .then((resultIn) => {
              // console.log(resultIn);
              setMedicinesData(resultIn.data);
              setIsPending(false);
              setError(false);
              setShelfCount(resultIn.data[0][0]);
              setSelfCount(resultIn.data[0][1]);
              setTotalCount(resultIn.data[0][2]);
            });
          Swal.fire("Deleted!", "Your medicine has been deleted.", "success");
          // console.log(medicinesData);
        }
      });
  }

  if (medicinesData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    medicinesData[1].forEach((element) => {
      if (element.type === "Self") {
        element.price = "-";
        element.stock = "-";
        element.expiry_date = "-";
        element.purchase_price = "-";
      }
      if (element.type === "Shelf") {
        if (element.expiry_date === "2010-10-10") {
          element.expiry_date = "-";
        }
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

    medData = {
      columns: [
        { Header: "ID", accessor: "id" },
        { Header: "NAME", accessor: "name", width: "20%" },
        { Header: "TYPE", accessor: "type", width: "5%" },
        { Header: "EXPIRY", accessor: "expiry_date" },
        { Header: "COUNT", accessor: "stock" },
        { Header: "PURCHASE PRICE (Rs)", accessor: "purchase_price" },
        { Header: "SALE PRICE (Rs)", accessor: "price" },
        { Header: "ACTION", accessor: "action", width: "9%" },
      ],

      rows: medicinesData[1],
    };

    // console.log(medData);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <SuiBox>
          <Grid item xs={12} lg={7}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Shelf Count", fontWeight: "bold" }}
                    count={selfCount}
                    // percentage={{ color: "success", text: "+55%" }}
                    icon={{ color: "success", component: "fa-solid fa-pills" }}
                  />
                </SuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Self Count", fontWeight: "bold" }}
                    count={shelfCount}
                    // percentage={{ color: "success", text: "+3%" }}
                    icon={{ color: "success", component: "fa-solid fa-hand-holding-medical" }}
                  />
                </SuiBox>
              </Grid>
              <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Total Count", fontWeight: "bold" }}
                    count={totalCount}
                    // percentage={{ color: "error", text: "-2%" }}
                    icon={{ color: "success", component: "fa-solid fa-house-medical-circle-check" }}
                  />
                </SuiBox>
              </Grid>
              {/* <Grid item xs={6} sm={3}>
                <SuiBox mb={3}>
                  <MiniStatisticsCard
                    title={{ text: "Revenue", fontWeight: "bold" }}
                    count="45613"
                    // percentage={{ color: "success", text: "" }}
                    icon={{
                      color: "success",
                      component: "fa-solid fa-circle-dollar-to-slot",
                    }}
                  />
                </SuiBox>
              </Grid> */}
            </Grid>
          </Grid>
        </SuiBox>
        <Card>
          <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
            <SuiBox>
              <SuiTypography variant="h5" fontWeight="medium">
                Medicines List
              </SuiTypography>
              {/* <SuiTypography variant="button" fontWeight="regular" color="text">
                There are two types of medicines. 1: Shelf, 2: Self. All of the medicines are
                displayed below.
              </SuiTypography> */}
            </SuiBox>
            <SuiBox>
              <Link to="/medicines/new-medicine">
                <SuiButton variant="gradient" color="success">
                  Add Medicine
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
          {medicinesData && <DataTable table={medData} canSearch />}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Medicines;
