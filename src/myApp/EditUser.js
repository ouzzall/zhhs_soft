import "main.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import SuiSnackbar from "components/SuiSnackbar";
import { Oval } from "react-loader-spinner";

function EditUser() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const { id } = history.location.state;
  const sendId = new URLSearchParams({ id }).toString();

  const [usersData, setUsersData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/users/edit-user?${sendId}`, {
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
        setUsersData(result.data);
        setIsPending(false);
        setError(false);
        setName(result.data.name);
        setPhone(result.data.phone);
        setPassword(result.data.password);
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
  }, [`http://localhost/zhhs_soft_server/api/users/edit-user?${sendId}`]);

  const [errorSB, setErrorSB] = useState(false);
  const [errorText, setErrorText] = useState("");
  const closeErrorSB = () => setErrorSB(false);
  const renderErrorSB = (
    <SuiSnackbar
      color="error"
      icon="warning"
      title={errorText}
      content=""
      dateTime=""
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
    />
  );

  function editUser(e) {
    e.preventDefault();

    // console.log(e);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("password", password);

    fetch(`http://localhost/zhhs_soft_server/api/users/edit-user?${sendId}`, {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === true) {
          history.replace("/user-management");
          // console.log(data);
        } else if (data.status === false) {
          // console.log(data);
          setErrorText(data.data);
          setErrorSB(true);
        }
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {renderErrorSB}
      <SuiBox mt={3} mb={30}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Edit User Information</SuiTypography>
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
                  {usersData && (
                    <SuiBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            defaultValue={usersData.name}
                            type="text"
                            label="name"
                            placeholder="eg. John Doe"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            defaultValue={usersData.phone}
                            type="number"
                            label="phone"
                            placeholder="eg. 03XX-XXXXXXX"
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            defaultValue={usersData.password}
                            type="text"
                            label="password"
                            placeholder=""
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </SuiBox>
                  )}
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <SuiButton variant="gradient" color="success" onClick={editUser}>
                    Update
                  </SuiButton>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditUser;
