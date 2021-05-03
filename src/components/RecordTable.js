import React, { useCallback, useContext, useEffect, useState } from "react";

import { Table, Button } from "reactstrap";
import { FiTrash2, FiEdit } from "react-icons/fi";

import { parseISO, format } from "date-fns";

import Loading from "./Loading.js";
import { AppContext } from "../hooks/AppContext.js";

const RecordTable = () => {
  const {
    toggleModal,
    setPeople,
    loading,
    listPeople,
    deletePeople,
  } = useContext(AppContext);

  const openModal = useCallback((p) => {
    setPeople(p);
    toggleModal(true);
  }, []);

  const handleDeletePeople = (id) => {
    try {
      if (
        window.confirm("Você tem certeza de que deseja remover este registro?")
      ) {
        deletePeople(id);
      }
    } catch (error) {
      alert("Oops ... houve algum erro, tente novamente!");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }}>#</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th style={{ width: "15%", textAlign: "center" }}>Opções</th>
        </tr>
      </thead>
      <tbody>
        {listPeople.map((p) => (
          <tr key={p.id}>
            <th scope="row" style={{ textAlign: "center" }}>
              {p.id}
            </th>
            <td>{p.nome}</td>
            <td>{p.cpf}</td>
            <td>{format(parseISO(p.nascimento), "dd/MM/yyyy")}</td>
            <td style={{ textAlign: "center" }}>
              <Button color="info" onClick={() => openModal(p)} title="Editar">
                <FiEdit size={17} />
              </Button>{" "}
              <Button
                color="danger"
                onClick={() => handleDeletePeople(p.id)}
                title="Excluir"
              >
                {" "}
                <FiTrash2 size={17} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RecordTable;
