import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";
import ApiAdm from "../../ApiAdm/ApiAdm";
import { ThumbImage } from "../ManagerAdmStyle.elements";
import { versionReact } from "../../../../components/Version/Version";

const ImagemModalEdit = ({imagem}:any) => {
  
  return (
    <>      
      <ThumbImage className="style-class-modal-edit-adm"
        src={`https://portobello.com.br/concierge/images/${imagem}` + '?v='+ versionReact()}                
      />               
    </>
  );
};

export default ImagemModalEdit;
