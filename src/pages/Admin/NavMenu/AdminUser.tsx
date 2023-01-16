import React, { useEffect, useState } from "react";
import itensMenuAdminInterf from "./Interface/ItensMenuInterface";
import { useKeycloak, withKeycloak } from "@react-keycloak/web";

const AdminUser = () => {
    const { keycloak } = useKeycloak();

    return (
        <div className="py-4 px-3 mb-4 bg-light">
            <div className="media d-flex align-items-center">
                <img src="https://bootstrapious.com/i/snippets/sn-v-nav/avatar.png" alt="..." width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" />
                <div className="media-body">
                    <h4 className="m-0">{keycloak.idTokenParsed?.["given_name"]}</h4>
                    <p className="font-weight-light text-muted mb-0">Web developer</p>
                </div>
            </div>           
        </div>
    );
};

export default AdminUser;
