import i18next from "i18next";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import {
  ItemParagraph, LinkAction, ThumbImage
} from "./FormatsList.elements";

import "./FormatList.css";

import toast from "react-hot-toast";
import FormButton from "../../components/FormButton";
import ModalInventory from "../Modal/ModalInventory";
import { CollectionProductModel } from "./Interface/CollectionProductModel";
import ModalDetalhe from "./Modal/ModalDetalhe";
import ModalPacking from "./Modal/ModalPacking";
import { useKeycloak, withKeycloak } from "@react-keycloak/web";

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

type FormatsListProps = {
  paramFormatList: string | number;
  readonly itemModal?: any;
};

interface RefObject {
  refPacking: () => void;
}

interface RefObject {
  refEstoque: () => void;
}

interface RefObject {
  refDetalhe: () => void;
}

const FormatsList: FC<FormatsListProps> = ({ paramFormatList, itemModal }) => {
  const [listProduct, setListProducts] = useState<CollectionProductModel[]>();
  const [listaFavoritos, setListaFavoritos] = useState<CollectionProductModel[]>(JSON.parse(localStorage.getItem('favoritos')!) || []);
  const { keycloak, initialized } = useKeycloak();
  const perfUserMarketing = keycloak.hasResourceRole("marketing");
  const [statusModalInventory, setStatusModalInventory] = useState<boolean>(true);

  let products: Array<CollectionProductModel> = [];

  window.addEventListener('remove_storage', () => {
    setListaFavoritos(JSON.parse(localStorage.getItem('favoritos')!) || [])
  })

  var language = i18next.language;
  const serviceProdutsList = async (id: any) => {
    if (id) {
      let url =
        "/dev/concierge-me/1.0/collections/products/" +
        id +
        "?lang=" +
        language;
      await Api.get(url, {
        headers: {
          access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
          client_id: '2569d5b3-765c-4262-8037-979daca99782',
          'Access-Control-Allow-Origin': "true",
        }
      }).then(response => {
        response.data.result.results.forEach((element: any) => {

          if (element.ProductFinishingEdge.name === "") {
            element.ProductFinishingEdge.name = "-"
          }
          let params = {
            id: element.id,
            title: element.description,
            formatSize: element.nominal_format,
            sku: element.code,
            edge: element.ProductFinishingEdge.name,
            finish: element.ProductFinishing.name,
            image: element.zoomImage,
            certificate: element.certificate,
            uom: element.uom,
            qtde: 0,
            catalog: true,
            zoomImage: element.zoomImage
          }
          products.push(params);
        });
        setListProducts(products);
      })
    }
  };

  let listProductRef = useRef<RefObject>(null);
  let listProductRefEstoque = useRef<RefObject>(null);
  let listProductRefDetalhe = useRef<RefObject>(null);

  listProductRefEstoque.current?.refEstoque();
  listProductRefDetalhe.current?.refDetalhe();
  listProductRef.current?.refPacking();

  useEffect(() => {
    const fetchData = async () => {
      if (!keycloak.authenticated) {
        setStatusModalInventory(false);
      } else if (keycloak.authenticated && perfUserMarketing) {
        setStatusModalInventory(false);
      } else {
        setStatusModalInventory(true);
      }
      if (paramFormatList) {
        serviceProdutsList(paramFormatList);
      }
    };    
    fetchData();
  }, [
    paramFormatList,
    listProductRefEstoque,
    listProductRefDetalhe,
    listProductRef,
  ]);

  const { t } = useTranslation();
  const setFavoritos = (value: any) => {

    var listaItens: CollectionProductModel[] = []

    if (!!localStorage.getItem('favoritos')) listaItens = JSON.parse(localStorage.getItem('favoritos')!)
    if (listaItens.map(it => it.id).indexOf(value.id) === -1) {
      toast.success(t("favorites_list_item_added"))
      listaItens.push(value)
    }
    localStorage.setItem('favoritos', JSON.stringify(listaItens));
    setListaFavoritos(listaItens)
  };

  return (
    <div>
      {(() => {
        if (listProduct && listProduct.length > 0) {
          return (
            <div>
              <div className="row">
                <div className="col">
                  <h4 className="style-h4-collection">{t("grid_table_1")}</h4>
                </div>
              </div>
              <div className="row table-responsive">
                <div className="col-md-12">
                  <table className="table-hover table style-table">
                    <thead>
                      <tr className="style-table-th">
                        <th scope="col">{t("grid_table_2")}</th>
                        <th scope="col"></th>
                        <th scope="col" className="style-th-collections">SKU</th>
                        <th scope="col" className="style-th-collections">{t("grid_table_3")}</th>
                        <th scope="col" className="style-th-collections">{t("grid_table_4")}</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listProduct.map((item: CollectionProductModel, index: number) => {
                        return (
                          <tr style={{ marginTop: "40px", paddingBottom: "31px" }} key={index}>
                            <td>
                              <ThumbImage
                                src={
                                  "https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/" +
                                  item.image
                                }
                              />
                            </td>
                            <td >
                              <div className="row">
                                <ItemParagraph>{item.title}</ItemParagraph>
                              </div>
                              <div className="row">
                                <ItemParagraph
                                  style={{
                                    textShadow: "0.5px 0.5px black",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  {item.formatSize}
                                </ItemParagraph>
                              </div>

                              <div className="style-tag-a">

                                <ModalDetalhe itemModalDetalhe={item} ref={listProductRefDetalhe} />

                                {statusModalInventory ? (
                                  <ModalInventory itemModalEstoque={item} ref={listProductRefEstoque} />
                                ) : (
                                  <></>
                                )}

                                <ModalPacking itemModal={item} ref={listProductRef} />

                                {item.certificate !== "" ? (
                                  <LinkAction
                                    onClick={() =>
                                      window
                                        .open(item.certificate, "_blank")
                                        ?.focus()
                                    }
                                  >
                                    {t("modal-technical-report-label")}
                                  </LinkAction>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </td>
                            <td>
                              <ItemParagraph className="style-th-edge-finishing align-itends-td">{item.sku}</ItemParagraph>
                            </td>
                            <td>
                              <ItemParagraph className="style-th-edge-finishing align-itends-td"> {item.edge}</ItemParagraph>
                            </td>
                            <td>
                              <ItemParagraph className="style-th-edge-finishing align-itends-td">{item.finish}</ItemParagraph>
                            </td>
                            <td>
                              <FormButton style={{ width: "142px" }} variant={"primary"} disabled={listaFavoritos.findIndex((it) => it.id === item.id) !== -1} onClick={() => setFavoritos(item)}>
                                {listaFavoritos?.findIndex((it) => it?.id === item.id) === -1 ? t('grid_table_5') : t("grid_table_6")}
                              </FormButton>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        }
      })()}
    </div>
  );
};

export default FormatsList;
