import Grid from "@mui/material/Grid";

import "main.css";

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiSelect from "components/SuiSelect";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

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
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setShelfMedicines } from "reducers/assignMedicineSlice";

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
  const shelfMedicines = useSelector((state) => state.assign_medicine.shelfMedicines);
  const selfMedicines = useSelector((state) => state.assign_medicine.selfMedicines);

  const [shelfMedicineInput, setShelfMedicineInput] = useState(null);
  const [selfMedicineInput, setSelfMedicineInput] = useState(null);
  const dispatch = useDispatch();

  const addShelfMedicine = () => {
    dispatch(setShelfMedicines([
      ...shelfMedicines,
      {
        id: shelfMedicineInput.value,
        name: shelfMedicineInput.label,
      }
    ]))
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
                    <SuiSelect
                      defaultValue={{ value: "", label: "Search Here..." }}
                      options={[
                        { value: "flagyl", label: "Flagyl" },
                        { value: "entamizole", label: "Entamizole" },
                        { value: "jamishirin", label: "Jamishirin" },
                        { value: "tootsyah", label: "Toot Siyah Sharbat" },
                        { value: "coeasyday", label: "Co-Easy Day" },
                      ]}
                      onChange={(event) => {
                        // console.log(event);
                        setShelfMedicineInput(event);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} md={1} justifyContent="flex-end" display="flex">
                    <SuiButton color="success" onClick={addShelfMedicine}>Add</SuiButton>
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
                {shelfMedicines.map((value, index) => (
                  <Grid container spacing={3} p={1}>
                  <Grid item xs={3} md={3}>
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
                      <SuiInput inputProps={{ type: "number" }} defaultValue={10} />
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={3} md={3} className="cnt_align">
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
                      <SuiButton variant="gradient" color="primary" size="medium" onClick={() => {
                        const medicines = [...shelfMedicines];
                        medicines.splice(index, 1);
                        dispatch(setShelfMedicines([...medicines]));
                      }}>
                        <FontAwesomeIcon
                          icon="fa-solid fa-trash-can"
                          size="lg"
                          className="font_clr_2"
                        />
                      </SuiButton>
                    </SuiTypography>
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
