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

// Images
// import logoCT from "assets/images/logo-ct.png";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function PatientBill() {
  const { borderWidth } = borders;
  const { light } = colors;
  const borderBottom = `${borderWidth[1]} solid ${light.main}`;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox mt={{ xs: 3, md: 3 }} mb={{ xs: 3, md: 3 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card>
              {/* Invoice header */}
              <SuiBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    {/* <SuiBox component="img" src={logoCT} width="25%" p={1} mb={1} /> */}
                    <SuiTypography variant="h6" fontWeight="medium" mt={2}>
                      Zahid Herbal Health Shop, near G. T. Road, Swami Nagar Lahore, Punjab,
                      Pakistan
                    </SuiTypography>
                    <SuiBox mt={1} mb={2}>
                      <SuiTypography display="block" variant="body2" color="secondary">
                        Phone: 0321-3487892
                      </SuiTypography>
                    </SuiBox>
                  </Grid>
                  <Grid item xs={12} md={7} lg={7}>
                    <SuiBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={2}>
                      <SuiBox mt={0}>
                        <SuiTypography variant="h6" fontWeight="medium">
                          Billed to: Mushtaq Shaffiq Bhatti
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox mb={1}>
                        <SuiTypography variant="body2" color="secondary">
                          Phone: 0322-4898598
                          {/* <br />
                          San Francisco CA
                          <br />
                          California */}
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                  </Grid>
                </Grid>
                <SuiBox mt={{ xs: 5, md: 5 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <SuiTypography variant="h6" color="secondary" fontWeight="medium">
                        Invoice No
                      </SuiTypography>
                      <SuiTypography variant="h6" fontWeight="medium">
                        #0453119
                      </SuiTypography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
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
                            Invoice Date:
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox width="50%">
                          <SuiTypography variant="h6" fontWeight="medium">
                            24/04/2022
                          </SuiTypography>
                        </SuiBox>
                      </SuiBox>
                      {/* <SuiBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <SuiBox width="50%">
                          <SuiTypography variant="h6" color="secondary" fontWeight="medium">
                            Due date:
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox width="50%">
                          <SuiTypography variant="h6" fontWeight="medium">
                            11/03/2019
                          </SuiTypography>
                        </SuiBox>
                      </SuiBox> */}
                    </Grid>
                  </Grid>
                </SuiBox>
              </SuiBox>

              {/* Invoice table */}
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
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Items
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
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Qty
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
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Rate
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
                          <SuiTypography variant="h6" color="text" fontWeight="medium">
                            Amount
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                    </SuiBox>
                    <TableBody>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1} borderBottom={borderBottom}>
                          <SuiTypography variant="body2" color="text">
                            Flagyl 10mg
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
                            1
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
                            9.00
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
                            9.00
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1} borderBottom={borderBottom}>
                          <SuiTypography variant="body2" color="text">
                            Majoon Specific 2
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
                            3
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
                            100.00
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
                            300.00
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1}>
                          <SuiTypography variant="body2" color="text">
                            Sandal Sharbat
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox component="td" textAlign="left" py={1} pr={1} pl={3}>
                          <SuiTypography variant="body2" color="text">
                            1
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox component="td" textAlign="left" py={1} pr={1} pl={3}>
                          <SuiTypography variant="body2" color="text">
                            89.00
                          </SuiTypography>
                        </SuiBox>
                        <SuiBox component="td" textAlign="left" py={1} pr={1} pl={3}>
                          <SuiTypography variant="body2" color="text">
                            89.00
                          </SuiTypography>
                        </SuiBox>
                      </TableRow>
                      <TableRow>
                        <SuiBox component="td" textAlign="left" p={1} borderBottom={borderBottom} />
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        />
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h5">Total</SuiTypography>
                        </SuiBox>
                        <SuiBox
                          component="td"
                          textAlign="left"
                          py={1}
                          pr={1}
                          pl={3}
                          borderBottom={borderBottom}
                        >
                          <SuiTypography variant="h5">Rs. 498</SuiTypography>
                        </SuiBox>
                      </TableRow>
                    </TableBody>
                  </Table>
                </SuiBox>
              </SuiBox>

              {/* Invoice footer */}
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
                      <SuiButton variant="gradient" color="info" onClick={() => window.print(this)}>
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
      <Footer />
    </DashboardLayout>
  );
}

export default PatientBill;
