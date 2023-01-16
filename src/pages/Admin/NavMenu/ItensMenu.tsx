import { useEffect, useState } from "react";
import ManagerAbout from "../Pages/about/ManagerAbout";
import ManagerCatalog from "../Pages/catalog/ManagerCatalog";
import ManagerCollections from "../Pages/collection/ManagerCollections";
import ManagerHome from "../Pages/home/ManagerHome";
import ManagerInventory from "../Pages/inventory/ManagerInventory";
import ManageBanner from "../Pages/ManageBanner";
import ManageMenu from "../Pages/ManageMenu";
import ManagerAnalytics from "../Pages/ManagerAnalytics";
import Marketing from "../Pages/marketing/Marketing";
import ManagerShipments from "../Pages/shipments/ManagerShipments";

interface MenuProps {
    menu: number
}

const ItensMenu = (props: MenuProps) => {
    const [menu, setMenu] = useState<any>("");

    useEffect(() => {
        switch (props.menu) {
            case 1:
                setMenu(<ManageBanner />);
                break;
            case 2:
                setMenu(<ManageMenu />);
                break;
            case 3:
                setMenu(<ManagerAnalytics />);
                break;
            case 4:
                setMenu(<ManagerAnalytics />);
                break;
            case 5:
                setMenu(<ManagerHome />);
                break;
            case 6:
                setMenu(<ManagerCollections />);
                break;
            case 7:
                setMenu(<ManagerInventory />);
                break;
            case 8:
                setMenu(<ManagerCatalog />);
                break;
            case 9:
                setMenu(<ManagerShipments />);
                break;
            case 10:
                setMenu(<ManagerAbout />);
                break;
            case 11:
                setMenu(<Marketing />);
                break;
            default:
              
        }       
    }, [props.menu]);
    
    return (
        <div className="row">
            {menu}
        </div>
    );
};

export default ItensMenu;
