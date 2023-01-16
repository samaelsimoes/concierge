import { FC, useEffect, useState } from "react";
import AdminUser from "./NavMenu/AdminUser";
import itensMenuAdminInterf from "./NavMenu/Interface/ItensMenuInterface";
import MenuAdmin from "./NavMenu/MenuAdmin";
import ItensMenu from "./NavMenu/ItensMenu";
import "./NavMenu/nav.css";
import Footer from "../../components/Footer/Footer";

const AdminAcess = () => {
    const [menu, setCurrentMenu] = useState<number>(1);

    const itensMenuAdmin:itensMenuAdminInterf[] = [
        { id: 1, title: "Banner", subMenus: [
            {id: 5, title: 'Home'},
            {id: 6, title: 'Collections'},
            {id: 7, title: 'Inventory'},
            {id: 8, title: 'Catalog'},
            {id: 9, title: 'Shipments'},
            {id: 10, title: 'About'},
            {id: 11, title: 'Marketing'}
        ]},
        { id: 2, title: "Menu"},
        { id: 3, title: "Analytics"}
    ];

    const menuControl =  async(id:number) => {
        setCurrentMenu(id);
    }
    
    const checkMenu = (id:number) => menuControl(id); 

    useEffect(() => {
        setCurrentMenu(1);
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="vertical-nav bg-white" id="sidebar">
                    <AdminUser />
                    <MenuAdmin
                        itensMenu={itensMenuAdmin}
                        checkMenu={checkMenu}
                    />                    
                </div>
                <div className="page-content p-5" id="content">                
                    <ItensMenu menu={menu}/>
                    <Footer/>
                </div>
            </div>           
        </div>
    );
};
export default AdminAcess;
