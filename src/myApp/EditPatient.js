import "main.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import SuiSnackbar from "components/SuiSnackbar";
import { Oval } from "react-loader-spinner";

function EditPatient() {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");

  const history = useHistory();
  const { id } = history.location.state;
  const sendId = new URLSearchParams({ id }).toString();

  const [patientsData, setPatientsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/patients/edit-patient?${sendId}`, {
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
        setPatientsData(result.data);
        setIsPending(false);
        setError(false);
        setName(result.data.name);
        setFatherName(result.data.father_name);
        setAge(result.data.age);
        setWeight(result.data.weight);
        setHeight(result.data.height);
        setPhone(result.data.phone);
        setGender(result.data.gender);
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
  }, [`http://localhost/zhhs_soft_server/api/patients/edit-patient?${sendId}`]);

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

  function editPatient(e) {
    e.preventDefault();

    // console.log(e);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("father_name", fatherName);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("weight", weight);
    formData.append("height", height);
    formData.append("phone", phone);

    fetch(`http://localhost/zhhs_soft_server/api/patients/edit-patient?${sendId}`, {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === true) {
          history.replace("/patients");
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
      <SuiBox mt={3} mb={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Edit Patient Information</SuiTypography>
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
                  {patientsData && (
                    <SuiBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="fisrt name"
                            placeholder="eg. John"
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={patientsData.name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="last name"
                            placeholder="eg. Doe"
                            onChange={(e) => setFatherName(e.target.value)}
                            defaultValue={patientsData.father_name}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SuiTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Gender
                            </SuiTypography>
                          </SuiBox>
                          <SuiSelect
                            defaultValue={{
                              value: patientsData.gender,
                              label: patientsData.gender,
                            }}
                            options={[
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                              { value: "Rather Not Say", label: "Rather Not Say" },
                            ]}
                            onChange={(e) => setGender(e.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="age"
                            placeholder="eg. 25"
                            onChange={(e) => setAge(e.target.value)}
                            defaultValue={patientsData.age}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="weight (Kg)"
                            placeholder="eg. 75"
                            onChange={(e) => setWeight(e.target.value)}
                            defaultValue={patientsData.weight}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="height X'X''"
                            placeholder="eg. 5,6"
                            onChange={(e) => setHeight(e.target.value)}
                            defaultValue={patientsData.height}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="text"
                            label="phone"
                            placeholder="eg. 03XX-XXXXXXX"
                            onChange={(e) => setPhone(e.target.value)}
                            defaultValue={patientsData.phone}
                          />
                        </Grid>
                      </Grid>
                    </SuiBox>
                  )}
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <SuiButton variant="gradient" color="success" onClick={editPatient}>
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

export default EditPatient;
