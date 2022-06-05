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
import SuiSelect from "components/SuiSelect";

function EditOperationalCost() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");

  const history = useHistory();
  const { id } = history.location.state;
  const sendId = new URLSearchParams({ id }).toString();

  const [costsData, setCostsData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/costs/edit-cost?${sendId}`, {
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
        setCostsData(result.data);
        setIsPending(false);
        setError(false);
        setName(result.data[1].item_id);
        setCost(result.data[1].cost);
        setQuantity(result.data[1].quantity);
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

  function editCost(e) {
    e.preventDefault();

    // console.log(e);

    const formData = new FormData();

    formData.append("item_id", name);
    formData.append("cost", cost);
    formData.append("quantity", quantity);

    fetch(`http://localhost/zhhs_soft_server/api/costs/edit-cost?${sendId}`, {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === true) {
          history.replace("/operational-costs");
          // console.log(data);
        } else if (data.status === false) {
          // console.log(data);
          setErrorText(data.data);
          setErrorSB(true);
        }
      });
  }

  const newData = [];
  if (costsData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    costsData[0].forEach((element) => {
      // console.log(element);
      newData.push({ value: element.id, label: element.name });
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
                  <SuiTypography variant="h5">Edit Item Cost Information</SuiTypography>
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
                  {costsData && (
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
                              Item Name
                            </SuiTypography>
                          </SuiBox>
                          <SuiSelect
                            defaultValue={{
                              value: costsData[1].item_id,
                              label: costsData[1].name,
                            }}
                            options={newData}
                            onChange={(e) => setName(e.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            defaultValue={costsData[1].cost}
                            type="number"
                            label="item cost"
                            placeholder="eg. 500"
                            onChange={(e) => setCost(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormField
                            defaultValue={costsData[1].quantity}
                            type="text"
                            label="item note"
                            placeholder="eg. 1 Pao"
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </SuiBox>
                  )}
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <SuiButton variant="gradient" color="success" onClick={editCost}>
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

export default EditOperationalCost;
