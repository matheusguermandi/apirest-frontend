import React, { useState } from "react";
import { Container } from "reactstrap";

import RecordTable from "../../components/RecordTable.js";
import Header from "../../components/Header.js";
import RecordModal from "../../components/RecordModal.js";

const Home = () => {
  return (
    <Container style={{ marginTop: "7vh" }}>
      <Header />

      <RecordTable />

      <RecordModal />
    </Container>
  );
};

export default Home;
