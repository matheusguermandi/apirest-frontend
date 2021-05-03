import React, { useEffect, useState } from "react";

import { Row, Col, Spinner } from "reactstrap";

const Loading = () => {
  return (
    <Row>
      <Col
        md="12"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
        }}
      >
        <Spinner style={{ width: "4rem", height: "4rem" }} />
      </Col>

      <h6 style={{ margin: "0 auto", paddingTop: "3rem" }}>
        Obs: nas primeiras requisições é um pouco demorado devido ao tempo de
        inicialização do servidor do Heroku
      </h6>
    </Row>
  );
};

export default Loading;
