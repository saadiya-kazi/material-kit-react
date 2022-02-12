import React from "react";
import Head from "next/head";
import { Box, Container, Modal, Typography, TextField } from "@mui/material";
import { CustomerListResults } from "../components/calendar/customer-list-results";
import { CustomerListToolbar } from "../components/calendar/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { withFormik } from "formik";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class CalendarC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timetable: [],
      open: false,
      value: new Date(),
    };
  }

  componentDidMount() {
    console.log(
      'new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()',
      new Date().getFullYear() + "-0" + new Date().getMonth() + 1 + "-" + new Date().getDate()
    );
    axios
      .post("http://192.168.43.76/api/getScheduleList", {
        date: "2022-02-12",
        //   new Date().getFullYear() + "-0" + new Date().getMonth() + 1 + "-" + new Date().getDate(),
      })
      .then((res) => res.data)
      .then((data) => {
        console.log("data getScheduleList", JSON.stringify(data, null, 2));
        this.setState({
          timetable: data.data,
        });
      })
      .catch((err) => {
        console.log("getScheduleList error", err);
      });
  }
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  addToCoach = () => {};
  onChange = (event) => {
    console.log("event", event);
    axios
      .post("http://192.168.43.76/api/getScheduleList", {
        date: "2022-02-13",
        //   new Date().getFullYear() + "-0" + new Date().getMonth() + 1 + "-" + new Date().getDate(),
      })
      .then((res) => res.data)
      .then((data) => {
        console.log("data getScheduleList", JSON.stringify(data, null, 2));
        this.setState({
          timetable: data.data,
        });
      })
      .catch((err) => {
        console.log("getScheduleList error", err);
      });
  };
  render() {
    return (
      <>
        <Head>
          <title>Calendar | FlexGym</title>
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
              <Calendar onChange={this.onChange} value={this.state.value} />
              <CustomerListResults customers={this.state.timetable} />
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
CalendarC.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CalendarC;
