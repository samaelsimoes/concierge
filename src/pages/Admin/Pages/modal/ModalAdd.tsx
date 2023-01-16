import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import FormButton from "../../../../components/FormButton";
import ApiAdm from "../../ApiAdm/ApiAdm";
import ImagemModalEdit from "./ImagemModalEdit";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface RefObject {
  refPacking: () => void;
}

const ModalAdd = ({ stateModal, pageLocal, local }:any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);  
  }
  
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState<any>();
  const [image, setImage] = useState<any>('');

  const setFiles = async (e:any) => {     
    setImage(e.target.files[0]);
  }

  const addBanner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && image) {
      await serviceAdd();
    }
  }

  const serviceAdd = async () => {
    const formData = new FormData();
    formData.append("id", local + Math.floor(Math.random() * 100));  
    formData.append("name", title);  
    formData.append("page", pageLocal);  
    formData.append("file", image);  

    let baseURL = "/banner/insert";

    await ApiAdm.post(baseURL, formData,      
      { headers: { 
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        Authorization: 'Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ', 
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      toast.success("Banner cadastrado com Sucesso");    
      stateModal(true);  
    });
  }

  useEffect(() => {

  }, [
    image
  ]);

  return (
    <>
      <button type="button" className="btn btn-success"  onClick={handleShow}>
        {/*t("grid_table_1")*/}Cadastrar
      </button>

      <Modal show={show} onHide={handleClose} className="style-modal-adm">
        <Modal.Header closeButton>
          <Modal.Title>Cadastro banner</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <form onSubmit={addBanner}>
            <div className="form-group">
               
              <label htmlFor="imagem_banner">Imagem:</label>

              <input
                id="imagem_banner"
                name="imagem_banner"
                type="file"
                className='form-control'
                onChange={setFiles}
              />
            </div>
            <br/>
            <div className="form-group">
              <label htmlFor="title_banner">Titulo:</label>

              <input
                id="title_banner"
                name="title_banner"
                type="text"
                onChange={event => setTitle(event.target.value)}
                className="form-control"
              />           
            </div>
            
            <div className="form-group style-btt-modal-adm"style={{ display: "flex", justifyContent: "end" }}>
              <button className="btn btn-primary style-padding-bottom-modal-adm style-width-btt" onClick={handleClose}>sair</button >
              <button className="btn btn-success style-width-btt-adm" type="submit" onClick={handleClose}>salvar</button >
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAdd;
