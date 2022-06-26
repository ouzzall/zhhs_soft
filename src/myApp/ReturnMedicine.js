import "main.css";
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Swal from "sweetalert2";
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
import { Oval } from "react-loader-spinner";

function ReturnMedicine() {
  const [medicinesData, setMedicinesData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  const [moreOption, setMoreOption] = useState(false);

  const [returnId, setReturnId] = useState(0);
  const [returnCount, setReturnCount] = useState(0);
  const [returnQuantity, setReturnQuantity] = useState("");
  const [returnPrice, setReturnPrice] = useState(0);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/medicines`, {
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
        setMedicinesData(result.data[1]);
        setIsPending(false);
        setError(false);
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
  }, [`http://localhost/zhhs_soft_server/api/medicines`]);

  function handleChange(e) {
    // console.log(e);
    // console.log(medicinesData);
    setReturnId(e.value);
    let currentType = "";
    for (let i = 0; i < medicinesData.length; i += 1) {
      // console.log(medicinesData[i]);
      if (e.value === medicinesData[i].id) {
        // console.log(medicinesData[i].type);
        currentType = medicinesData[i].type;
        break;
      }
    }
    if (currentType === "Shelf") {
      setMoreOption("Shelf");
      setReturnCount(0);
      setReturnPrice(0);
      setReturnQuantity("");
    } else {
      setMoreOption("Self");
      setReturnCount(0);
      setReturnPrice(0);
      setReturnQuantity("");
    }
  }

  const newData = [];
  if (medicinesData) {
    medicinesData.forEach((element) => {
      // console.log(element);
      newData.push({ value: element.id, label: element.name });
    });
  }

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

  function returnMedicine(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("medicine_id", returnId);
    formData.append("count", returnCount);
    formData.append("price", returnPrice);
    formData.append("quantity", returnQuantity);

    fetch(`http://localhost/zhhs_soft_server/api/return`, {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // setErrorText("cth");
        if (data.status === true) {
          // history.replace("/medicines");
          // console.log(data);
          setReturnCount(0);
          setReturnPrice(0);
          setReturnQuantity("");
          Swal.fire("Success!", "Medicine Added To Inventory.", "success");
        } else if (data.status === false) {
          // console.log(data);
          setErrorText(data.message);
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
                  <SuiTypography variant="h5">Return Medicine</SuiTypography>
                  {errorL && (
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                      <SuiBox p={3} pb={15}>
                        {errorL}
                      </SuiBox>
                    </Grid>
                  )}
                  {isPending && (
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                      <SuiBox pt={5} pb={3}>
                        <Oval color="#74c40e" height={80} width={80} />
                      </SuiBox>
                    </Grid>
                  )}
                  {medicinesData && (
                    <SuiBox mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <SuiTypography
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                              textTransform="capitalize"
                            >
                              Select Medicine
                            </SuiTypography>
                          </SuiBox>
                          <SuiSelect
                            placeholder="Select any Medicine"
                            options={newData}
                            onChange={(e) => handleChange(e)}
                          />
                        </Grid>
                        {moreOption === "Shelf" ? (
                          <Grid item xs={12} sm={6}>
                            <FormField
                              type="number"
                              label="count"
                              onChange={(e) => setReturnCount(e.target.value)}
                              placeholder="eg. 15"
                              value={returnCount}
                            />
                          </Grid>
                        ) : null}
                        {moreOption === "Self" ? (
                          <Grid item xs={12} sm={6}>
                            <FormField
                              type="text"
                              label="Quantity (Note)"
                              onChange={(e) => setReturnQuantity(e.target.value)}
                              placeholder="eg. 1 Box Majoon"
                              value={returnQuantity}
                            />
                          </Grid>
                        ) : null}
                        {moreOption === "Self" ? (
                          <Grid item xs={12} sm={6}>
                            <FormField
                              type="number"
                              label="Price"
                              onChange={(e) => setReturnPrice(e.target.value)}
                              placeholder="eg. 1500"
                              value={returnPrice}
                            />
                          </Grid>
                        ) : null}
                      </Grid>
                    </SuiBox>
                  )}
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <SuiButton variant="gradient" color="success" onClick={returnMedicine}>
                    Return
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

export default ReturnMedicine;
