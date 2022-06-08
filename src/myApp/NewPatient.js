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
import { useState } from "react";
import SuiSnackbar from "components/SuiSnackbar";

function NewPatient() {
  const history = useHistory();

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

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");

  function addPatient(e) {
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

    fetch("https://zahidhd.tk/zahidhd/api/patients/add-patient", {
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
                  <SuiTypography variant="h5">Add Patient Information</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="name"
                          placeholder="eg. John Doe"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="father name"
                          placeholder="eg. Patrick Doe"
                          onChange={(e) => setFatherName(e.target.value)}
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
                          defaultValue={{ value: "Male", label: "Male" }}
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="number"
                          label="weight (Kg)"
                          placeholder="eg. 75"
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="height X'X''"
                          placeholder="eg. 5,6"
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="phone"
                          placeholder="eg. 03XX-XXXXXXX"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <SuiButton variant="gradient" color="success" onClick={addPatient}>
                    Add
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

export default NewPatient;
