import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
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

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      // lastName: '',
      password: "",
      role: "member",
      // policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      // lastName: Yup
      //   .string()
      //   .max(255)
      //   .required(
      //     'Last name is required'),
      password: Yup.string().max(255).required("Password is required"),
      // policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: () => {
      console.log("formik values", formik.values);
      axios
        .post("http://192.168.43.76/api/signup", {
          ...formik.values,
          password_confirmation: formik.values.password,
          mobile: "67613407",
        })
        .then((res) => res.data)
        .then((data) => {
          console.log("data login", JSON.stringify(data, null, 2));
          data.success && router.push("/");
        });
      // router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Register </title>
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
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            {/* <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Last Name"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            /> */}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel variant="standard">Role</InputLabel>
              <NativeSelect
                defaultValue={"member"}
                inputProps={{
                  name: "role",
                  id: "uncontrolled-native",
                }}
                onChange={formik.handleChange}
              >
                {/* <option value={"admin"}>Admin</option> */}
                <option value={"coach"}>Coach</option>
                <option value={"member"}>Member</option>
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
                name="policy"
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
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
