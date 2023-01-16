import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { H4 } from "../../globalStyles";
import { DataContextFilterProvider } from "../../helpers/DataContextFilterConllectionsProvider";
import './Financer.css';
import { useKeycloak } from "@react-keycloak/web";
import FinancerFilter from "./FinancerFilter";
import ItensFinancer from "./ItensFinancer";

const Financer = () => {
  const { t } = useTranslation();
	const { keycloak } = useKeycloak();

  const [checkStatusFinancial1, setCheckStatusFinancial1] = useState(false);
  const [checkStatusFinancial2, setCheckStatusFinancial2] = useState(false);
  const [checkStatusFinancial3, setCheckStatusFinancial3] = useState(false);
  const [statusFinal, setStatusFinal] = useState('order');

	let id_client = keycloak.tokenParsed?.["id_client"];

  const statusButton = async (inf:string) => {
		if (inf == 'toexpire') {
      setCheckStatusFinancial1(true);
      setCheckStatusFinancial2(false);
      setCheckStatusFinancial3(false);

      setStatusFinal('toexpire');
    } else if (inf == 'expired') {
      setCheckStatusFinancial1(false);
      setCheckStatusFinancial2(true);
      setCheckStatusFinancial3(false);
      setStatusFinal('expired');
    } else {
      setCheckStatusFinancial1(false);
      setCheckStatusFinancial2(false);
      setCheckStatusFinancial3(true);
      setStatusFinal('paid');
    }
	};

  useEffect(() => {
		const fetchData = async () => {
      setCheckStatusFinancial1(true);
      setStatusFinal('toexpire');
		};
		fetchData();
	}, []);

  return (
    <DataContextFilterProvider>
      <div className="section style-custom style-padding">
        <div className="row">
          <div className="col">
            <H4>{t('acesso_financeiro_1')}</H4> 
          </div>
        </div>

        <div className="row style-button-financier">
          <div className="col-md-2">
            <h3 onClick={event => statusButton('toexpire')} className={checkStatusFinancial1 ? 'style-h3-financier-checke-1' : 'style-h3-financier'}>{t('acesso_financeiro_2')}</h3>
          </div>
          <div className="col-md-2">
            <h3 onClick={event => statusButton('expired')} className={checkStatusFinancial2 ? 'style-h3-financier-checke-2' : 'style-h3-financier'}>{t('acesso_financeiro_3')}</h3>
          </div>
          <div className="col-md-2">
            <h3 onClick={event => statusButton('paid')} className={checkStatusFinancial3 ? 'style-h3-financier-checke-2' : 'style-h3-financier'}>{t('acesso_financeiro_4')}</h3>
          </div>
          <div className="col-md-6"></div>
        </div>

        <div className="row style-line">
          <div className="col-sm-12">
            <div className="row style-padding-filter-financier">
              <FinancerFilter statusFinal={statusFinal}/> 
            </div>
            <div className="row"> 
              {id_client ? (
                <ItensFinancer id={id_client} item={ statusFinal }/>
              ) : (
                ""
              )}
            </div>            
          </div>
        </div>
      </div>
    </DataContextFilterProvider>
  );
};

export default Financer;
