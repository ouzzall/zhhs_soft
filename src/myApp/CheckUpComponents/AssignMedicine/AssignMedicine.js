import Grid from "@mui/material/Grid";

import "main.css";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { useDispatch, useSelector } from "react-redux";
import { setShelfList, setSelfList } from "redux/patMedicines";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCapsules,
  faUserDoctor,
  faHospitalUser,
  faUserGroup,
  faMoneyBill1,
  faHouseUser,
  faPersonWalking,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Card from "@mui/material/Card";
import SuiSnackbar from "components/SuiSnackbar";

library.add(
  faCapsules,
  faHouseUser,
  faUserDoctor,
  faHospitalUser,
  faUserGroup,
  faMoneyBill1,
  faPersonWalking,
  faTrashCan,
  faPen
);

function AssignMedicine() {
  const { shelfMedList } = useSelector((state) => state.patMedicines);
  const { selfMedList } = useSelector((state) => state.patMedicines);
  // console.log(shelfMedList);
  const dispatch = useDispatch();
  const [medicinesData, setMedicinesData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);

  const [medShelfKey, setMedShelfKey] = useState(0);
  const [medSelfKey, setMedSelfKey] = useState(0);
  const [medShelfName, setMedShelfName] = useState("");
  const [medSelfName, setMedSelfName] = useState("");
  const [medMor, setMedMor] = useState(0);
  const [medNun, setMedNun] = useState(0);
  const [medNit, setMedNit] = useState(0);
  const [medDaz, setMedDaz] = useState(0);
  const [medTak, setMedTak] = useState("Tablet");
  const [medPri, setMedPri] = useState(0);
  const [medQty, setMedQty] = useState(0);
  const [medSpcName, setMedSpcName] = useState("");

  const [selectValue, setSelectValue] = useState({ value: "", label: "Search Here..." });
  const [selectValue2, setSelectValue2] = useState({ value: "", label: "Search Here..." });

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const handleClose4 = () => setOpen4(false);

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

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

  const closeInfoSB = () => setInfoSB(false);
  const renderInfoSB = (
    <SuiSnackbar
      color="info"
      icon="check"
      title={infoText}
      content=""
      dateTime=""
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const handleOpen = () => {
    // setMedKey(0);
    // setMedName("");
    setMedMor(0);
    setMedNun(0);
    setMedNit(0);
    setMedDaz(0);
    setMedTak("Tablet");
    // console.log(shelfMedList);

    let check3 = false;
    for (let i = 0; i < shelfMedList.length; i += 1) {
      if (shelfMedList[i].key === medShelfKey) {
        check3 = true;
        break;
      }
    }

    // console.log(check3);

    if (check3 === true) {
      // console.log("error3");
      // setOpen(false);
      setInfoText("Medicine Already Added");
      setInfoSB(true);
    } else if (medShelfName !== "") {
      setOpen(true);
    } else {
      // console.log("error2");
      setErrorText("Medicine Not Selected");
      setErrorSB(true);
    }
  };

  const handleOpen2 = () => {
    // setMedKey(0);
    // setMedName("");
    setMedMor(0);
    setMedNun(0);
    setMedNit(0);
    setMedDaz(0);
    setMedPri(0);
    setMedTak("Half Cup");
    // console.log(shelfMedList);

    // let check3 = false;
    // for (let i = 0; i < selfMedList.length; i += 1) {
    //   if (selfMedList[i].key === medSelfKey) {
    //     check3 = true;
    //     break;
    //   }
    // }

    // console.log(check3);

    // if (check3 === true) {
    //   // console.log("error3");
    //   // setOpen(false);
    //   setInfoText("Medicine Already Added");
    //   setInfoSB(true);
    // } else
    if (medSelfName !== "") {
      setOpen3(true);
    } else {
      // console.log("error2");
      setErrorText("Medicine Not Selected");
      setErrorSB(true);
    }
  };

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`https://zahidhd.tk/zahidhd/api/medicines/separated`, {
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
        setMedicinesData(result.data);
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
          setMedicinesData(null);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [`https://zahidhd.tk/zahidhd/api/medicines/separated`]);

  const newData1 = [];
  const newData2 = [];
  if (medicinesData) {
    // console.log(medicinesData[1], isPending, errorL);
    // console.log(medicinesData[1]);

    medicinesData[0].forEach((element) => {
      // console.log(element);
      newData1.push({ value: element.id, label: element.name });
    });

    medicinesData[1].forEach((element) => {
      // console.log(element);
      newData2.push({ value: element.id, label: element.name });
    });
  }

  function addToTable() {
    // console.log(medKey);
    // console.log(medName);
    // console.log(medMor);
    // console.log(medNun);
    // console.log(medNit);
    // console.log(medDaz);
    // console.log(medTak);

    // console.log(shelfMedList);

    if (medShelfKey === 0 || medTak === "") {
      // console.log("error");
      setErrorText("Medicine or taking not selected");
      setErrorSB(true);
    } else if (medDaz < 1) {
      setErrorText("Medicine days not defined");
      setErrorSB(true);
      // } else if (medMor === 0 && medNun === 0 && medNit === 0) {
      //   setErrorText("Medicine not assigned to any time");
      //   setErrorSB(true);
      // }
    } else if (medQty <= 0) {
      setErrorText("Medicine Quanity cannot be null or negative.");
      setErrorSB(true);
    } else {
      const finalObj = {
        key: medShelfKey,
        name: medShelfName,
        morning: medMor,
        noon: medNun,
        night: medNit,
        days: medDaz,
        taking: medTak,
        quantity: medQty,
      };

      // console.log(shelfMedList);
      dispatch(setShelfList(shelfMedList.concat(finalObj)));

      setOpen(false);
      setSuccessText("New Medicine Queued");
      setSuccessSB(true);

      setSelectValue({ value: "", label: "Search Here..." });
    }
  }

  function addToTable2() {
    // console.log(medKey);
    // console.log(medName);
    // console.log(medMor);
    // console.log(medNun);
    // console.log(medNit);
    // console.log(medDaz);
    // console.log(medTak);

    // console.log(shelfMedList);

    if (medSelfKey === 0 || medTak === "") {
      // console.log("error");
      setErrorText("Medicine or taking not selected");
      setErrorSB(true);
    } else if (medSpcName === "" || medSpcName === null) {
      setErrorText("Medicine New Name not defined");
      setErrorSB(true);
    } else if (medPri < 1) {
      setErrorText("Medicine Price not defined");
      setErrorSB(true);
    } else if (medDaz < 1) {
      setErrorText("Medicine days not defined");
      setErrorSB(true);
    } else if (medMor === 0 && medNun === 0 && medNit === 0) {
      setErrorText("Medicine not assigned to any time");
      setErrorSB(true);
    } else {
      const finalObj = {
        key: medSelfKey,
        name: medSelfName,
        morning: medMor,
        noon: medNun,
        night: medNit,
        days: medDaz,
        taking: medTak,
        price: medPri,
        new_name: medSpcName,
      };

      // console.log(shelfMedList);
      dispatch(setSelfList(selfMedList.concat(finalObj)));

      setOpen3(false);
      setSuccessText("New Medicine Queued");
      setSuccessSB(true);

      setSelectValue2({ value: "", label: "Search Here..." });
    }
  }

  function editToTable() {
    // console.log(medKey);
    // console.log(medName);
    // console.log(medMor);
    // console.log(medNun);
    // console.log(medNit);
    // console.log(medDaz);
    // console.log(medTak);

    // console.log(shelfMedList);

    const medicines = [...shelfMedList];
    // console.log(medicines[index]);
    // console.log(medicines[index].taking);

    // medicines.splice(parseInt(medKey, 36), 1);

    for (let i = 0; i < medicines.length; i += 1) {
      // console.log("CTH1");
      if (medicines[i].key === medShelfKey) {
        // console.log("CTH");
        medicines.splice(i, 1);
        break;
      }
    }

    // console.log(medicines);

    const finalObj = {
      key: medShelfKey,
      name: medShelfName,
      morning: medMor,
      noon: medNun,
      night: medNit,
      days: medDaz,
      taking: medTak,
      quantity: medQty,
    };

    // console.log(finalObj);
    medicines.push(finalObj);
    // console.log(medicines);
    dispatch(setShelfList(medicines));
    setOpen2(false);
    setSuccessText("Medicine Updated Successfully");
    setSuccessSB(true);
  }

  function editToTable2() {
    // console.log(medKey);
    // console.log(medName);
    // console.log(medMor);
    // console.log(medNun);
    // console.log(medNit);
    // console.log(medDaz);
    // console.log(medTak);

    // console.log(shelfMedList);

    const medicines = [...selfMedList];
    // console.log(medicines[index]);
    // console.log(medicines[index].taking);

    // medicines.splice(parseInt(medKey, 36), 1);

    for (let i = 0; i < medicines.length; i += 1) {
      // console.log("CTH1");
      if (medicines[i].key === medSelfKey) {
        // console.log("CTH");
        medicines.splice(i, 1);
        break;
      }
    }

    // console.log(medicines);

    const finalObj = {
      key: medSelfKey,
      name: medSelfName,
      morning: medMor,
      noon: medNun,
      night: medNit,
      days: medDaz,
      taking: medTak,
      price: medPri,
      new_name: medSpcName,
    };

    // console.log(finalObj);
    medicines.push(finalObj);
    // console.log(medicines);
    dispatch(setSelfList(medicines));
    setOpen4(false);
    setSuccessText("Medicine Updated Successfully");
    setSuccessSB(true);
  }

  function selectShelfHandler(e) {
    // console.log(e.value);
    // setNewShelfMedName(e.label);
    // setNewShelfMedKey(e.value);
    setMedShelfName(e.label);
    setMedShelfKey(e.value);

    setSelectValue({ value: e.value, label: e.label });
  }

  function selectSelfHandler(e) {
    // console.log(e.value);
    // setNewShelfMedName(e.label);
    // setNewShelfMedKey(e.value);
    setMedSelfName(e.label);
    setMedSelfKey(e.value);

    setSelectValue2({ value: e.value, label: e.label });
  }

  return (
    <SuiBox>
      {renderErrorSB}
      {renderSuccessSB}
      {renderInfoSB}
      <SuiBox width="80%" textAlign="center" mx="auto">
        <SuiBox>
          <SuiTypography variant="h5" fontWeight="regular">
            Assign Medicine
          </SuiTypography>
          <SuiTypography variant="body2" fontWeight="regular" color="text">
            Firstly Select any Medicine and then assign specifc quantity to the patient.
          </SuiTypography>
        </SuiBox>
      </SuiBox>
      <SuiBox>
        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Select Shelf Medicines
          </SuiTypography>
        </SuiBox>
        <Grid container spacing={3} pb={1}>
          <Grid item xs={12} md={12}>
            <SuiBox>
              <SuiBox>
                <Grid container spacing={1}>
                  <Grid item xs={9} md={5}>
                    {errorL && (
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <SuiBox p={3} pb={15}>
                          {errorL}
                        </SuiBox>
                      </Grid>
                    )}
                    {isPending && (
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <SuiBox>
                          <Oval color="#74c40e" height={30} width={30} />
                        </SuiBox>
                      </Grid>
                    )}
                    {medicinesData && (
                      <SuiSelect
                        defaultValue={{ value: "", label: "Search Here..." }}
                        value={selectValue}
                        options={newData1}
                        onChange={selectShelfHandler}
                      />
                    )}
                  </Grid>

                  <Grid item xs={3} md={1} justifyContent="flex-end" display="flex">
                    <SuiButton color="success" onClick={handleOpen}>
                      select
                    </SuiButton>
                  </Grid>
                </Grid>
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <SuiBox className="add_border ovr_flow" p={1} pb={4}>
              <SuiBox className="inside_width">
                <Grid container spacing={3} p={1}>
                  <Grid item xs={2} md={2}>
                    <SuiTypography variant="overline" fontWeight="regular" color="dark" pl={1.5}>
                      MEDICINE NAME
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      MRNG
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      NOON
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      NITE
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      QNTY
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      DAYS
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      TAKING
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={3} md={3} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      ACTION
                    </SuiTypography>
                  </Grid>
                </Grid>
                {shelfMedList &&
                  shelfMedList.map((value, index) => (
                    <Grid key={value.key} container spacing={3} p={1}>
                      <Grid item xs={2} md={2}>
                        <SuiTypography
                          variant="body2"
                          fontWeight="regular"
                          color="dark"
                          mt={1}
                          pl={1.5}
                        >
                          {value.name}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.morning}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.noon}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.night}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.quantity}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.days}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={2} md={2} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.taking}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={3} md={3} className="cnt_align">
                        <SuiBox>
                          <SuiButton
                            variant="gradient"
                            color="primary"
                            size="medium"
                            className="margin_right_cls"
                            onClick={() => {
                              // console.log(index);
                              const medicines = [...shelfMedList];
                              // console.log(medicines[index]);
                              setMedShelfKey(medicines[index].key);
                              setMedShelfName(medicines[index].name);
                              setMedMor(medicines[index].morning);
                              setMedNun(medicines[index].noon);
                              setMedNit(medicines[index].night);
                              setMedDaz(medicines[index].days);
                              setMedQty(medicines[index].quantity);
                              setMedTak(medicines[index].taking);
                              // console.log(medicines[index].taking);
                              setOpen2(true);
                              // medicines.splice(index, 1);
                              // console.log(medicines);
                              // dispatch(setShelfList([...medicines]));
                              // setSuccessText("Medicine Successfully Deleted");
                              // setSuccessSB(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-pen"
                              size="lg"
                              className="font_clr_2"
                            />
                          </SuiButton>
                          <SuiButton
                            variant="gradient"
                            color="primary"
                            size="medium"
                            onClick={() => {
                              // console.log(index);
                              const medicines = [...shelfMedList];
                              medicines.splice(index, 1);
                              dispatch(setShelfList([...medicines]));
                              setSuccessText("Medicine Successfully Deleted");
                              setSuccessSB(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-trash-can"
                              size="lg"
                              className="font_clr_2"
                            />
                          </SuiButton>
                        </SuiBox>
                      </Grid>
                    </Grid>
                  ))}
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox>
        <SuiBox mb={1} ml={0.5} lineHeight={0} display="inline-block" mt={3}>
          <SuiTypography component="label" variant="caption" fontWeight="bold">
            Select Self Medicines
          </SuiTypography>
        </SuiBox>
        <Grid container spacing={3} pb={1}>
          <Grid item xs={12} md={12}>
            <SuiBox>
              <SuiBox>
                <Grid container spacing={1}>
                  <Grid item xs={9} md={5}>
                    {errorL && (
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <SuiBox p={3} pb={15}>
                          {errorL}
                        </SuiBox>
                      </Grid>
                    )}
                    {isPending && (
                      <Grid container direction="row" justifyContent="center" alignItems="center">
                        <SuiBox>
                          <Oval color="#74c40e" height={30} width={30} />
                        </SuiBox>
                      </Grid>
                    )}
                    {medicinesData && (
                      <SuiSelect
                        defaultValue={{ value: "", label: "Search Here..." }}
                        options={newData2}
                        value={selectValue2}
                        onChange={selectSelfHandler}
                      />
                    )}
                  </Grid>
                  <Grid item xs={3} md={1} justifyContent="flex-end" display="flex">
                    <SuiButton color="success" onClick={handleOpen2}>
                      Select
                    </SuiButton>
                  </Grid>
                </Grid>
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <SuiBox className="add_border ovr_flow" p={1} pb={4}>
              <SuiBox className="inside_width">
                <Grid container spacing={3} p={1}>
                  <Grid item xs={2} md={2}>
                    <SuiTypography variant="overline" fontWeight="regular" color="dark" pl={1.5}>
                      MEDICINE NAME
                    </SuiTypography>
                  </Grid>

                  <Grid item xs={1} md={1}>
                    <SuiTypography variant="overline" fontWeight="regular" color="dark" pl={1.5}>
                      PRICE
                    </SuiTypography>
                  </Grid>

                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      MRNG
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      NOON
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      NITE
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      DAYS
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      TAKING
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={3} md={3} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      ACTION
                    </SuiTypography>
                  </Grid>
                </Grid>
                {selfMedList &&
                  selfMedList.map((value, index) => (
                    <Grid key={value.key} container spacing={3} p={1}>
                      <Grid item xs={2} md={2}>
                        <SuiTypography
                          variant="body2"
                          fontWeight="regular"
                          color="dark"
                          mt={1}
                          pl={1.5}
                        >
                          {`${value.name} (${value.new_name})`}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.price}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.morning}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.noon}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.night}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={1} md={1} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.days}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={2} md={2} className="cnt_align">
                        <SuiTypography variant="body2" mt={1} fontWeight="regular" color="dark">
                          {value.taking}
                        </SuiTypography>
                      </Grid>
                      <Grid item xs={3} md={3} className="cnt_align">
                        <SuiBox>
                          <SuiButton
                            variant="gradient"
                            color="primary"
                            size="medium"
                            className="margin_right_cls"
                            onClick={() => {
                              // console.log(index);
                              const medicines = [...selfMedList];
                              // console.log(medicines[index]);
                              setMedSelfKey(medicines[index].key);
                              setMedSelfName(medicines[index].name);
                              setMedMor(medicines[index].morning);
                              setMedNun(medicines[index].noon);
                              setMedNit(medicines[index].night);
                              setMedDaz(medicines[index].days);
                              setMedTak(medicines[index].taking);
                              setMedSpcName(medicines[index].new_name);
                              setMedPri(medicines[index].price);
                              // console.log(medicines[index].taking);
                              setOpen4(true);
                              // medicines.splice(index, 1);
                              // console.log(medicines);
                              // dispatch(setShelfList([...medicines]));
                              // setSuccessText("Medicine Successfully Deleted");
                              // setSuccessSB(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-pen"
                              size="lg"
                              className="font_clr_2"
                            />
                          </SuiButton>
                          <SuiButton
                            variant="gradient"
                            color="primary"
                            size="medium"
                            onClick={() => {
                              // console.log(index);
                              const medicines = [...selfMedList];
                              medicines.splice(index, 1);
                              dispatch(setSelfList([...medicines]));
                              setSuccessText("Medicine Successfully Deleted");
                              setSuccessSB(true);
                            }}
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-trash-can"
                              size="lg"
                              className="font_clr_2"
                            />
                          </SuiButton>
                        </SuiBox>
                      </Grid>
                    </Grid>
                  ))}
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <SuiBox mt={10} mb={30}>
            <Grid container justifyContent="center">
              <Grid item xs={10} lg={4}>
                <Card>
                  <SuiBox p={2}>
                    <SuiBox>
                      <SuiTypography variant="h5">Add Days and Quantity</SuiTypography>
                      <SuiBox mt={3}>
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Medicine
                            </SuiTypography>
                            <SuiTypography
                              mt={1.3}
                              variant="body2"
                              fontWeight="regular"
                              color="dark"
                            >
                              {medShelfName}
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Days
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedDaz(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Morning
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedMor(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Mid Day
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNun(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Night
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNit(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Quantity
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedQty(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Way of Taking
                            </SuiTypography>
                            <SuiSelect
                              defaultValue={{ value: "Tablet", label: "Tablet" }}
                              options={[
                                { value: "Table Spoon", label: "Table Spoon" },
                                { value: "Tea Spoon", label: "Tea Spoon" },
                                { value: "Tablet", label: "Tablet" },
                                { value: "Capsule", label: "Capsule" },
                                { value: "Half Cup", label: "Half Cup" },
                                { value: "Full Cup", label: "Full Cup" },
                              ]}
                              onChange={(e) => setMedTak(e.value)}
                            />
                          </Grid>
                        </Grid>
                      </SuiBox>
                    </SuiBox>
                    <Grid container justifyContent="flex-end" mt={2}>
                      <SuiButton variant="gradient" color="success" onClick={addToTable}>
                        Add
                      </SuiButton>
                    </Grid>
                  </SuiBox>
                </Card>
              </Grid>
            </Grid>
          </SuiBox>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <SuiBox mt={10} mb={30}>
            <Grid container justifyContent="center">
              <Grid item xs={10} lg={4}>
                <Card>
                  <SuiBox p={2}>
                    <SuiBox>
                      <SuiTypography variant="h5">Edit Days and Quantity</SuiTypography>
                      <SuiBox mt={3}>
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Medicine
                            </SuiTypography>
                            <SuiTypography
                              mt={1.3}
                              variant="body2"
                              fontWeight="regular"
                              color="dark"
                            >
                              {medShelfName}
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Days
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedDaz(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medDaz}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Morning
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedMor(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medMor}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Mid Day
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNun(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medNun}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Night
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNit(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medNit}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Quantity
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedQty(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medQty}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Way of Taking
                            </SuiTypography>
                            <SuiSelect
                              defaultValue={{ value: medTak, label: medTak }}
                              options={[
                                { value: "Table Spoon", label: "Table Spoon" },
                                { value: "Tea Spoon", label: "Tea Spoon" },
                                { value: "Tablet", label: "Tablet" },
                                { value: "Capsule", label: "Capsule" },
                                { value: "Half Cup", label: "Half Cup" },
                                { value: "Full Cup", label: "Full Cup" },
                              ]}
                              onChange={(e) => setMedTak(e.value)}
                            />
                          </Grid>
                        </Grid>
                      </SuiBox>
                    </SuiBox>
                    <Grid container justifyContent="flex-end" mt={2}>
                      <SuiButton variant="gradient" color="success" onClick={editToTable}>
                        Update
                      </SuiButton>
                    </Grid>
                  </SuiBox>
                </Card>
              </Grid>
            </Grid>
          </SuiBox>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open3}
        onClose={handleClose3}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open3}>
          <SuiBox mt={10} mb={30}>
            <Grid container justifyContent="center">
              <Grid item xs={10} lg={4}>
                <Card>
                  <SuiBox p={2}>
                    <SuiBox>
                      <SuiTypography variant="h5">Add Days, Quantity and Price </SuiTypography>
                      <SuiBox mt={3}>
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Medicine
                            </SuiTypography>
                            <SuiTypography
                              mt={1.3}
                              variant="body2"
                              fontWeight="regular"
                              color="dark"
                            >
                              {medSelfName}
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Price
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedPri(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Days
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedDaz(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Specify Medicine Name
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedSpcName(e.target.value)}
                                inputProps={{ type: "text" }}
                                placeholder="eg. Shahi"
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Way of Taking
                            </SuiTypography>
                            <SuiSelect
                              defaultValue={{ value: "Tablet", label: "Tablet" }}
                              options={[
                                { value: "Table Spoon", label: "Table Spoon" },
                                { value: "Tea Spoon", label: "Tea Spoon" },
                                { value: "Tablet", label: "Tablet" },
                                { value: "Capsule", label: "Capsule" },
                                { value: "Half Cup", label: "Half Cup" },
                                { value: "Full Cup", label: "Full Cup" },
                              ]}
                              onChange={(e) => setMedTak(e.value)}
                            />
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Morning
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedMor(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Mid Day
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNun(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Night
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNit(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={0}
                              />
                            </SuiTypography>
                          </Grid>
                        </Grid>
                      </SuiBox>
                    </SuiBox>
                    <Grid container justifyContent="flex-end" mt={2}>
                      <SuiButton variant="gradient" color="success" onClick={addToTable2}>
                        Add
                      </SuiButton>
                    </Grid>
                  </SuiBox>
                </Card>
              </Grid>
            </Grid>
          </SuiBox>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open4}
        onClose={handleClose4}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open4}>
          <SuiBox mt={10} mb={30}>
            <Grid container justifyContent="center">
              <Grid item xs={10} lg={4}>
                <Card>
                  <SuiBox p={2}>
                    <SuiBox>
                      <SuiTypography variant="h5">Edit Days, Quantity and Price </SuiTypography>
                      <SuiBox mt={3}>
                        <Grid container spacing={3}>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Medicine
                            </SuiTypography>
                            <SuiTypography
                              mt={1.3}
                              variant="body2"
                              fontWeight="regular"
                              color="dark"
                            >
                              {medSelfName}
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Price
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedPri(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medPri}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={3} md={3}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Days
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedDaz(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medDaz}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Specify Medicine Name
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedSpcName(e.target.value)}
                                inputProps={{ type: "text" }}
                                defaultValue={medSpcName}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={6} md={6}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Way of Taking
                            </SuiTypography>
                            <SuiSelect
                              defaultValue={{ value: medTak, label: medTak }}
                              options={[
                                { value: "Table Spoon", label: "Table Spoon" },
                                { value: "Tea Spoon", label: "Tea Spoon" },
                                { value: "Tablet", label: "Tablet" },
                                { value: "Capsule", label: "Capsule" },
                                { value: "Half Cup", label: "Half Cup" },
                                { value: "Full Cup", label: "Full Cup" },
                              ]}
                              onChange={(e) => setMedTak(e.value)}
                            />
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Morning
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedMor(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medMor}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Mid Day
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNun(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medNun}
                              />
                            </SuiTypography>
                          </Grid>
                          <Grid item xs={4} md={4}>
                            <SuiTypography variant="caption" fontWeight="bold" color="dark">
                              Night
                            </SuiTypography>
                            <SuiTypography variant="overline" fontWeight="regular" color="dark">
                              <SuiInput
                                onChange={(e) => setMedNit(e.target.value)}
                                inputProps={{ type: "number" }}
                                defaultValue={medNit}
                              />
                            </SuiTypography>
                          </Grid>
                        </Grid>
                      </SuiBox>
                    </SuiBox>
                    <Grid container justifyContent="flex-end" mt={2}>
                      <SuiButton variant="gradient" color="success" onClick={editToTable2}>
                        Update
                      </SuiButton>
                    </Grid>
                  </SuiBox>
                </Card>
              </Grid>
            </Grid>
          </SuiBox>
        </Fade>
      </Modal>
    </SuiBox>
  );
}

export default AssignMedicine;
