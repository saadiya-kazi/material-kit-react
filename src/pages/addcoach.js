import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import faker from "@faker-js/faker";
import { DashboardLayout } from "../components/dashboard-layout";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  FormControl,
  NativeSelect,
  InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";

const AddClassRoom = () => {
  const router = useRouter();
  const [coaches, setCoaches] = useState([]);
  useEffect(() => {
    axios
      .get("http://192.168.43.76/api/getUserList")
      .then((res) => res.data)
      .then((data) => {
        console.log("data coach", JSON.stringify(data, null, 2));
        setCoaches(data.data);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      user_id: 0,
      // lastName: '',

      gym_id: 1,
      // policy: false,
    },
    validationSchema: Yup.object({
      //   email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      // class_room_name: Yup.string().max(255).required("class room name is required"),
      // lastName: Yup
      //   .string()
      //   .max(255)
      //   .required(
      //     'Last class_room_name is required'),
      //   password: Yup.string().max(255).required("Password is required"),
      // policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => {
      console.log("formik values", formik.values);
      axios
        .post("http://192.168.43.76/api/createCoaches", {
          user_id: parseInt(formik.values.id),
          gym_id: formik.values.gym_id,
        })
        .then((res) => res.data)
        .then((data) => {
          console.log("data coaches list", JSON.stringify(data, null, 2));
          data.success && router.push("/coaches");
        });
      // router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Add Coach</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink> */}
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Add a Coach
              </Typography>
            </Box>
            <FormControl fullWidth variant="outlined">
              <InputLabel variant="standard">User Name</InputLabel>
              <NativeSelect
                defaultValue={1}
                inputProps={{
                  name: "id",
                  id: "uncontrolled-native",
                }}
                onChange={formik.handleChange}
              >
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel variant="standard">Gym Name</InputLabel>
              <NativeSelect
                defaultValue={1}
                inputProps={{
                  name: "gym_id",
                  id: "uncontrolled-native",
                }}
                onChange={formik.handleChange}
              >
                {/* <option value={"admin"}>Admin</option> */}
                <option value={1}>fit45</option>
                <option value={2}>fit33</option>
              </NativeSelect>
            </FormControl>
            {/* <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                class_room_name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )} */}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Add coach
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};
AddClassRoom.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddClassRoom;
