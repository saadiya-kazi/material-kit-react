import React from "react";
import Head from "next/head";
import { Box, Container, Modal, Typography, TextField } from "@mui/material";
import { CustomerListResults } from "../components/coach/customer-list-results";
import { CustomerListToolbar } from "../components/coach/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { withFormik } from "formik";

class Coaches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coaches: [],
      open: false,
    };
  }

  componentDidMount() {
    console.log("Coaches called");
    axios
      .get("http://192.168.43.76/api/listcoaches")
      .then((res) => res.data)
      .then((data) => {
        console.log("data list", JSON.stringify(data, null, 2));
        this.setState({
          coaches: data.data,
        });
      })
      .catch((err) => {
        console.log(" listcoaches error", err);
      });
  }
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  addToCoach = () => {};
  render() {
    return (
      <>
        <Head>
          <title>Coaches | FlexGym</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar
              openModal={() => {
                this.setState({
                  open: true,
                });
              }}
            />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults customers={this.state.coaches} />
            </Box>
          </Container>
          <Modal
            open={this.state.open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                flexGrow: 1,
                py: 8,
              }}
            ></Box>
          </Modal>
        </Box>
      </>
    );
  }
}
Coaches.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Coaches;
