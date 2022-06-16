/**
=========================================================
* Soft UI Dashboard PRO React - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiSnackbar from "components/SuiSnackbar";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImg from "assets/images/herbal.jpg";
import { useHistory } from "react-router-dom";

function SignIn() {
  const history = useHistory();
  // const [rememberMe, setRememberMe] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

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

  const [phone, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler(e) {
    e.preventDefault();

    // console.log(e);

    const formData = new FormData();

    formData.append("username", phone);
    formData.append("password", password);

    fetch("https://localhost/zhhs_soft_server/api/login", {
      method: "POST",
      // headers: { "content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === true) {
          localStorage.setItem("phone", data.data.phone);
          localStorage.setItem("name", data.data.name);
          history.replace("/dashboard");
          // console.log(data);
        } else if (data.status === false) {
          // console.log(data);
          setErrorText(data.message);
          setErrorSB(true);
        }
      });
  }

  return (
    <BasicLayout
      title="Zahid Herbal Dawakhana"
      description="There's rosemary, that's for remembrance. Pray you, love, remember."
      image={bgImg}
    >
      {renderErrorSB}
      <Card>
        <SuiBox pt={3} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Sign in
          </SuiTypography>
        </SuiBox>
        <SuiBox p={3}>
          <SuiBox component="form" role="form">
            <SuiBox mb={2}>
              <SuiInput
                type="text"
                placeholder="Phone"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </SuiBox>
            {/* <SuiBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </SuiTypography> 
            </SuiBox> */}
            <SuiBox mt={4} mb={1}>
              <SuiButton onClick={loginHandler} variant="gradient" color="info" fullWidth>
                sign in
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;
