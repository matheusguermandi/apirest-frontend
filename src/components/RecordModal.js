import React, { useCallback, useContext, useState } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import { FiPlusCircle } from "react-icons/fi";
import { AppContext } from "../hooks/AppContext";
import Contact from "./Contact";

const RecordModal = () => {
  const {
    people,
    setPeople,
    modal,
    toggleModal,
    createPeople,
    updatePeople,
  } = useContext(AppContext);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const blankContato = { id: "", nome: "", email: "", telefone: "" };
  const [contato, setContato] = useState([blankContato]);

  const onOpened = () => {
    if (Object.keys(people).length !== 0) {
      setId(people.id);
      setNome(people.nome);
      setCpf(people.cpf);
      setNascimento(people.nascimento);
      setContato(people.contato);
    }
  };

  const addContato = () => {
    setContato([...contato, { ...blankContato }]);
  };

  const handleContato = (e) => {
    const updatedContato = [...contato];
    updatedContato[e.target.dataset.idx][e.target.alt] = e.target.value;
    setContato(updatedContato);
  };

  const closeModal = useCallback(() => {
    clearFields();
    toggleModal(false);
  }, []);

  const clearFields = () => {
    setPeople({});

    setId("");
    setNome("");
    setCpf("");
    setNascimento("");
    setContato([blankContato]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    !id
      ? await createPeople({
          nome: nome,
          cpf: cpf,
          nascimento: nascimento,
          contato: contato,
        })
      : await updatePeople({
          id: id,
          nome: nome,
          cpf: cpf,
          nascimento: nascimento,
          contato: contato,
        });
  };

  return (
    <Modal
      isOpen={modal}
      toggle={() => closeModal()}
      size="lg"
      onOpened={onOpened}
      onClosed={clearFields}
    >
      <ModalHeader toggle={() => closeModal()}>Pessoa</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="nome">Nome</Label>
                <Input
                  name="nome"
                  id="nome"
                  value={nome}
                  required
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Preencha com o Nome"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="cpf">CPF</Label>
                <Input
                  name="cpf"
                  id="cpf"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Preencha com o CPF"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="nascimento">Data de nascimento</Label>
                <Input
                  type="date"
                  name="nascimento"
                  id="nascimento"
                  max={new Date().toISOString().split("T")[0]}
                  required
                  value={nascimento}
                  onChange={(e) => setNascimento(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row style={{ margin: "25px" }}>
            <Col md={{ size: 12, offset: 5 }}>
              <Button color="success" onClick={addContato}>
                <FiPlusCircle size={17} /> Contato
              </Button>
            </Col>
          </Row>

          {contato.map((_, idx) => {
            return (
              <Contact
                key={`contato-${idx}`}
                idx={idx}
                contato={contato}
                handleContato={handleContato}
              />
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => closeModal()}>
            Cancelar
          </Button>{" "}
          <Button type="submit" color="success">
            Salvar
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default RecordModal;
