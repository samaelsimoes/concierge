import React, { useEffect, useState } from "react";
import itensMenuAdminInterf from "./Interface/ItensMenuInterface";

interface MenuAdminProps {
    itensMenu: itensMenuAdminInterf[];
    checkMenu: any;
}

const MenuAdmin = (props: MenuAdminProps) => {
    
    const [itens, setItens] = useState<itensMenuAdminInterf[]>();
    const [enable, setEnableMenu] = useState<boolean>(false);

    useEffect(() => {
        setItens(props.itensMenu);
    }, []);

    const itemCheckMenu =  async(item:boolean, id:number) => {
        if(enable) {
            setEnableMenu(false);
        } else {
            setEnableMenu(item);
        }
    }    

    const itemMenuClose = async (id:number) => {
        setEnableMenu(false);
        props.checkMenu(id)
    }

    return (
        <ul className="nav flex-column bg-white mb-0">                   
            {itens?.map((item, index:number) => {
                return (  
                    <li className="nav-item" key={index}>
                        <a href="#" className="" onClick={() => item.subMenus?.length ? itemCheckMenu(true, item.id) : itemMenuClose(item.id)}>
                            {item.title}                                
                        </a>   
                        {enable ? item.subMenus?.map((itemSubMenu, index:number) => {    
                            return(
                                <ul className="nav flex-column bg-white mb-0 nav-sub-menu-ul" key={index+itemSubMenu.id} >                                    
                                    <li className="nav-item"  >
                                        <a href="#" className="" onClick={() => props.checkMenu(itemSubMenu.id)}>
                                        - {itemSubMenu.title}
                                        </a>   
                                    </li>
                                </ul>
                            )
                        }) : ""}
                    </li>   
                );
            })}
        </ul>
    );
};

export default MenuAdmin;
