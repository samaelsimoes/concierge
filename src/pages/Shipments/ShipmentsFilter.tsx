import React, {
  ChangeEventHandler,
  FC,
} from "react";
import {
  Container,
  InputSearch,
  H4Font,
} from "./ShipmentsFilter.elements";

import DataPickerComponent from "../../components/DataPicker/DataPickerComponent";

import { useTranslation } from "react-i18next";
import "../Collections/SideSearchFilter.css";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const InventoryFilter: FC = (event) => {

  const { filtro, DataFilters } = SetFilterData();

  const handleSearchTextChangeDtEmbarque = async (e: any) => {
    switch (e) {
      case 'Dt-embarque-new':
        searchFilter("Dt-embarque-new");
        break;
      case 'Dt-embarque-old':
        searchFilter("Dt-embarque-old");
        break;
      case 'Chegada-prevista-asc':
        searchFilter("Chegada-prevista-asc");
        break;
      case 'Chegada-prevista-descw':
        searchFilter("Chegada-prevista-desc");
        break;
      case 'fatura_asc':
        searchFilter("fatura_asc");
        break;
      case 'fatura_desc':
        searchFilter("fatura_desc");
        break;
      default:
        console.log(`erro ao carregar a ordenacao`);
    }
  };

  const handleSearchTextChange: ChangeEventHandler = async (event) => {
    const value = (event.target as HTMLInputElement).value;

    let paramMaterial: any = {};
    let fieldsValue: Array<FieldsFilter> = [];

    if (value) {
      paramMaterial = {
        id: value,
        name: "searchField",
        idCampo: "1SearchField",
      };
      fieldsValue.push(paramMaterial);
    }
    await DataFilters(fieldsValue);
  };

  const searchFilter = async (e: any) => {
    let paramMaterial: any = {};
    let fieldsValue: Array<FieldsFilter> = [];
    let urlFilter: any = "";

    if (e == "Dt-embarque-new") {
      paramMaterial = {
        id: 'dt-embarque-new',
        name: "dt-embarque-new",
        idCampo: "1field",
      };
      urlFilter += "?sort=" + "data_embarque";
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-embarque-old") {
      paramMaterial = {
        id: 'dt-embarque-old',
        name: "dt-embarque-old",
        idCampo: "2field",
      };
      urlFilter += "?sort=" + "data_embarque_asc";
      fieldsValue.push(paramMaterial);
    } else if (e == "Chegada-prevista-asc") {
      paramMaterial = {
        id: 'chegada-prevista-ass',
        name: "chegada-prevista-asc",
        idCampo: "3field",
      };
      urlFilter += "?sort=" + "data_embarque_asc";
      fieldsValue.push(paramMaterial);
    } else if (e == "Chegada-prevista-desc") {
      paramMaterial = {
        id: 'chegada-prevista-desc',
        name: "chegada-prevista-desc",
        idCampo: "4field",
      };
      urlFilter += "?sort=" + "data_embarque_asc";
      fieldsValue.push(paramMaterial);
    } else if (e == "fatura_asc") {
      paramMaterial = {
        id: 'fatura_asc',
        name: "fatura_asc",
        idCampo: "5field",
      };
      urlFilter += "?sort=" + "fatura_asc";
      fieldsValue.push(paramMaterial);
    } else if (e == "fatura_desc") {
      paramMaterial = {
        id: 'fatura_desc',
        name: "fatura_desc",
        idCampo: "6field",
      };
      urlFilter += "?sort=" + "fatura_desc";
      fieldsValue.push(paramMaterial);
    } else {
      urlFilter += '';
    }

    await DataFilters(fieldsValue);
  };

  interface FieldValue {
    checked: string;
    count: string;
    id: string;
    name: string;
  }
  interface Fields {
    id: number;
    name: string;
    values: FieldValue[];
  }
  interface FieldsFilter {
    id: number | string | boolean;
    name: string;
    idCampo: string;
  }

  const { t } = useTranslation();

  return (
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-md-4">

            <H4Font size="24px">{t("meus_embarques_1")}</H4Font>

            <InputSearch
              type="text"
              placeholder={t("meus_embarques_23")}
              onChange={handleSearchTextChange}
            /><BsSearch className="style-shipment-search" />
          </div>
          <div className="col-md-4">
            <form>

              <H4Font size="24px">{t("meus_embarques_2")}</H4Font>

              <Form.Select className="style-selecte-shipments"
                onChange={e => handleSearchTextChangeDtEmbarque(e.target.value)}>

                <option className="custom-option"
                  id={`nenhum-item`}
                  label={t('cole_section_5')}
                  value={`nenhum-item`}>
                </option>

                <option className="custom-option"
                  id={`dt-embarque-new`}
                  value={`Dt-embarque-new`}
                  label={t("meus_embarques_17")}>
                </option>

                <option className="custom-option"
                  id={`dt-embarque-old`}
                  value={`Dt-embarque-old`}
                  label={t("meus_embarques_18")}>
                </option>

                <option className="custom-option"
                  id={`fatura_asc`}
                  value={`fatura_asc`}
                  label={t("meus_embarques_21")}>
                </option>
                <option className="custom-option"
                  id={`fatura_desc`}
                  value={`fatura_desc`}
                  label={t("meus_embarques_22")}>
                </option>

                <option className="custom-option"
                  id={`chegada-prevista-asc`}
                  value={`Chegada-prevista-asc`}
                  label={t("meus_embarques_19")}>
                </option>

                <option className="custom-option"
                  id={`chegada-prevista-desc`}
                  value={`Chegada-prevista-desc`}
                  label={t("meus_embarques_20")}>
                </option>
              </Form.Select>
            </form>
          </div>
          <div className="col-md-4">
            <DataPickerComponent item={'shipments'}/>
          </div> 
        </div>
      </div>
    </Container>
  );
};

export default InventoryFilter;
