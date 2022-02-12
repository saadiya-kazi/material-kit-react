import React from "react";
import Head from "next/head";
import { Box, Container, Modal, Typography, TextField } from "@mui/material";
import { CustomerListResults } from "../components/classroom/customer-list-results";
import { CustomerListToolbar } from "../components/classroom/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";

class ClassRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: [],
      open: false,
    };
  }

  componentDidMount() {
    console.log("classroom called");
    axios
      .get("http://192.168.43.76/api/gymlist")
      .then((res) => res.data)
      .then((data) => {
        console.log("data list", JSON.stringify(data.data, null, 2));
        this.setState({
          classroom: data.data,
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
  render() {
    return (
      <>
        <Head>
          <title>classroom | FlexGym</title>
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
              <CustomerListResults customers={this.state.classroom} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}
ClassRooms.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ClassRooms;
