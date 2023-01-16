import i18next from "i18next";
import {
  FC,
  FormEventHandler,
  useEffect, useState
} from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InputSearch from "../../components/InputSearch";
import Api from "../../GlobalSerice/api";
import { H4, Paragraph } from "../../globalStyles";
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import "../Collections/SideSearchFilter.css";
import { CollectionsSearch, ColumnContainer, Container, LinkSmall, RowContainer } from "./SideSearchFilter.elements";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const SideSearchFilter: FC = (event) => {
  const [valDisabledFilter, setDisabledFilter] = useState<any>(false);

  const [valItemCheckBoxLastras, setItemCheckBoxLastras] = useState<any>("");
  const [valItemCheckBoxLinhas, setItemCheckBoxLinhas] = useState<any>("");
  const [searchText, setSearchText] = useState<string>("");

  const [valItemBorda, setItemAcabementoBorda] = useState<string>("");
  const [valItemMaterial, setItemMaterial] = useState<string>("");
  const [valItemFormato, setItemFormato] = useState<string>("");
  const [valItemCor, setItemCor] = useState<string>("");
  const [valItemAcabamentoSuperficie, setItemAcabamentoSuperficie] = useState<string>("");
  const { t } = useTranslation();

  const [valItemAplicacaoTecnical, setItemAplicacaoTecnical] = useState<string>("");
  const { filtro, DataFilters } = SetFilterData();
  const [itensField, setitensField] = useState<any>([]);
  const [textoFiltro, setTextoFiltro] = useState<string>("");


  const handleSearchTextChangeLastras = async () => {
    const checkboxLinhas = (document.getElementById("default-linhas") as HTMLInputElement);
    const checkboxLastras = (document.getElementById("default-lastras") as HTMLInputElement);

    if (checkboxLastras.checked == true) {
      checkboxLinhas.checked = false;
      checkboxLastras.checked = true;
      setSearchText(checkboxLastras.value);
    }

    await radioBoxFIlter("Lastras");
  };

  const handleSearchTextChange: FormEventHandler<HTMLInputElement> = async (event) => {
    const value = (event.target as HTMLInputElement).value;

    setTextoFiltro(value)

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

  const handleSearchTextChangeLinhas = async () => {

    const checkboxLinhas = (document.getElementById("default-linhas") as HTMLInputElement);
    const checkboxLastras = (document.getElementById("default-lastras") as HTMLInputElement);

    if (checkboxLinhas.checked == true) {
      checkboxLastras.checked = false;
      checkboxLinhas.checked = true;
      setSearchText(checkboxLinhas.value);
    }

    await radioBoxFIlter("Linhas");
  };

  const radioBoxFIlter = async (e: any) => {
    let paramMaterial: any = {};
    let fieldsValue: Array<FieldsFilter> = [];
    let urlFilter: any = "";

    if (e == "Linhas") {
      paramMaterial = {
        id: valItemCheckBoxLinhas,
        name: 'radioBoxLinhas',
        idCampo: "1radio"
      }
      fieldsValue.push(paramMaterial);
    } else if (e == "Lastras") {
      paramMaterial = {
        id: valItemCheckBoxLastras,
        name: 'radioBoxLastras',
        idCampo: "2radio"
      }
      urlFilter += "?view=" + "slabs";
      fieldsValue.push(paramMaterial);
    }
    await serviceFieldFilters(urlFilter);
    await DataFilters(fieldsValue);
  }

  const handleClearFilters = async () => {
    setSearchText("");
    const selecteds = Array.from(
      document.getElementsByClassName("form-select-input")
    );
    selecteds.map((element: any) => {
      (element as HTMLInputElement).value = "";
      return "";
    });

    const paramMaterial = [{
      id: "",
      name: "",
      idCampo: ""
    }];

    let checkboxLinhas = (document.getElementById("default-linhas") as HTMLInputElement);
    let checkboxLastras = (document.getElementById("default-lastras") as HTMLInputElement);

    checkboxLinhas.checked = false;
    checkboxLastras.checked = false;

    await serviceFieldFilters("");
    await DataFilters(paramMaterial);

    await setItemAcabementoBorda("");
    await setItemMaterial("");
    await setItemFormato("");
    await setItemCor("");
    await setItemAcabamentoSuperficie("");
  };

  const valItensFilter = async (e: any) => {
    //materiais
    if (e == 1) {
      const field = (document.getElementById("1") as HTMLInputElement).value;
      await setItemMaterial(field != "0" ? field : "");
    } else
      //cores
      if (e == 2) {
        const field = (document.getElementById("2") as HTMLInputElement).value;
        await setItemCor(field != "0" ? field : "");
      } else
        //formatos
        if (e == 3) {
          const field = (document.getElementById("3") as HTMLInputElement).value;
          await setItemFormato(field != "0" ? field : "");
        } else
          //Acabamentos de borda
          if (e == 4) {
            const field = (document.getElementById("4") as HTMLInputElement).value;
            await setItemAcabementoBorda(field != "0" ? field : "");
          } else
            //acabamento de superficie
            if (e == 5) {
              const field = (document.getElementById("5") as HTMLInputElement).value;
              await setItemAcabamentoSuperficie(field != "0" ? field : "");
            }
  }

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
    id: number | string,
    name: string,
    idCampo: string
  }

  const serviceFieldFilters = async (urlParam: any) => {
    await setDisabledFilter(true);
    var langQuery = ''
    const language = i18next.language
    if (!urlParam) {
      langQuery = "?lang=" + language
    } else if (urlParam) {
      langQuery = "&lang=" + language
    }
    let url = '/dev/concierge-me/1.0/filters';
    url += urlParam ? urlParam : "";

    let count: number = 0;
    await Api.get(url + langQuery, {
      headers: {
        access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
        client_id: '2569d5b3-765c-4262-8037-979daca99782',
        'Access-Control-Allow-Origin': "true",
      }
    }).then(response => {
      const fields: Array<Fields> = [];

      response.data.forEach(async (elem: any) => {
        count = count + 1;
        if (elem.values) {
          let fieldsValue: Array<FieldValue> = [];

          for (let i = 0; i <= elem.values.length; i++) {
            if (elem.values[i] && elem.values[i].id) {
              if (elem.values[i].name === "") {
                elem.values[i].name = "-"
              }
              let paramElem = {
                checked: elem.values[i].checked,
                count: elem.values[i].count,
                id: elem.values[i].id,
                name: elem.values[i].name
              }
              fieldsValue.push(paramElem);
            }
          }

          let paramElem = {
            id: count,
            name: elem.name,
            values: fieldsValue
          }
          fields.push(paramElem);
        }
        await setDisabledFilter(false);
      })
      setitensField(fields);
    })
  }

  const elementFields = async () => {
    let paramMaterial;
    let fieldsValue: Array<FieldsFilter> = [];
    let urlFilter = "";

    if (valItemMaterial) {
      paramMaterial = {
        id: valItemMaterial,
        name: 'material',
        idCampo: "1"
      }
      fieldsValue.push(paramMaterial);
    }
    if (valItemCor) {
      paramMaterial = {
        id: valItemCor,
        name: 'cor',
        idCampo: "2"
      }
      fieldsValue.push(paramMaterial);
    }
    if (valItemFormato) {
      paramMaterial = {
        id: valItemFormato,
        name: 'formato',
        idCampo: "3"
      }
      fieldsValue.push(paramMaterial);
    }
    if (valItemBorda) {
      paramMaterial = {
        id: valItemBorda,
        name: 'acabamento de borda',
        idCampo: "4"
      }
      fieldsValue.push(paramMaterial);
    }
    if (valItemAcabamentoSuperficie) {
      paramMaterial = {
        id: valItemAcabamentoSuperficie,
        name: 'acabamento de superficie',
        idCampo: "5"
      }
      fieldsValue.push(paramMaterial);
    }

    fieldsValue.forEach((elem: any, index: any) => {
      urlFilter += index == 0 ? "?" : "&";

      if (elem.idCampo == "1") {
        urlFilter += "material=" + elem.id;
      }
      if (elem.idCampo == "2") {
        urlFilter += "color=" + elem.id;
      }
      if (elem.idCampo == "3") {
        urlFilter += "size=" + elem.id;
      }
      if (elem.idCampo == "4") {
        urlFilter += "edge=" + elem.id;
      }
      if (elem.idCampo == "5") {
        urlFilter += "finish=" + elem.id;
      }
    })
    await serviceFieldFilters(urlFilter);
    DataFilters(fieldsValue);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (valItemCheckBoxLastras || valItemCheckBoxLinhas || valItemMaterial || valItemCor || valItemFormato ||
        valItemBorda || valItemAcabamentoSuperficie || valItemAplicacaoTecnical) {
        await elementFields();
      } else {
        await serviceFieldFilters("");
      }
    }
    fetchData();
  }, [valItemMaterial,
    valItemCor,
    valItemFormato,
    valItemBorda,
    valItemAcabamentoSuperficie,
    valItemAplicacaoTecnical,
    t])

  return (
    <Container>
      <H4 size="24px">{t('cole_section_1')}</H4>
      <ColumnContainer>
        <Form>
          <div key={`default-`} className="mb-3">
            <Form.Check
              name="Linhas"
              type="radio"
              id={`default-linhas`}
              label={t('cole_section_6')}
              value={'Linhas'}
              onChange={handleSearchTextChangeLinhas}
            />
            <Form.Check
              name="Lastras"
              type="radio"
              id={`default-lastras`}
              label={t('cole_section_7')}
              value={'Lastras'}
              onChange={handleSearchTextChangeLastras}
            />
          </div>
        </Form>
      </ColumnContainer>
      <H4 size="24px">{t('cole_section_2')}</H4>
      <CollectionsSearch>
        <ColumnContainer>

          <InputSearch
            value={textoFiltro}
            type="text"
            className="form-select-input"
            placeholder={t('cole_section_8')}
            onChange={handleSearchTextChange}
          />
        </ColumnContainer>

        <RowContainer>
          <div>
            <H4 size="24px" style={{ marginTop: "1rem" }}>
              {t('cole_section_3')}
            </H4>
          </div>
          <div onClick={handleClearFilters}>
            <LinkSmall onClick={() => {
              setTextoFiltro("");
            }}>{t('cole_section_4')}</LinkSmall>
          </div>
        </RowContainer>
      </CollectionsSearch>

      {itensField.map((model: any, index: any) => {
        return (
          <div style={{ marginTop: "1.5rem", paddingRight: "1.5rem" }} key={index}>
            <Paragraph size="18px">{model.name}</Paragraph>
            <Form.Select onChange={async event => await valItensFilter(model.id)} id={model.id} disabled={valDisabledFilter}>
              <option className="custom-option" value="0">
                {t('cole_section_5')}
              </option>
              {model.values.map((item: any) => {
                return (
                  <option
                    className="custom-option"
                    value={item.id}
                    key={item.id}
                  >
                    {item.name}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        );
      })}
    </Container>
  );
};

export default SideSearchFilter;
