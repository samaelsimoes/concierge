import {
  FC,
  FormEventHandler, useState
} from "react";
import { Form } from "react-bootstrap";
import { H4 } from "../../globalStyles";
import {
  Container
} from "./MarketingFilter.elements";

import { useTranslation } from "react-i18next";
import InputSearch from "../../components/InputSearch";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import "../Collections/SideSearchFilter.css";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const MarketingFilter: FC = (event) => {
  const { t } = useTranslation();
  const { filtro, DataFilters } = SetFilterData();
  const [language, setLanguage] = useState('');  

  const orderMarketing = (e:any) => {
    let param;
    let fieldsValue:Array<any> = [];
    const checkboxAsc = (document.getElementById("asc") as HTMLInputElement);
    const checkboxDesc = (document.getElementById("desc") as HTMLInputElement);

    if (e == 'asc') {
      checkboxDesc.checked = false;
      checkboxAsc.checked = true;
    } else {
      checkboxDesc.checked = true;
      checkboxAsc.checked = false;
    }
    
    switch (e) {
      case 'asc':       
        param = {
          id: "filterAscDesc",
          name: 'asc',
          type: 'filter'
        }
        fieldsValue.push(param);
        break;
      case 'desc':
        param = {
          id: "filterAscDesc",
          name: 'desc',
          type: 'filter'
        }
        fieldsValue.push(param);
        break;
      default:
        
    }
    DataFilters(fieldsValue);
  }

  const reportLanguage = (e:any) => {
    const portugues = document.getElementById("portugues") as HTMLInputElement;
    const english = document.getElementById("english") as HTMLInputElement;
    const espanhol = document.getElementById("espanol") as HTMLInputElement;
    let param;
    let fieldsValue:Array<any> = [];
    switch (e) {
      case 'pt_BR':
        setLanguage(e);
        english.checked = false;
        espanhol.checked = false;
        param = {
          id: "language",
          name: 'pt_BR',
          type: 'filter'
        }
        fieldsValue.push(param);
        break;
      case 'en_US':
        setLanguage(e);
        portugues.checked = false;
        espanhol.checked = false;
        param = {
          id: "language",
          name: 'en_US',
          type: 'filter'
        }
        fieldsValue.push(param);
        break;
      case 'es_ES':
        setLanguage(e);
        english.checked = false;
        portugues.checked = false;
        param = {
          id: "language",
          name: 'es_ES',
          type: 'es_ES'
        }
        fieldsValue.push(param);
        break;
      default:
    }
    DataFilters(fieldsValue);
  }

  const handleSearchTextChange: FormEventHandler<HTMLInputElement> = async (event) => {
    const value = (event.target as HTMLInputElement).value;

    let paramMaterial: any = {};
    let fieldsValue: Array<FieldsFilter> = [];

    if (value) {
      paramMaterial = {
        id: value,
        name: 'searchField',
        idCampo: "1SearchField"
      }
      fieldsValue.push(paramMaterial);
    }
    await DataFilters(fieldsValue);    
  };

  interface FieldValue {
    checked: string,
    count: string,
    id: string,
    name: string
  } 
  interface Fields {
    id: number,
    name: string,
    values: FieldValue[]
  }
  interface FieldsFilter {
    id: number | string | boolean,
    name: string,
    idCampo: string,
    type: string
  }


  return (
    <Container>
      <div className="row">
        <H4 size="24px">{t('cole_section_2')}</H4>
        <InputSearch onChange={handleSearchTextChange}></InputSearch>   
      </div>

      <div className="row">
        <div className="col">

          <H4 size="24px">{ t('meus_embarques_2') }</H4>

          <Form.Check
            name="asc"
            type="radio"
            id={`asc`}
            label={t('marketing_2')}
            value={'asc'}
            onChange={() => orderMarketing('asc')}         
          />

          <Form.Check
            name="desc"
            type="radio"
            id={`desc`}
            label={t('marketing_6')}
            value={'desc'}
            onChange={() => orderMarketing('desc')}         
          />
 
        </div>
      </div>

      <div className="row">
        <div className="col">

          <H4 size="24px">{ t('idiomas') }</H4>

          <Form.Check
            name="portugues"
            type="radio"
            id={`portugues`}
            label={t('portugues')}
            value={'Portugues'}
            onChange={() => reportLanguage('pt_BR')}
          />

          <Form.Check
            name="english"
            type="radio"
            id={`english`}
            label={t('english')}
            value={'English'}
            onChange={() => reportLanguage('en_US')}
          />

          <Form.Check
            name="espanol"
            type="radio"
            id={`espanol`}
            label={t('espanol')}
            value={'Espanol'}
            onChange={() => reportLanguage('es_ES')}
          />     
        </div>
      </div>
    </Container>
  );
    };

export default MarketingFilter;
