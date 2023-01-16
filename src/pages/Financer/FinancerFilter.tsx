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
} from "./FinancerFilter.elements";

import { useTranslation } from "react-i18next";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import DataPickerComponent from "../../components/DataPicker/DataPickerComponent";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const FinancerFilter = ({ statusFinal }: any) => {
  const [valItemCheckBoxDtEmbarque, setItemCheckBoxDtEmbarque] = useState<any>("");
  const { filtro, DataFilters } = SetFilterData();
  const [titleFieldSearch, setTitleFieldSearchValue] = useState("");

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

  const setTitleFieldSearch = () => {
    switch (statusFinal) {
      case 'avencer':
        setTitleFieldSearchValue(t("acesso_financeiro_9"));
        break;
      case 'vencidos':
        setTitleFieldSearchValue(t("acesso_financeiro_10"));
        break;
      case 'pagos':
        setTitleFieldSearchValue(t("acesso_financeiro_10"));
        break;
      default:
        console.log(`Ocorreu erro ao carregar informacoes do campo`);
    }
  }


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

    if (e == "dt-vencimento-maior") {
      paramMaterial = {
        id: "1",
        name: "desc",
        idCampo: "dt-vencimento-maior",
      };
      fieldsValue.push(paramMaterial);
    } else if (e == "dt-vencimento-menor") {
      paramMaterial = {
        id: "2",
        name: "asc",
        idCampo: "dt-vencimento-menor",
      };
      fieldsValue.push(paramMaterial);
    }  else if (e == "dt-valor-total-maior") {
      paramMaterial = {
        id: '3',
        name: "dt-valor-total-maior",
        idCampo: "dt-valor-total-maior",
      };
      fieldsValue.push(paramMaterial);
    }else if (e == "dt-valor-total-menor") {
      paramMaterial = {
        id: '4',
        name: "dt-valor-total-menor",
        idCampo: "dt-valor-total-menor",
      };
      fieldsValue.push(paramMaterial);
    }else if (e == "dt-embarque-menor") {
      paramMaterial = {
        id: '5',
        name: "dt-embarque-menor",
        idCampo: "dt-embarque-menor",
      };
      fieldsValue.push(paramMaterial);
    }else if (e == "dt-embarque-maior") {
      paramMaterial = {
        id: '6',
        name: "dt-embarque-maior",
        idCampo: "dt-embarque-maior",
      };
      fieldsValue.push(paramMaterial);
    }else if (e == "fatura-maior") {
      paramMaterial = {
        id: '7',
        name: "fatura-maior",
        idCampo: "fatura-maior",
      };
      fieldsValue.push(paramMaterial);
    }else if (e == "fatura-menor") {
      paramMaterial = {
        id: '8',
        name: "fatura-menor",
        idCampo: "fatura-menor",
      };
      fieldsValue.push(paramMaterial);
    }else if (e == "dt-pagamento-maior") {
      paramMaterial = {
        id: '9',
        name: "dt-pagamento-maior",
        idCampo: "dt-pagamento-maior",
      };
      fieldsValue.push(paramMaterial);
    }else if (e == "dt-pagamento-menor") {
      paramMaterial = {
        id: '9',
        name: "dt-pagamento-menor",
        idCampo: "dt-pagamento-menor",
      };
      fieldsValue.push(paramMaterial);
    }

    await DataFilters(fieldsValue);
  };

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setTitleFieldSearch();
      const checkbox = (document.getElementById('buscaPedidos') as HTMLInputElement);
      checkbox.value = '';
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
  }, [statusFinal]);

  return (
    <Container>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <H4Font size="20px">{t("meus_embarques_1")}</H4Font>

            <InputSearch
              type="text"
              placeholder={
                statusFinal == "wallet" ? t("acesso_financeiro_27") : t("acesso_financeiro_27")
              }
              onChange={handleSearchTextChange}
              id='buscaPedidos'
            /><BsSearch className="style-myorders-search" />
          </div>
          <div className="col-md-4"> 
            <form>
              <H4Font size="20px">{t("meus_pedidos_46")}</H4Font>
             
              <Form.Select className="style-selecte-myorders"
                onChange={e => handleSearchTextChangeDtEmbarque(e.target.value)}>

                <option className="custom-option"
                  id={`nenhum-item`}
                  label={t('cole_section_5')}
                  value={`nenhum-item`}>
                </option>

                <option className={statusFinal == 'paid' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-pagamento-maior`}
                  value={`dt-pagamento-maior`}
                  label={t("acesso_financeiro_32")}>
                </option>

                <option className={statusFinal == 'paid' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-pagamento-menor`}
                  value={`dt-pagamento-menor`}
                  label={t("acesso_financeiro_33")}>
                </option>

                <option className={statusFinal == 'toexpire' || statusFinal == 'expired' || statusFinal == 'paid'  ? "custom-option" : "custom-option style-hidden"}
                  id={`fatura-maior`}
                  value={`fatura-maior`}
                  label={t("acesso_financeiro_30")}>
                </option>

                <option className={statusFinal == 'toexpire' || statusFinal == 'expired' || statusFinal == 'paid'  ? "custom-option" : "custom-option style-hidden"}
                  id={`fatura-menor`}
                  value={`fatura-menor`}
                  label={t("acesso_financeiro_31")}>
                </option>
               
                <option className={statusFinal == 'toexpire' || statusFinal == 'expired' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-vencimento-maior`}
                  value={`dt-vencimento-maior`}
                  label={t("meus_pedidos_47")}>
                </option>
                <option className={statusFinal == 'toexpire' || statusFinal == 'expired' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-vencimento-menor`}
                  value={`dt-vencimento-menor`}
                  label={t("meus_pedidos_48")}>
                </option>     

                  <option className={statusFinal == 'toexpire' || statusFinal == 'expired' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-embarque-maior`}
                  value={`dt-embarque-maior`}
                  label={t("acesso_financeiro_28")}>
                </option>
                <option className={statusFinal == 'toexpire' || statusFinal == 'expired' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-embarque-menor`}
                  value={`dt-embarque-menor`}
                  label={t("acesso_financeiro_29")}>
                </option>                  

                <option className={statusFinal == 'toexpire' || statusFinal == 'expired' || statusFinal == 'paid' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-valor-total-maior`}
                  value={`dt-valor-total-maior`}
                  label={t("meus_pedidos_17")}>
                </option>
                <option className={statusFinal == 'toexpire' || statusFinal == 'expired' || statusFinal == 'paid' ? "custom-option" : "custom-option style-hidden"}
                  id={`dt-valor-total-menor`}
                  value={`dt-valor-total-menor`}
                  label={t("meus_pedidos_18")}>
                </option>             
              </Form.Select>
            </form>
          </div>
          <div className="col-md-4">
            <DataPickerComponent item={'financer'+statusFinal}/>
          </div> 
        </div>
      </div>
    </Container>
  );
};

export default FinancerFilter;
