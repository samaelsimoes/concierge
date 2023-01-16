import React, {
  ChangeEventHandler,
  EventHandler,
  FC,
  useEffect,
  useState,
} from "react";
import {
  Container,
  ColumnContainer,
  InputSearch,
  RowContainer,
  LinkSmall,
  H4Font,
} from "./MyOrdersFilter.elements";
import { useTranslation } from "react-i18next";
import "../Collections/SideSearchFilter.css";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import DataPickerComponent from "../../components/DataPicker/DataPickerComponent";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const MyOrdersFilter = ({ item }: any) => {
  const [valItemCheckBoxDtEmbarque, setItemCheckBoxDtEmbarque] =
    useState<any>("");
  const { filtro, DataFilters } = SetFilterData();

  const handleSearchTextChangeDtEmbarque = async (e: any) => {
    await orderSelect(e);
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

  const orderSelect = async (e: any) => {
    let paramMaterial: any = {};
    let fieldsValue: Array<FieldsFilter> = [];

    if (e == "Dt-embarque-new") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "desc",
        idCampo: "Dt-embarque-new",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-embarque-old") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "asc",
        idCampo: "Dt-embarque-old",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-pedido-recente-maior") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "desc",
        idCampo: "Dt-pedido-recente-maior",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-pedido-recente-menor") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "asc",
        idCampo: "Dt-pedido-recente-menor",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-pedido-maior") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "desc",
        idCampo: "Dt-pedido-maior",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-pedido-menor") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "asc",
        idCampo: "Dt-pedido-menor",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-quantidade-itens-maior") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "desc",
        idCampo: "Dt-quantidade-itens-maior",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-quantidade-itens-menor") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "asc",
        idCampo: "Dt-quantidade-itens-menor",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-valor-total-maior") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "desc",
        idCampo: "Dt-valor-total-maior",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "Dt-valor-total-menor") {
      paramMaterial = {
        id: valItemCheckBoxDtEmbarque,
        name: "asc",
        idCampo: "Dt-valor-total-menor",
      };
      fieldsValue.push(paramMaterial);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const checkbox = document.getElementById(
        "buscaPedidos"
      ) as HTMLInputElement;
      checkbox.value = "";
      let paramMaterial: any = {};
      let fieldsValue: Array<FieldsFilter> = [];

      if (checkbox.value) {
        paramMaterial = {
          id: checkbox.value,
          name: "searchField",
          idCampo: "1SearchField",
        };
        fieldsValue.push(paramMaterial);
      }
      await DataFilters(fieldsValue);
    };
    fetchData();
  }, [item]);

  return (
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <H4Font size="20px">{t("meus_embarques_1")}</H4Font>

            <InputSearch
              type="text"
              placeholder={
                item == "wallet" ? t("meus_pedidos_37") : t("meus_pedidos_38")
              }
              onChange={handleSearchTextChange}
              id="buscaPedidos"
            />
            <BsSearch className="style-myorders-search" />
          </div>
          <div className="col-md-4">
            <form>
              <H4Font size="20px">{t("meus_pedidos_46")}</H4Font> 

              <Form.Select
                className="style-selecte-myorders"
                onChange={(e) =>
                  handleSearchTextChangeDtEmbarque(e.target.value)
                }
              >
                <option
                  className="custom-option"
                  id={`nenhum-item`}
                  label={t("cole_section_5")}
                  value={`nenhum-item`}
                >
                  {t("cole_section_5")}
                </option>

                <option
                  className="custom-option"
                  id={`dt-pedido-recente-maior`}
                  value={`Dt-pedido-recente-maior`}
                  label={t("meus_pedidos_11")}
                >
                  {t("meus_pedidos_11")}
                </option>

                <option
                  className="custom-option"
                  id={`dt-pedido-recente-menor`}
                  value={`Dt-pedido-recente-menor`}
                  label={t("meus_pedidos_12")}
                >
                  {t("meus_pedidos_12")}
                </option>

                <option
                  className={
                    item == "wallet"
                      ? "custom-option style-hidden"
                      : "custom-option"
                  }
                  id={`dt-pedido-maior`}
                  value={`Dt-pedido-maior`}
                  label={t("meus_pedidos_13")}
                  disabled={item == "wallet" ? true : false}
                >
                  {t("meus_pedidos_13")}
                </option>

                <option
                  className={
                    item == "wallet"
                      ? "custom-option style-hidden"
                      : "custom-option"
                  }
                  id={`dt-pedido-menor`}
                  value={`Dt-pedido-menor`}
                  label={t("meus_pedidos_14")}
                  disabled={item == "wallet" ? true : false}
                >
                  {t("meus_pedidos_14")}
                </option>

                <option
                  className="custom-option"
                  id={`dt-quantidade-itens-maior`}
                  value={`Dt-quantidade-itens-maior`}
                  label={t("meus_pedidos_15")}
                >
                  {t("meus_pedidos_15")}
                </option>

                <option
                  className="custom-option"
                  id={`dt-quantidade-itens-menor`}
                  value={`Dt-quantidade-itens-menor`}
                  label={t("meus_pedidos_16")}
                >
                  {t("meus_pedidos_16")}
                </option>

                <option
                  className="custom-option"
                  id={`dt-valor-total-maior`}
                  value={`Dt-valor-total-maior`}
                  label={t("meus_pedidos_17")}
                >
                  {t("meus_pedidos_17")}
                </option>
                <option
                  className="custom-option"
                  id={`dt-valor-total-menor`}
                  value={`Dt-valor-total-menor`}
                  label={t("meus_pedidos_18")}
                >
                  {t("meus_pedidos_18")}
                </option>
              </Form.Select>
            </form>
          </div>
          <div className="col-md-4">
            <DataPickerComponent item={'ordersC'}/>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyOrdersFilter;
