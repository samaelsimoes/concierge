import React, { useEffect, useState } from "react";

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SetFilterData } from "../../helpers/DataContextFilterConllectionsProvider";
import "./DataPickerComponent.css";
import { useTranslation } from "react-i18next";

const DataPickerComponent = ({ item }: any) => {
    const { t } = useTranslation();
    const { filtro, DataFilters } = SetFilterData();   
    const [itenTranslate, setItenTranslate] = useState<string>('');

    let [valueInicioDe, setValueInicioDe] = React.useState<Dayjs | null>(null);
    let [valueInicioAte, setValueInicioAte] = React.useState<Dayjs | null>(null);

    interface FieldsFilter {
        id: number | string | boolean;
        name: string;
        idCampo: string;
    }    

    const handleSearchTextChange = async (value:any, type:any) => {
        let paramMaterial: any = {};
        let fieldsValue: Array<FieldsFilter> = [];
        if (type == 'vencidos') {
            valueInicioDe = value;
            setValueInicioDe(value);
        } 
        
        if (type == 'ate') {
            valueInicioAte = value;
            setValueInicioAte(value);
        } 
        if (valueInicioDe &&  valueInicioAte && valueInicioAte.format("DD/MM/YYYY") && valueInicioDe.format("DD/MM/YYYY")) {
            paramMaterial = {
                id: valueInicioDe.format("DD/MM/YYYY"),
                name: "formatoDataVencidos",
                idCampo: "vencidos",
              };
            fieldsValue.push(paramMaterial);

            paramMaterial = {
                id: valueInicioAte.format("DD/MM/YYYY"),
                name: "formatoDataAte",
                idCampo: "ate",
            };
            fieldsValue.push(paramMaterial);    
            
            await DataFilters(fieldsValue);
        }

        if (!valueInicioDe || !valueInicioAte) {
            paramMaterial = {
                id: '',
                name: '',
                idCampo: '',
            };
            fieldsValue.push(paramMaterial);   
            await DataFilters(fieldsValue); 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            switch (item) {
            case 'financertoexpire':
                setItenTranslate('data_picker_1');
                break;
            case 'financerpaid':
                setItenTranslate('data_picker_2');
                break;
            case 'ordersC':
                setItenTranslate('data_picker_3');
                break;
            case 'shipments':
                setItenTranslate('data_picker_4');
                break;
            default:
                setItenTranslate('data_picker_6');
            }
        };
        fetchData();
      });

    return (
        <div className="padding-modal-data-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3}> 
                    <div className="row">
                        <div className="col-sm-7 col-md-7 style-data-picker-inicio">
                            <DatePicker className="style-search-data1 vencidosData"
                                label={t(itenTranslate)}
                                value={valueInicioDe}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newValue) => {
                                    handleSearchTextChange(newValue, 'vencidos');
                                }}
                            
                                renderInput={(params) => <TextField {...params} helperText={null} />}                           
                            />
                        </div>
                        
                        <div className="col-sm-5 col-md-5 style-data-picker-final">
                            <DatePicker className="style-search-data2 ateData"
                                label={t("data_picker_5")}
                                value={valueInicioAte}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newValue) => {
                                    handleSearchTextChange(newValue, 'ate');
                                }}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </div>
                    </div>
                </Stack>
            </LocalizationProvider>
        </div>
    );
};

export default DataPickerComponent;
