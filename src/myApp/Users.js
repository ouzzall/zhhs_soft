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

function Users() {
  const history = useHistory();

  const [usersData, setUsersData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/users`, {
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
        setUsersData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setUsersData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/users`]);

  let useData = "";

  function handleEdit(e) {
    // console.log(e);
    history.push(`/user-management/edit-user`, { id: e });
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
          setUsersData(null);
          fetch(`https://zahidhd.tk/zahidhd/api/users/delete-user?${sendId}`, {
            method: "POST",
            // headers: { "content-Type": "application/json" },
            // body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              if (data.status === true) {
                Swal.fire("Deleted!", "Your user has been deleted.", "success");
              } else if (data.status === false) {
                Swal.fire("Error!", "Only 1 user remainig in database.", "error");
              }
              setUsersData(data.data);
              setIsPending(false);
              setError(false);
            });
          // console.log(medicinesData);
        }
      });
  }

  if (usersData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    usersData.forEach((element) => {
      element.action = (
        <SuiBox display="flex" alignItems="center">
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

    useData = {
      columns: [
        { Header: "ID", accessor: "id" },
        { Header: "NAME", accessor: "name" },
        { Header: "PHONE", accessor: "phone" },
        { Header: "USERNAME", accessor: "username" },
        { Header: "PASSWORD", accessor: "password" },
        { Header: "ACTION", accessor: "action", width: "9%" },
      ],

      rows: usersData,
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
                Users List
              </SuiTypography>
            </SuiBox>
            <SuiBox>
              <Link to="/user-management/new-user">
                <SuiButton variant="gradient" color="success">
                  Add User
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
          {usersData && <DataTable table={useData} canSearch />}
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Users;
