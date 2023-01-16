import { FC, useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { CollectionProductModel } from "../../pages/CollectionDetail/Interface/CollectionProductModel";
import FormButton from "../FormButton";
import { FormCheckBox } from "../FormCheckBox";
import "./ModalFavoritos.css";
import {
  IconFaWindowCloseSecond,
  IconHeart,
  MargeIconHeart,
} from "../Navbar/Navbar.elements";
import QuestionModal from "../QuestionModal";
import { useKeycloak } from "@react-keycloak/web";
import ModalSendEmail from "../ModalSendEmail";

import imagemLogo from "../../assets/favorite_icon.svg";
import { MargemFav } from "./ModalFavoritos.elements";

export const TOKEN_KEY = "Employee-token";

const ModalFavoritos: FC = () => {
  const [show, setShow] = useState(false);
  const [showModalSendEmail, setShowModalSendEmail] = useState(false);
  const [checked, setChecked] = useState(false);
  const [listaFavoritos, setListaFavoritos] = useState<
    CollectionProductModel[]
  >([]);
  const [qtdeTotal, setQtdeTotal] = useState<number>(0);
  const [observation, setObservation] = useState<string>("");
  const [sendMail, setSendMail] = useState<boolean>(false);

  const { keycloak } = useKeycloak();

  function calculateQtdeTotal() {
    setQtdeTotal(
      listaFavoritos
        ?.map((it) => it.qtde)
        ?.reduce((acc, curr) => acc! + curr!) || 0
    );
  }

  const { t } = useTranslation();

  const clearList = () => {
    setListaFavoritos([]);
    localStorage.removeItem("favoritos");
    window.dispatchEvent(new Event("remove_storage"));
  };

  function handleChangeQtdeItemFavoritos(
    item: CollectionProductModel,
    qtdeNova: any
  ): void {
    let index = listaFavoritos.findIndex((it) => it.id === item.id);
    listaFavoritos[index].qtde = qtdeNova != "" ? Number.parseInt(qtdeNova) : 0;
    localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));
    calculateQtdeTotal();
  }

  const removeItemList = (value: CollectionProductModel) => {
    var index = listaFavoritos.indexOf(value);
    listaFavoritos.splice(index, 1);
    localStorage.setItem("favoritos", JSON.stringify(listaFavoritos));
    window.dispatchEvent(new Event("remove_storage"));
    setListaFavoritos(JSON.parse(localStorage.getItem("favoritos")!) || []);
  };

  useEffect(() => {
    return () => {
      setListaFavoritos(JSON.parse(localStorage.getItem("favoritos")!) || []);
    };
  }, [show, showModalSendEmail]);

  useEffect(() => {
    return () => {
      setQtdeTotal(
        listaFavoritos
          ?.map((it) => it?.qtde)
          ?.reduce((acc, curr) => acc! + curr!, 0) || 0
      );
    };
  }, [show, listaFavoritos]);

  const sendEmail = async () => {
    var traderName = "";
    var traderEmail = "";

    Api.get(
      "/dev/concierge-me/1.0/trader/" + keycloak.tokenParsed?.cod_representante,
      {
        headers: {
          access_token: localStorage.getItem(TOKEN_KEY)
            ? "" + localStorage.getItem(TOKEN_KEY)
            : "",
          client_id: "2569d5b3-765c-4262-8037-979daca99782",
          "Access-Control-Allow-Origin": "true",
        },
      }
    )
      .then((res) => {
        traderName = res.data.items[0].name;
        traderEmail = res.data.items[0].email;
      })
      .catch((err) => console.error(err));

    await Api.post(
      "https://concierge-me-backend-produtos.herokuapp.com/sendEmail",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },

        trader: traderName,
        cliente: keycloak.tokenParsed?.name,
        produtos: [
          listaFavoritos.map(
            (it) =>
              it.sku +
              " - " +
              it.title +
              " - " +
              it.qtde +
              " " +
              it.unit_measure
          ),
        ],
        usuario: keycloak.tokenParsed?.preferred_username,
        email_cliente: keycloak.tokenParsed?.email,
        message: observation,
        recievers: ["concierge@portobello.com.br", traderEmail],
      }
    )
      .then(() => {
        toast.success(t("email_sent"));
      })
      .catch((error) => {
        console.log("error " + error);
      });
  };

  const labelCheckBox = (
    <p>
      {t("titulo_favo_1")}
      <b>{t("titulo_favo_1.1")}</b>
      {t("titulo_favo_1.2")}
    </p>
  );

  return (
    <>
      <MargemFav>
        <IconHeart
          src={process.env.PUBLIC_URL + "/images/IconFavoritos.png"}
          onClick={() => {
            setListaFavoritos(
              JSON.parse(localStorage.getItem("favoritos")!) || []
            );
            setShow(true);
          }}
        />
      </MargemFav>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        dialogClassName="modal-wish"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal-wish">{t("lista_favo_1")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          {listaFavoritos.length > 0 ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>{t("actions")}</th>
                    <th scope="col" colSpan={2}>
                      {t("lista_favo_2")}
                    </th>
                    <th scope="col">{t("lista_favo_3")}</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {listaFavoritos.map(
                    (collection: CollectionProductModel, index: number) => {
                      return (
                        <tr key={index}>
                          <td>
                            <QuestionModal
                              title={t("question_confirm_exclude")}
                              label={t("question_label_confirm_exclude")}
                              child={<IconFaWindowCloseSecond />}
                              onConfirm={() => {
                                removeItemList(collection);
                                toast.success(t("favorites_list_item_removed"));
                              }}
                            />
                          </td>
                          <td>
                            <img
                              src={
                                "https://www.portobello.com.br/" +
                                collection?.image
                              }
                              className="img-modal"
                            />
                          </td>
                          <td
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            <b>{collection?.title}</b>&nbsp;
                            {collection.formatSize}
                            &nbsp;{collection.finish}&nbsp;{collection.edge}{" "}
                            <br /> SKU: {collection?.sku}
                          </td>
                          <td className="td-last">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <input
                                className="style-modal-inputFav"
                                type="number"
                                style={{ width: "73px", textAlign: "center" }}
                                placeholder="0"
                                value={
                                  collection.qtde == 0 ? "" : collection.qtde
                                }
                                onFocus={(e) => e.target.select()}
                                onChange={(e) =>
                                  handleChangeQtdeItemFavoritos(
                                    collection,
                                    e.target.value
                                  )
                                }
                              />
                              m²
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "end" }}>
                      <b>Total</b>
                    </td>
                    <td style={{ textAlign: "center" }}> {qtdeTotal} m²</td>
                  </tr>
                </tfoot>
              </table>

              <FloatingLabel
                controlId="floatingTextarea2"
                label={t("observation")}
              >
                <Form.Control
                  as="textarea"
                  placeholder="Comment"
                  style={{ height: "80px" }}
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                />
              </FloatingLabel>

              <div style={{ marginTop: "10px" }}>
                <FormCheckBox
                  label={labelCheckBox}
                  checked={checked}
                  setChecked={setChecked}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    width: "100%",
                    gap: "5px",
                  }}
                >
                  <QuestionModal
                    title={t("question_confirm_exclude")}
                    label={t("question_label_confirm_exclude_all")}
                    child={
                      <FormButton
                        variant="secondary"
                        style={{ width: "142px" }}
                      >
                        {t("titulo_favo_2")}
                      </FormButton>
                    }
                    onConfirm={() => {
                      toast.success(t("clean_favorites_list"));
                      clearList();
                    }}
                  />

                  <FormButton
                    disabled={!checked}
                    style={{ width: "142px" }}
                    onClick={() => {
                      if (keycloak.authenticated) {
                        sendEmail();
                        clearList();
                      } else {
                        setShowModalSendEmail(true);
                      }
                    }}
                  >
                    {t("titulo_favo_3")}
                  </FormButton>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                gap: "10px",
                width: "100%",
                margin: "20px 0",
              }}
            >
              <h4>{t("titulo_favo_5")}</h4>
              <a href="/concierge/collections">
                <h6>{t("titulo_favo_4")}</h6>
              </a>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <ModalSendEmail
        show={showModalSendEmail}
        setShow={setShowModalSendEmail}
        observation={observation}
        clearList={clearList}
      />
    </>
  );
};

export default ModalFavoritos;
