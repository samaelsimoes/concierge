import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { LinkAction } from "../CollectionDetail/FormatsList.elements";
import "../Modal/Modal.css";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface ItemEstoque {
  id: string | null | undefined | any;
  title: string | null | undefined;
  formatSize: string | null | undefined;
  code: string | null | undefined;
  edge: string | null | undefined;
  finish: string | null | undefined;
  image: string | null | undefined;
}

interface Props {
  itemModalEstoque: any;
  ref: Ref<RefObject> | any;
}

interface RefObject {
  refEstoque: () => void;
}

interface Estoques {
  code: String;
  DescrComercial: String;
  faseVida: String;
  unidade: String;
  classe: String;
  ppe: String;
  temEstoque: String;
  temProjetado: String;
  Estoque: [Estoque];
  totalStock: Number;
}

interface Estoque {
  canal: String;
  cod_deposito: String;
  cod_tonalidade_calibre: String;
  ds_deposito: String;
  dt_final_validade: String;
  dt_inicial_validade: String;
  saldo_disponivel: Number;
  saldo_exportacao: Number;
}

const ModalInventory = forwardRef((props: Props, ref: Ref<RefObject> | any) => {
  useImperativeHandle(ref, () => ({ refEstoque }));

  const [show, setShow] = useState(false);
  const [code, setcode] = useState("1");
  const [ItemEstoqueModalValue, setItemEstoqueModalValue] =
    useState<ItemEstoque>();
  let dados: [Estoques] | null | undefined;
  const [listProductEstoque, setStock] = useState<any>();
  const [listItensModal, setListItensModal] = useState<any>();
  const [unidade, setUnidade] = useState<any>();

  const refEstoque = () => {};
  const { t } = useTranslation();
  const [sku, setSku] = useState<any>();

  useEffect(() => {
    const codeModal = props.itemModalEstoque.code || props.itemModalEstoque.sku;
    setSku(codeModal);
    setItemEstoqueModalValue(codeModal);

    if (show && code != codeModal) {
      setcode(codeModal);
      let url =
        "https://api-portobello.sensedia.com/dev/concierge-me/1.0/stock/details/" +
        codeModal;
      // let url = '' + props.itemModalEstoque.code;
      Api.get(url, {
        headers: {
          access_token: localStorage.getItem(TOKEN_KEY)
            ? "" + localStorage.getItem(TOKEN_KEY)
            : "",
          client_id: "2569d5b3-765c-4262-8037-979daca99782",
          "Access-Control-Allow-Origin": "true",
        },
      }).then((response) => {
        if (!!response) {
          setStock(response.data.dados);
          let dados: any = "";
          response.data.dados.forEach((e: any) => {
            setUnidade(e.unidade);
            let info = e.Estoque.sort(function (a: any, b: any) {
              if (a.saldo_disponivel < b.saldo_disponivel) {
                return 1;
              }

              if (a.saldo_disponivel > b.saldo_disponivel) {
                return -1;
              }
              return 0;
            });
            dados = info;
          });
          setListItensModal(dados);
        }
      });
    }
  }, [listProductEstoque, show, ItemEstoqueModalValue, code]);

  return (
    <>
      <LinkAction onClick={() => setShow(true)}>
        {props.itemModalEstoque.catalog
          ? t("modal_estoque_4")
          : t("modal_packing_10")}
      </LinkAction>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-produtos"
      >
        <Modal.Header closeButton>
          <Modal.Title id="">
            <h4 className="style-title-modal-detailPacking">
              {props.itemModalEstoque.name || props.itemModalEstoque.title}
            </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <div className="container">
            <div className="row style-row-modal">
              <div className="col-sm-5">
                <img
                  src={
                    "https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/" +
                    props.itemModalEstoque.zoomImage
                  }
                  style={{
                    width: "180px",
                    height: "180px",
                  }}
                />
              </div>
              <div className="col-sm-7">
                <div className="row style-padding-bottom padding-modal-top">
                  <h4 className="style-text-modal-title">
                    {t("Iventario_3")}{" "}
                  </h4>
                  <h4 className="style-text-modal">{sku}</h4>
                </div>
                <div className="row">
                  <h4 className="style-text-modal-title">
                    {" "}
                    {t("Iventario_4")}{" "}
                  </h4>

                  <h4 className="style-text-modal">
                    {" "}
                    {!!listProductEstoque &&
                      listProductEstoque.map(
                        (collection: Estoques, index: any) => {
                          {
                            return (
                              collection.totalStock.toFixed(2) +
                              " " +
                              collection.unidade
                            );
                          }
                        }
                      )}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <table className="table table-responsive">
            <thead className="table-light" style={{ textAlign: "center" }}>
              <tr>
                <th scope="col">{t("modal_estoque_1")}</th>
                <th scope="col">{t("modal_estoque_2")}</th>
                <th scope="col">UOM</th>
                <th scope="col">{t("modal_estoque_3")}</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {listItensModal ? (
                listItensModal.map((e: Estoque, index: any) => (
                  <tr key={index}>
                    <td> {e.ds_deposito} </td>
                    <td> {e.cod_tonalidade_calibre} </td>
                    <td> {unidade} </td>
                    <td> {e.saldo_disponivel + ""} </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={100}>{t("without_stock")}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
});

export default ModalInventory;
