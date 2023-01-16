import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import ApiAdm from "../../ApiAdm/ApiAdm";
import ImagemModalEdit from "./ImagemModalEdit";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const ModalEdit = ({ idCarousel, imageCarousel, titleCarousel, stateModal }:any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<any>('');
  const [idEdit, setIdCarousel] = useState<string>();

  const setFiles = (e:any) => {    
    setImage(e.target.files[0]);
  }

  const serviceEdit = async () => {
    let baseURL = "/banner/update/"+ idEdit;

    const formData = new FormData();
    formData.append("name", title);  
    formData.append("file", image);  

    await ApiAdm.put(baseURL, formData,
      
      { headers: { 
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        Authorization: 'Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ', 
        'Content-Type': 'multipart/form-data'
      } 
    })
    .then((response) => {
      toast.success("Banner editado com Sucesso");
      stateModal(true);      
    });
  }

  const editBanner = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (image && idCarousel) {
      serviceEdit();
    }
  }

  const modal = async () => {
    stateModal(true);
    handleClose();
  }

  useEffect(() => {
    setIdCarousel('');
    const fetchData = async () => {
      await setImage(image ? image : imageCarousel);
      await setIdCarousel(idCarousel);
      await setTitle(titleCarousel);
    };
    fetchData();
  }, [
    image
  ]);

  return (
    <>
      <button type="button" className="btn btn-warning padding-button-admin" onClick={handleShow}>Editar</button>   

      <Modal show={show} onHide={handleClose} className="style-modal-adm">
        <Modal.Header closeButton>
          <Modal.Title>Editar banner</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <form onSubmit={editBanner}>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-3">
                  <ImagemModalEdit imagem={image}/>
                </div>
                <div className="col-lg-9 style-padding-adm">
                  <label htmlFor="imagem_banner">Email address:</label>

                  <input
                    id="imagem_banner"
                    name="imagem_banner"
                    type="file"
                    className='form-control'
                    onChange={setFiles}
                  />
                </div>
              </div>               
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
                value={title}
              />           
            </div>
            
            <div className="form-group style-btt-modal-adm"style={{ display: "flex", justifyContent: "end" }}>
              <button className="btn btn-primary style-padding-bottom-modal-adm style-width-btt" onClick={handleClose}>sair</button >
              <button className="btn btn-success style-width-btt-adm" type="submit" onClick={() => modal()}>salvar</button >
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
