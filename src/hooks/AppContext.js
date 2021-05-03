import React, { createContext, useCallback, useEffect, useState } from "react";
import api from "../service/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [listPeople, setListPeople] = useState([]);
  const [people, setPeople] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    setLoading(true);
    await api.get("api/v1/pessoa/all").then((res) => {
      setListPeople(res.data);
    });
    setLoading(false);
  };

  const createPeople = useCallback(
    async ({ nome, cpf, nascimento, contato }) => {
      const peopleBuild = {
        nome,
        cpf,
        nascimento,
        contato,
      };
      await api
        .post("api/v1/pessoa", peopleBuild)
        .then((response) => {
          fetchPeople();
          toggleModal(false);
        })
        .catch((error) => {
          error.response.data.errors
            ? alert(error.response.data.errors[0].defaultMessage)
            : alert("Ooops ... este cpf não é valido");
        });
    },
    []
  );

  const updatePeople = useCallback(
    async ({ id, nome, cpf, nascimento, contato }) => {
      const peopleBuild = {
        id,
        nome,
        cpf,
        nascimento,
        contato,
      };
      await api
        .put(`api/v1/pessoa/${id}`, peopleBuild)
        .then((response) => {
          fetchPeople();
          toggleModal(false);
        })
        .catch((error) => {
          error.response.data.errors
            ? alert(error.response.data.errors[0].defaultMessage)
            : alert("Ooops ... este cpf não é valido");
        });
    },
    []
  );

  const deletePeople = useCallback(async (id) => {
    await api
      .delete(`api/v1/pessoa/${id}`)
      .then((response) => {
        fetchPeople();
        toggleModal(false);
      })
      .catch((error) => {
        alert("Ooops ... aconteceu algum erro, tente novamente");
      });
  }, []);

  const toggleModal = useCallback((toggle) => {
    setModal(toggle);
  }, []);

  return (
    <AppContext.Provider
      value={{
        people,
        modal,
        loading,
        listPeople,
        setPeople,
        toggleModal,
        createPeople,
        updatePeople,
        deletePeople,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
