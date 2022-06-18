// @mui material components
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

import { useDispatch } from "react-redux";
import { setShelfList, setSelfList } from "redux/patMedicines";
import { useHistory } from "react-router-dom";

import SuiButton from "components/SuiButton";

import { Oval } from "react-loader-spinner";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function WalkingCustomers() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [walkData, setWalkData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  function actionHandle() {
    dispatch(setShelfList([]));
    dispatch(setSelfList([]));
    history.push("/walking-customers/new-walking-customer");
  }

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/walking-output`, {
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
        setWalkData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setWalkData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/walking-output`]);

  let useData = "";

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
          setWalkData(null);
          fetch(`https://zahidhd.tk/zahidhd/api/walk/delete?${sendId}`, {
            method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
          })
            .then((response) => response.json())
            .then((resultIn) => {
              // console.log(resultIn);
              setWalkData(resultIn.data);
              setIsPending(false);
              setError(false);
            });
          Swal.fire("Deleted!", "Bill has been deleted.", "success");
          // console.log(medicinesData);
        }
      });
  }

  function handleBill(e) {
    // console.log(e);
    history.push(`/walking-customers/random-bill`, { id: e });
  }

  if (walkData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    walkData.forEach((element) => {
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
      // console.log(element);
    });

    useData = {
      columns: [
        { Header: "BILL ID", accessor: "id" },
        { Header: "BILL DATE", accessor: "created_at_2" },
        { Header: "VIEW BILL", accessor: "bill" },
        { Header: "ACTION", accessor: "action" },
      ],
      rows: walkData,
    };

    // console.log(medData);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox pt={3} pb={3}>
        <Card>
          <SuiBox p={3} lineHeight={1} display="flex" className="spc_between">
            <SuiBox>
              <SuiTypography variant="h5" fontWeight="medium">
                Previous Bills List
              </SuiTypography>
            </SuiBox>
            <SuiBox>
              <SuiButton variant="gradient" color="success" onClick={actionHandle}>
                New Customer
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
          {walkData && <DataTable table={useData} canSearch />}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WalkingCustomers;
