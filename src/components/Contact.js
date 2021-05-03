import React from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

const Contact = (props) => {
  const { idx, contato, handleContato } = props;

  const nomeId = `nome-${idx}`;
  const emailId = `email-${idx}`;
  const telfoneId = `telefone-${idx}`;

  return (
    <Row form key={`contato-${idx}`}>
      <Col md={4}>
        <FormGroup>
          <Label for={nomeId}>#{idx + 1} - Nome</Label>
          <Input
            type="text"
            name={nomeId}
            id={nomeId}
            data-idx={idx}
            alt="nome"
            placeholder="Preencha com o Nome"
            required
            value={contato[idx].nome}
            onChange={handleContato}
          />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label for={emailId}>#{idx + 1} - Email</Label>
          <Input
            type="email"
            name={emailId}
            id={emailId}
            data-idx={idx}
            alt="email"
            placeholder="Preencha com o Email"
            required
            value={contato[idx].email}
            onChange={handleContato}
          />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label for={telfoneId}>#{idx + 1} - Telefone</Label>
          <Input
            type="text"
            name={telfoneId}
            id={telfoneId}
            data-idx={idx}
            alt="telefone"
            placeholder="Preencha com o Telefone"
            required
            value={contato[idx].telefone}
            onChange={handleContato}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default Contact;
