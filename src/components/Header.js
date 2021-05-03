import React, { useCallback, useContext } from "react";

import { Row, Col, Button } from "reactstrap";
import { FiPlusCircle } from "react-icons/fi";
import { AppContext } from "../hooks/AppContext";

import logo from "../assets/logo.svg";

const Header = () => {
  const { toggleModal, setPeople } = useContext(AppContext);

  const openModal = useCallback(() => {
    setPeople({});
    toggleModal(true);
  }, []);

  return (
    <Row style={{ marginBottom: "1rem" }}>
      <Col md="12" style={{ marginBottom: "1rem" }}>
        <img src={logo} />
      </Col>
      <Col md="9">
        <h4>Gerenciamento de pessoas/contatos</h4>
      </Col>
      <Col md="3" className="clearfix">
        <Button
          color="success"
          className="float-right"
          title="Cadastrar"
          onClick={() => openModal()}
        >
          <FiPlusCircle size={17} /> Pessoa
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
