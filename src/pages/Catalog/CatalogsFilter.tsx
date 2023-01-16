import {
  FC,
  FormEventHandler, useState
} from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputSearch from "../../components/InputSearch";
import { H4 } from "../../globalStyles";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import "../Collections/SideSearchFilter.css";
import { Container } from "./CatalogsFilter.elements";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const CatalogsFilter: FC = (event) => {

  const { filtro, DataFilters } = SetFilterData();
  const [language, setLanguage] = useState('');  

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

  interface FieldsFilter {
    id: number | string | boolean,
    name: string,
    idCampo: string
  }

  const { t } = useTranslation();    
  return (
    <Container>
      
      <div className="row">
        <H4 size="24px">{t('cole_section_2')}</H4>
        <InputSearch onChange={handleSearchTextChange}></InputSearch>   
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

export default CatalogsFilter;
