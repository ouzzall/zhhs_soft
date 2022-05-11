import Grid from "@mui/material/Grid";

import "main.css";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

import { useDispatch, useSelector } from "react-redux";
import { addMed } from "redux/patMedicines";

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
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

library.add(
  faCapsules,
  faHouseUser,
  faUserDoctor,
  faHospitalUser,
  faUserGroup,
  faMoneyBill1,
  faPersonWalking,
  faTrashCan
);

function AssignMedicine() {
  const { checkMedicines } = useSelector((state) => state.patMedicines);
  const dispatch = useDispatch();
  const [medicinesData, setMedicinesData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errorL, setError] = useState(null);
  const [newShelf, setNewShelf] = useState(checkMedicines);

  const [newShelfMedName, setNewShelfMedName] = useState("");
  const [newShelfMedKey, setNewShelfMedKey] = useState(0);

  // const [changing, setChanging] = useState("");
  // const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(`http://localhost/zhhs_soft_server/api/medicines/separated`, {
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
  }, [`http://localhost/zhhs_soft_server/api/medicines/separated`]);

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

  useEffect(() => {
    console.log(newShelf);
    dispatch(addMed(newShelf));
  }, [newShelf]);

  // useEffect(() => {
  //   // console.log(newShelf);
  //   // console.log(changing);
  //   setNewShelf(newShelf.filter((value) => value.key !== currentValue));
  //   dispatch(addMed(newShelf));
  // }, [changing]);

  function removeShelfMed(e) {
    console.log(e.target.value);
    // console.log(Math.random());
    // setChanging(Math.random());
    // console.log(changing);
    // setCurrentValue(e.target.value);
    // console.log(changing);
    // setCth(cth.filter((value) => value.name !== "abd 2"));
    // newShelf.filter((value) => console.log(value));
    // console.log(newShelf);
    // console.log(checkMedicines);
  }

  const ShelfMed = (
    <Grid key={newShelfMedKey} container spacing={3} p={1}>
      <Grid item xs={3} md={3}>
        <SuiTypography variant="body2" fontWeight="regular" color="dark" mt={1} pl={1.5}>
          {newShelfMedName}
        </SuiTypography>
      </Grid>
      <Grid item xs={1} md={1} className="cnt_align">
        <SuiTypography variant="overline" fontWeight="regular" color="dark">
          <SuiInput inputProps={{ type: "number" }} defaultValue={0} />
        </SuiTypography>
      </Grid>
      <Grid item xs={1} md={1} className="cnt_align">
        <SuiTypography variant="overline" fontWeight="regular" color="dark">
          <SuiInput inputProps={{ type: "number" }} defaultValue={0} />
        </SuiTypography>
      </Grid>
      <Grid item xs={1} md={1} className="cnt_align">
        <SuiTypography variant="overline" fontWeight="regular" color="dark">
          <SuiInput inputProps={{ type: "number" }} defaultValue={0} />
        </SuiTypography>
      </Grid>
      <Grid item xs={1} md={1} className="cnt_align">
        <SuiTypography variant="overline" fontWeight="regular" color="dark">
          <SuiInput inputProps={{ type: "number" }} defaultValue={0} />
        </SuiTypography>
      </Grid>
      <Grid item xs={3} md={3} className="cnt_align">
        <SuiSelect
          defaultValue={{ value: "Table Spoon", label: "Table Spoon" }}
          options={[
            { value: "Table Spoon", label: "Table Spoon" },
            { value: "Tea Spoon", label: "Tea Spoon" },
            { value: "Tablet", label: "Tablet" },
            { value: "Capsule", label: "Capsule" },
            { value: "Half Cup", label: "Half Cup" },
            { value: "Full Cup", label: "Full Cup" },
          ]}
        />
      </Grid>
      <Grid item xs={2} md={2} className="cnt_align">
        <SuiTypography variant="overline" fontWeight="regular" color="dark">
          <SuiButton
            value={newShelfMedKey}
            onClick={removeShelfMed}
            variant="gradient"
            color="primary"
            size="medium"
          >
            {/* <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg" className="font_clr_2" /> */}
            DEL
          </SuiButton>
        </SuiTypography>
      </Grid>
    </Grid>
  );

  function shelfAddHandler() {
    setNewShelf(() => newShelf.concat(ShelfMed));
    // console.log(somethingData);
    // console.log(newShelf);
  }

  function selectShelfHandler(e) {
    // console.log(e.value);
    setNewShelfMedName(e.label);
    setNewShelfMedKey(e.value);
  }

  return (
    <SuiBox>
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
                        options={newData1}
                        onChange={selectShelfHandler}
                      />
                    )}
                  </Grid>

                  <Grid item xs={3} md={1} justifyContent="flex-end" display="flex">
                    <SuiButton color="success" onClick={shelfAddHandler}>
                      Add
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
                  <Grid item xs={3} md={3}>
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
                      DAYS
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={3} md={3} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      TAKING
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      ACTION
                    </SuiTypography>
                  </Grid>
                </Grid>
                {newShelf && newShelf}
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
                    <SuiSelect
                      defaultValue={{ value: "", label: "Search Here..." }}
                      options={[
                        { value: "Majoon", label: "Majoon" },
                        { value: "Sharbat", label: "Sharbat" },
                        { value: "Waddi Goli", label: "Waddi Goli" },
                        { value: "Nikki Goli", label: "Nikki Goli" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={3} md={1} justifyContent="flex-end" display="flex">
                    <SuiButton color="success">Add</SuiButton>
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

                  <Grid item xs={2} md={2}>
                    <SuiTypography variant="overline" fontWeight="regular" color="dark" pl={1.5}>
                      PRICE (PKR)
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
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      ACTION
                    </SuiTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} p={1}>
                  <Grid item xs={2} md={2}>
                    <SuiTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      mt={1}
                      pl={1.5}
                    >
                      Waddi Goli
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={2500} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={20} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
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
                    />
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiButton variant="gradient" color="primary" size="medium">
                        <FontAwesomeIcon
                          icon="fa-solid fa-trash-can"
                          size="lg"
                          className="font_clr_2"
                        />
                      </SuiButton>
                    </SuiTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} p={1}>
                  <Grid item xs={2} md={2}>
                    <SuiTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      mt={1}
                      pl={1.5}
                    >
                      Majoon
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1200} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={2} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={2} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={30} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiSelect
                      defaultValue={{ value: "Table Spoon", label: "Table Spoon" }}
                      options={[
                        { value: "Table Spoon", label: "Table Spoon" },
                        { value: "Tea Spoon", label: "Tea Spoon" },
                        { value: "Tablet", label: "Tablet" },
                        { value: "Capsule", label: "Capsule" },
                        { value: "Half Cup", label: "Half Cup" },
                        { value: "Full Cup", label: "Full Cup" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiButton variant="gradient" color="primary" size="medium">
                        <FontAwesomeIcon
                          icon="fa-solid fa-trash-can"
                          size="lg"
                          className="font_clr_2"
                        />
                      </SuiButton>
                    </SuiTypography>
                  </Grid>
                </Grid>
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      {/* <SuiBox>
        <Grid container spacing={3} pb={1}>
          <Grid item xs={12} md={12}>
            <SuiBox mt={3} display="flex" justifyContent="flex-start">
              <SuiTypography component="label" variant="caption" fontWeight="bold" mt={2}>
                Add Any Extras
              </SuiTypography>
              <SuiBox ml={2}>
                <SuiButton color="success">Add</SuiButton>
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

                  <Grid item xs={2} md={2}>
                    <SuiTypography variant="overline" fontWeight="regular" color="dark" pl={1.5}>
                      PRICE (PKR)
                    </SuiTypography>
                  </Grid>

                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      MRN
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      EVE
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      NIT
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
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      ACTION
                    </SuiTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} p={1}>
                  <Grid item xs={2} md={2}>
                    <SuiTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      mt={1}
                      pl={1.5}
                    >
                      Waddi Goli
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={2500} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={20} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
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
                    />
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiButton variant="gradient" color="primary" size="medium">
                        <FontAwesomeIcon
                          icon="fa-solid fa-trash-can"
                          size="lg"
                          className="font_clr_2"
                        />
                      </SuiButton>
                    </SuiTypography>
                  </Grid>
                </Grid>
                <Grid container spacing={3} p={1}>
                  <Grid item xs={2} md={2}>
                    <SuiTypography
                      variant="body2"
                      fontWeight="regular"
                      color="dark"
                      mt={1}
                      pl={1.5}
                    >
                      Majoon
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1200} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={2} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={1} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={2} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={1} md={1} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiInput inputProps={{ type: "number" }} defaultValue={30} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiSelect
                      defaultValue={{ value: "Table Spoon", label: "Table Spoon" }}
                      options={[
                        { value: "Table Spoon", label: "Table Spoon" },
                        { value: "Tea Spoon", label: "Tea Spoon" },
                        { value: "Tablet", label: "Tablet" },
                        { value: "Capsule", label: "Capsule" },
                        { value: "Half Cup", label: "Half Cup" },
                        { value: "Full Cup", label: "Full Cup" },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={2} md={2} className="cnt_align">
                    <SuiTypography variant="overline" fontWeight="regular" color="dark">
                      <SuiButton variant="gradient" color="primary" size="medium">
                        <FontAwesomeIcon
                          icon="fa-solid fa-trash-can"
                          size="lg"
                          className="font_clr_2"
                        />
                      </SuiButton>
                    </SuiTypography>
                  </Grid>
                </Grid>
              </SuiBox>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox> */}
    </SuiBox>
  );
}

export default AssignMedicine;
