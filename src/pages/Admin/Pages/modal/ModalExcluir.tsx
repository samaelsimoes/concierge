import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import ApiAdm from "../../ApiAdm/ApiAdm";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);


const ModalExcluir = ({ id, stateModal }:any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [idItem, setIdItem] = useState<any>();

  const deleteItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (idItem) {
      serviceDelete();
    }
  }

  const serviceDelete = async () => {
    let baseURL = "/banner/delete/" + idItem;

    await ApiAdm.delete(baseURL,  
      { headers: { 
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        Authorization: 'Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ', 
        'Content-Type': 'application/json' 
      } 
    })
    .then((response) => {
      toast.success("Banner excluido com Sucesso");   
      stateModal(true);   
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      await setIdItem(id);
    };
    fetchData();
  }, [
    
  ]);

  return (
    <>
      <button type="button" className="btn btn-danger" onClick={handleShow}>Excluir</button>

      <Modal show={show} onHide={handleClose} className="style-modal-adm">
        <Modal.Header closeButton>
          <Modal.Title>Você deseja excluir esse banner?</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <form onSubmit={deleteItem}>            
            <div className="form-group style-btt-modal-adm"style={{ display: "flex", justifyContent: "end" }}>
              <button className="btn btn-primary style-padding-bottom-modal-adm style-width-btt" onClick={handleClose}>Não</button >
              <button className="btn btn-success style-width-btt-adm" type="submit" onClick={handleClose}>Sim</button >
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalExcluir;
