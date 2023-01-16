import { FC } from "react";
import { useTranslation } from "react-i18next";
import { H4 } from "../../globalStyles";
import { DataContextFilterProvider } from "../../helpers/DataContextFilterConllectionsProvider";
import ItensShipments from "./ItensShipments";
import './Shipments.css';
import ShipmentsFilter from "./ShipmentsFilter";

const Shipments:FC = () => {
const { t } = useTranslation();
  return (
    <DataContextFilterProvider>
      <div className="section style-custom style-padding">
        <div className="row">
          <div className="col">
            <H4>{t('meus_embarques_5')}</H4>
          </div>
        </div>
        <div className="row style-line">
          <div className="col-sm-12">
            <div className="row">
              <ShipmentsFilter />
            </div>
            <div className="row">
              <ItensShipments />
            </div>            
          </div>
        </div>
      </div>
    </DataContextFilterProvider>
  );
};

export default Shipments;
