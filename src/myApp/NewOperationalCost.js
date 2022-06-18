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
import { useEffect, useState } from "react";
import SuiSnackbar from "components/SuiSnackbar";
import { Oval } from "react-loader-spinner";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

function NewOperationalCost() {
  const history = useHistory();

  const [newItem, setNewItem] = useState("");
  const [startAction, setStartAction] = useState("");

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");

  const [itemData, setItemData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  function handleDelete() {
    // console.log(e);
    // console.log(startAction);

    const sendId = new URLSearchParams({ id: startAction }).toString();

    if (startAction === "") {
      setErrorText("Please select any item first.");
      setErrorSB(true);
    } else {
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
            setItemData(null);
            fetch(`https://zahidhd.tk/zahidhd/api/items/delete-item?${sendId}`, {
              method: "POST",
              // headers: { "content-Type": "application/json" },
              // body: formData,
            })
              .then((response) => response.json())
              .then((resultIn) => {
                // console.log(resultIn);

                if (resultIn.status === true) {
                  setItemData(resultIn.data);
                  setIsPending(false);
                  setError(false);
                  setStartAction("");
                  Swal.fire("Deleted!", "Your item has been deleted.", "success");
                } else {
                  setItemData(resultIn.data);
                  setIsPending(false);
                  setError(false);
                  setStartAction("");
                  Swal.fire("Error!", resultIn.message, "error");
                }
              });

            // console.log(medicinesData);
          }
        });
    }
  }

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/items`, {
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
        setItemData(result.data);
        setIsPending(false);
        setError(false);
        // setName(result.data.name);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setItemData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/items`]);

  function addItemCost(e) {
    e.preventDefault();
    // console.log(e);

    const formData = new FormData();

    formData.append("item_id", name);
    formData.append("cost", cost);
    formData.append("quantity", quantity);

    fetch("https://zahidhd.tk/zahidhd/api/costs/add-cost", {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === true) {
          // console.log(data);
          history.replace("/operational-costs");
        } else if (data.status === false) {
          // console.log(data);
          setErrorText(data.data);
          setErrorSB(true);
        }
      });
  }

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

  const closeSuccessSB = () => setSuccessSB(false);
  const renderSuccessSB = (
    <SuiSnackbar
      color="success"
      icon="check"
      title={successText}
      content=""
      dateTime=""
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
    />
  );

  function addItem(e) {
    e.preventDefault();

    // console.log(newItem);

    const formData = new FormData();

    formData.append("name", newItem);

    fetch("https://zahidhd.tk/zahidhd/api/items/add-item", {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === true) {
          setItemData(false);
          setIsPending(true);
          setItemData(data.data);
          setIsPending(false);
          setSuccessText("New Item Added Successfully");
          setSuccessSB(true);
          // console.log(data);
        } else if (data.status === false) {
          setIsPending(false);
          // console.log(data);
          setErrorText(data.data);
          setErrorSB(true);
        }
      });
  }

  function editItem(e) {
    e.preventDefault();

    const sendId = new URLSearchParams({ id: startAction }).toString();

    const formData = new FormData();

    formData.append("name", newItem);

    fetch(`https://zahidhd.tk/zahidhd/api/items/edit-item?${sendId}`, {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // setErrorText("cth");
        if (data.status === true) {
          setItemData(false);
          setIsPending(true);
          setItemData(data.data);
          setIsPending(false);
          setSuccessText("Item Updated Successfully");
          setSuccessSB(true);
          setError(false);
          setStartAction("");
          // console.log(data);
        } else if (data.status === false) {
          setIsPending(false);
          // console.log(data);
          setErrorText(data.data);
          setErrorSB(true);
        }
      });
  }

  const newData = [];
  if (itemData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    itemData.forEach((element) => {
      // console.log(element);
      newData.push({ value: element.id, label: element.name });
    });
  }
  // console.log(newData);
  // useData = usersData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {renderErrorSB}
      {renderSuccessSB}
      <SuiBox mt={3} mb={5}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Add Item Cost Information</SuiTypography>
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
                        {errorL && (
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <SuiBox p={3} pb={15}>
                              {errorL}
                            </SuiBox>
                          </Grid>
                        )}
                        {isPending && (
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <SuiBox>
                              <Oval color="#74c40e" height={30} width={30} />
                            </SuiBox>
                          </Grid>
                        )}
                        {itemData && (
                          <SuiSelect
                            defaultValue={{ value: "", label: "Select any item" }}
                            options={newData}
                            onChange={(e) => setName(e.value)}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="number"
                          label="item cost"
                          placeholder="eg. 500"
                          onChange={(e) => setCost(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormField
                          type="text"
                          label="item note"
                          placeholder="eg. 1 Pao"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <Grid container justifyContent="flex-end" mt={2}>
                  <SuiButton variant="gradient" color="success" onClick={addItemCost}>
                    Add
                  </SuiButton>
                </Grid>
              </SuiBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Card sx={{ overflow: "visible" }}>
              <SuiBox p={2}>
                <SuiBox>
                  <SuiTypography variant="h5">Manage Items</SuiTypography>
                  <SuiBox mt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                textTransform="capitalize"
                              >
                                All Items List
                              </SuiTypography>
                            </SuiBox>
                            {errorL && (
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <SuiBox p={3} pb={15}>
                                  {errorL}
                                </SuiBox>
                              </Grid>
                            )}
                            {isPending && (
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <SuiBox>
                                  <Oval color="#74c40e" height={30} width={30} />
                                </SuiBox>
                              </Grid>
                            )}
                            {itemData && (
                              <SuiSelect
                                defaultValue={{
                                  value: "",
                                  label: "Select any item",
                                }}
                                options={newData}
                                onChange={(e) => setStartAction(e.value)}
                              />
                            )}
                            <SuiTypography
                              component="label"
                              variant="caption"
                              fontWeight="light"
                              textTransform="capitalize"
                            >
                              Hint: Select any to perform action.
                            </SuiTypography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            <FormField
                              type="text"
                              label="new item name"
                              placeholder="eg. Kalwanji"
                              onChange={(e) => setNewItem(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} display="flex" justifyContent="flex-end">
                            <SuiBox mr={2}>
                              <SuiButton variant="gradient" color="error" onClick={handleDelete}>
                                Remove
                              </SuiButton>
                            </SuiBox>
                            <SuiBox mr={2}>
                              <SuiButton variant="gradient" color="info" onClick={editItem}>
                                Update
                              </SuiButton>
                            </SuiBox>
                            <SuiBox>
                              <SuiButton variant="gradient" color="success" onClick={addItem}>
                                Add
                              </SuiButton>
                            </SuiBox>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
              </SuiBox>
            </Card>
          </Grid>
        </Grid>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewOperationalCost;
