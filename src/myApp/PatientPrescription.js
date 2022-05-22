import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import { useHistory } from "react-router-dom";
import brand from "assets/logo/no-bg-logo.png";

// Images
// import logoCT from "assets/images/logo-ct.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

function PatientPrescription() {
  const history = useHistory();
  // console.log(history.location.state.id);
  const { id } = history.location.state;
  const sendId = new URLSearchParams({ id }).toString();
  // console.log(sendId);

  const [prescriptionData, setPrescriptionData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/view-bill?${sendId}`, {
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
        setPrescriptionData(result.data);
        setIsPending(false);
        setError(false);
      })
      .catch((err) => {
        // console.log(err.name === "AbortError");
        if (err.name === "AbortError") {
          // console.log("Fetch Aborted.");
        } else {
          setError(err.message);
          setPrescriptionData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`http://localhost/zhhs_soft_server/api/view-bill?${sendId}`]);

  const { borderWidth } = borders;
  const { light } = colors;
  const borderBottom = `${borderWidth[1]} solid ${light.main}`;

  function printHandler() {
    // console.log("patient_prescription", prescriptionData, localStorage.getItem("phone"));

    const formData = new FormData();

    formData.append("bill_type", "patient_prescription");
    formData.append("user", localStorage.getItem("phone"));
    formData.append("data", JSON.stringify(prescriptionData));

    // console.log(selfMedList[0]);
    // console.log(shelfMedList[0]);
    // formData.append("self_medicines", selfMedList[0]);
    // formData.append("shelf_medicines", shelfMedList[0]);

    fetch("http://localhost/zhhs_soft_server/api/print", {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {errorL && (
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <SuiBox p={3} pb={15}>
            {errorL}
          </SuiBox>
        </Grid>
      )}
      {isPending && (
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <SuiBox p={15} pb={15}>
            <Oval color="#74c40e" height={80} width={80} />
          </SuiBox>
        </Grid>
      )}
      {prescriptionData && (
        <SuiBox mt={{ xs: 3, md: 3 }} mb={{ xs: 3, md: 3 }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <Card>
                {/* Invoice header */}
                <SuiBox p={3} pt={1}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <SuiBox component="img" src={brand} alt="zhdk logo" width="8rem" />
                    </Grid>
                    <Grid item xs={12} md={7} lg={7}>
                      <SuiBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={2}>
                        <SuiTypography variant="h6" fontWeight="medium" mt={2}>
                          Zahid Herbal Dawakhana, near G. T. Road, Swami Nagar Lahore, Punjab,
                          Pakistan
                        </SuiTypography>
                        <SuiBox mt={1} mb={2}>
                          <SuiTypography display="block" variant="body2" color="secondary">
                            Phone: {localStorage.getItem("phone")}
                          </SuiTypography>
                        </SuiBox>
                      </SuiBox>
                    </Grid>
                  </Grid>
                  <SuiBox mt={{ xs: 3, md: 3 }}>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={12} md={4} display="flex">
                        <SuiTypography variant="h6" color="secondary" fontWeight="medium">
                          Prescription No
                        </SuiTypography>
                        <SuiTypography variant="h6" ml={1} fontWeight="medium">
                          #{prescriptionData[0].id}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={12} md={7} lg={7}>
                        <SuiBox
                          width="100%"
                          display="flex"
                          flexDirection={{ xs: "column", md: "row" }}
                          alignItems={{ xs: "flex-start", md: "center" }}
                          textAlign={{ xs: "left", md: "right" }}
                          mt={{ xs: 3, md: 0 }}
                        >
                          <SuiBox width="50%">
                            <SuiTypography variant="h6" color="secondary" fontWeight="medium">
                              Prescription Date:
                            </SuiTypography>
                          </SuiBox>
                          <SuiBox width="50%">
                            <SuiTypography variant="h6" fontWeight="medium">
                              {prescriptionData[0].created_at}
                            </SuiTypography>
                          </SuiBox>
                        </SuiBox>
                      </Grid>
                      <Grid item xs={12} md={7} lg={7}>
                        <SuiBox mt={2}>
                          <SuiBox mt={0}>
                            <SuiTypography variant="h6" fontWeight="medium">
                              Prescription to: {prescriptionData[0].name}
                            </SuiTypography>
                          </SuiBox>
                          <SuiBox mb={1}>
                            <SuiTypography variant="body2" color="secondary">
                              Phone: {prescriptionData[0].phone}
                            </SuiTypography>
                          </SuiBox>
                        </SuiBox>
                      </Grid>
                    </Grid>
                  </SuiBox>
                </SuiBox>
                <SuiBox p={3}>
                  <SuiBox width="100%" overflow="auto">
                    <Table sx={{ minWidth: "32rem" }}>
                      <SuiBox component="thead">
                        <TableRow>
                          <SuiBox
                            component="th"
                            width={{ xs: "45%", md: "50%" }}
                            py={1.5}
                            px={1}
                            textAlign="left"
                            borderBottom={borderBottom}
                          >
                            <SuiTypography variant="caption" color="text" fontWeight="medium">
                              MEDICINE
                            </SuiTypography>
                          </SuiBox>
                          <SuiBox
                            component="th"
                            py={1.5}
                            pl={3}
                            pr={1}
                            textAlign="left"
                            borderBottom={borderBottom}
                          >
                            <SuiTypography variant="caption" color="text" fontWeight="medium">
                              MRNG
                            </SuiTypography>
                          </SuiBox>
                          <SuiBox
                            component="th"
                            py={1.5}
                            pl={3}
                            pr={1}
                            textAlign="left"
                            borderBottom={borderBottom}
                          >
                            <SuiTypography variant="caption" color="text" fontWeight="medium">
                              NOON
                            </SuiTypography>
                          </SuiBox>
                          <SuiBox
                            component="th"
                            py={1.5}
                            pl={3}
                            pr={1}
                            textAlign="left"
                            borderBottom={borderBottom}
                          >
                            <SuiTypography variant="caption" color="text" fontWeight="medium">
                              NITE
                            </SuiTypography>
                          </SuiBox>
                          <SuiBox
                            component="th"
                            py={1.5}
                            pl={3}
                            pr={1}
                            textAlign="left"
                            borderBottom={borderBottom}
                          >
                            <SuiTypography variant="caption" color="text" fontWeight="medium">
                              TAKING
                            </SuiTypography>
                          </SuiBox>
                          <SuiBox
                            component="th"
                            py={1.5}
                            pl={3}
                            pr={1}
                            textAlign="left"
                            borderBottom={borderBottom}
                          >
                            <SuiTypography variant="caption" color="text" fontWeight="medium">
                              DAYS
                            </SuiTypography>
                          </SuiBox>
                        </TableRow>
                      </SuiBox>
                      <TableBody>
                        {prescriptionData[1].map((value) => (
                          <TableRow key={value.id}>
                            <SuiBox
                              component="td"
                              textAlign="left"
                              p={1}
                              borderBottom={borderBottom}
                            >
                              <SuiTypography variant="body2" color="text">
                                {value.name}
                              </SuiTypography>
                            </SuiBox>
                            <SuiBox
                              component="td"
                              textAlign="left"
                              py={1}
                              pr={1}
                              pl={3}
                              borderBottom={borderBottom}
                            >
                              <SuiTypography variant="body2" color="text">
                                {value.morning}
                              </SuiTypography>
                            </SuiBox>
                            <SuiBox
                              component="td"
                              textAlign="left"
                              py={1}
                              pr={1}
                              pl={3}
                              borderBottom={borderBottom}
                            >
                              <SuiTypography variant="body2" color="text">
                                {value.noon}
                              </SuiTypography>
                            </SuiBox>
                            <SuiBox
                              component="td"
                              textAlign="left"
                              py={1}
                              pr={1}
                              pl={3}
                              borderBottom={borderBottom}
                            >
                              <SuiTypography variant="body2" color="text">
                                {value.night}
                              </SuiTypography>
                            </SuiBox>
                            <SuiBox
                              component="td"
                              textAlign="left"
                              py={1}
                              pr={1}
                              pl={3}
                              borderBottom={borderBottom}
                            >
                              <SuiTypography variant="body2" color="text">
                                {value.taking}
                              </SuiTypography>
                            </SuiBox>
                            <SuiBox
                              component="td"
                              textAlign="left"
                              py={1}
                              pr={1}
                              pl={3}
                              borderBottom={borderBottom}
                            >
                              <SuiTypography variant="body2" color="text">
                                {value.days}
                              </SuiTypography>
                            </SuiBox>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </SuiBox>
                </SuiBox>
                <SuiBox p={3} mt={7}>
                  <Grid container>
                    <Grid item xs={12} lg={5}>
                      <SuiTypography variant="h5" fontWeight="medium">
                        Thank you!
                      </SuiTypography>
                      <SuiBox mt={1} mb={2} lineHeight={0}>
                        <SuiTypography variant="button" fontWeight="regular" color="secondary">
                          If you encounter any issues related to the medicine you can contact us at:
                        </SuiTypography>
                      </SuiBox>
                      <SuiTypography
                        component="span"
                        variant="h6"
                        fontWeight="medium"
                        color="secondary"
                      >
                        email:{" "}
                        <SuiTypography component="span" variant="h6" fontWeight="medium">
                          zhhs@gmail.com
                        </SuiTypography>
                      </SuiTypography>
                    </Grid>
                    <Grid item xs={12} lg={7}>
                      <SuiBox
                        width="100%"
                        height={{ xs: "auto", md: "100%" }}
                        display="flex"
                        justifyContent={{ xs: "flex-start", md: "flex-end" }}
                        alignItems="flex-end"
                        mt={{ xs: 2, md: 0 }}
                      >
                        <SuiButton variant="gradient" color="info" onClick={printHandler}>
                          print
                        </SuiButton>
                      </SuiBox>
                    </Grid>
                  </Grid>
                </SuiBox>
              </Card>
            </Grid>
          </Grid>
        </SuiBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default PatientPrescription;
