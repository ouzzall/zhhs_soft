import "main.css";
import { useState } from "react";

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
import SuiSnackbar from "components/SuiSnackbar";
import { useHistory } from "react-router-dom";
import { Switch } from "@mui/material";

function NewMedicine() {
  const history = useHistory();
  const [moreOption, setMoreOption] = useState(true);

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
  const [type, setType] = useState("Shelf");
  const [price, setPrice] = useState(""); // sale_price
  const [purchasePrice, setPurchasePrice] = useState(""); // purchase_price
  const [expiry, setExpiry] = useState("");
  const [count, setCount] = useState("");
  const [estimationCheck, setEstimationCheck] = useState(false);

  function handleChange(e) {
    // console.log(e.value);
    if (e.value === "Shelf") {
      setMoreOption(true);
      setType(e.value);
    } else {
      setMoreOption(false);
      setType(e.value);
    }
  }

  function addMedicine(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("purchase_price", purchasePrice);
    formData.append("expiry_date", expiry);
    formData.append("stock", count);
    formData.append("estimation_check", estimationCheck);

    fetch("http://localhost/zhhs_soft_server/api/medicines/add-medicine", {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === true) {
          history.replace("/medicines");
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
      <SuiBox mt={3} mb={5}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Add Medicine Information</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="name"
                          placeholder="eg. Entamizole DS 500 mg"
                          onChange={(e) => setName(e.target.value)}
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
                            Medicine Type
                          </SuiTypography>
                        </SuiBox>
                        <SuiSelect
                          defaultValue={{ value: "Shelf", label: "Shelf" }}
                          options={[
                            { value: "Shelf", label: "Shelf" },
                            { value: "Self", label: "Self" },
                          ]}
                          onChange={handleChange}
                        />
                      </Grid>
                      {moreOption && (
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="purchase price"
                            onChange={(e) => setPurchasePrice(e.target.value)}
                            placeholder="eg. 1500"
                          />
                        </Grid>
                      )}
                      {moreOption && (
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="sale price"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="eg. 1500"
                          />
                        </Grid>
                      )}
                      {moreOption && (
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="date"
                            label="expiry date"
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="eg. DD/MM/YYYY"
                          />
                        </Grid>
                      )}
                      {moreOption && (
                        <Grid item xs={12} sm={6}>
                          <FormField
                            type="number"
                            label="count"
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="eg. 300"
                          />
                        </Grid>
                      )}
                      {moreOption && (
                        <Grid item xs={12} sm={6} justifyContent="space-between" display="flex">
                          <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block" mt={1}>
                            <SuiTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Turn On to add this to Spendings
                            </SuiTypography>
                          </SuiBox>
                          <Switch
                            checked={estimationCheck}
                            onChange={() => setEstimationCheck(!estimationCheck)}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <SuiButton variant="gradient" color="success" onClick={addMedicine}>
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

export default NewMedicine;
