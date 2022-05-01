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

import SuiButton from "components/SuiButton";
import { Link, useHistory } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

function Patients() {
  const history = useHistory();

  const [patientsData, setPatientsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/patients`, {
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
  }, [`http://localhost/zhhs_soft_server/api/patients`]);

  let patData = "";

  function handleEdit(e) {
    // console.log(e);
    history.push(`/patients/edit-patient`, { id: e });
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
          setPatientsData(null);
          fetch(`http://localhost/zhhs_soft_server/api/patients/delete-patient?${sendId}`, {
            method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
          })
            .then((response) => response.json())
            .then((resultIn) => {
              // console.log(resultIn);
              setPatientsData(resultIn.data);
              setIsPending(false);
              setError(false);
            });
          Swal.fire("Deleted!", "Your patient has been deleted.", "success");
          // console.log(medicinesData);
        }
      });
  }

  if (patientsData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    patientsData.forEach((element) => {
      element.action = (
        <SuiBox display="flex" alignItems="center">
          <SuiBox ml={1}>
            <SuiTypography
              variant="body1"
              color="secondary"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <Tooltip
                title="Preview product"
                placement="top"
                onClick={() => history.push("/patients/profile")}
              >
                <Icon>visibility</Icon>
              </Tooltip>
            </SuiTypography>
          </SuiBox>
          <SuiBox ml={1}>
            <SuiTypography
              variant="body1"
              color="secondary"
              sx={{ cursor: "pointer", lineHeight: 0 }}
            >
              <Tooltip title="Edit Patient" placement="top" onClick={() => handleEdit(element.id)}>
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
                title="Delete Patient"
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

    patData = {
      columns: [
        { Header: "ID", accessor: "id" },
        { Header: "NAME", accessor: "name", width: "18%" },
        { Header: "FATHER NAME", accessor: "father_name", width: "18%" },
        { Header: "AGE", accessor: "age" },
        { Header: "GENDER", accessor: "gender" },
        { Header: "WEIGHT (Kg)", accessor: "weight" },
        { Header: "HEIGHT", accessor: "height" },
        { Header: "PHONE", accessor: "phone" },
        { Header: "ACTION", accessor: "action", width: "9%" },
      ],

      rows: patientsData,
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
                Patients List
              </SuiTypography>
              {/* <SuiTypography variant="button" fontWeight="regular" color="text">
                There are two types of medicines. 1: Shelf, 2: Self. All of the medicines are
                displayed below.
              </SuiTypography> */}
            </SuiBox>
            <SuiBox>
              <Link to="/patients/new-patient">
                <SuiButton variant="gradient" color="success">
                  Add Patient
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
          {patientsData && <DataTable table={patData} canSearch />}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Patients;
