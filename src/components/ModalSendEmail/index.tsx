import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import { Accordion, Form, Modal, ModalProps } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Api from "../../GlobalSerice/api";
import { Region } from "../../models";
import { CollectionProductModel } from "../../pages/CollectionDetail/Interface/CollectionProductModel";
import FormButton from "../FormButton";

const TOKEN_KEY = "Employee-token";

interface ModalSendEmailProps extends ModalProps {
  setShow: Function;
  clearList: Function;
}

export default function ModalSendEmail(props: ModalSendEmailProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [regions, setRegions] = useState<Region[]>([]);
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      Api.get("/dev/concierge-me/1.0/regions", {
        headers: {
          access_token: localStorage.getItem(TOKEN_KEY)
            ? "" + localStorage.getItem(TOKEN_KEY)
            : "",
          client_id: "2569d5b3-765c-4262-8037-979daca99782",
          "Access-Control-Allow-Origin": "true",
        },
      })
        .then((res) => {
          const regionsReq = res.data.items as Region[];

          setRegions(
            regionsReq.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          );
        })
        .catch((err) => console.error(err));
    };
  }, []);

  const [errorEmail, setErrorEmail] = useState<boolean>(true);

  function isValidEmail(email: string) {
    if (email === "") return false;
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleSendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const regionTrader = regions.find((it) => it.name === region);
    Api.post(
      "https://concierge-me-backend-produtos.herokuapp.com/sendEmailNotLogged",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },

        trader: regionTrader?.name,
        company: company,
        produtos: [
          JSON.parse(localStorage.getItem("favoritos")!)?.map(
            (it: CollectionProductModel) =>
              it.sku +
              " - " +
              it.title +
              " - " +
              it.qtde +
              " " +
              it.unit_measure
          ),
        ],
        name: name,
        email_cliente: email,
        message: props.observation,
        region: region,
        recievers: ["concierge@portobello.com.br", regionTrader?.email_address],
      }
    )
      .then(() => {
        toast.success(t("email_sent"));
        props.clearList();
        props.setShow(false);
      })
  }

  function handleLogin() {
    keycloak.login();
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorEmail(!isValidEmail(event.target.value));
    setEmail(event.target.value);
  };

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>{t("to_send_email_need_login")}</Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey={["0", "1"]} flush alwaysOpen>
          <AccordionItem eventKey="0">
            <AccordionHeader>{t("label_login")}</AccordionHeader>
            <AccordionBody>
              <FormButton style={{ width: "100%" }} onClick={handleLogin}>
                {t("login")}
              </FormButton>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem eventKey="1">
            <AccordionHeader>{t("label_register")}</AccordionHeader>
            <AccordionBody>
              <Form onSubmit={handleSendEmail}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>{t("name")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder={t("name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCompany">
                  <Form.Label>{t("company")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder={t("company")}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>{t("email")}</Form.Label>
                  <Form.Control
                    required
                    isValid={!errorEmail}
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBaiscRegion">
                  <Form.Label>{t("region")}</Form.Label>
                  <Form.Select
                    required
                    placeholder={t("region")}
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {regions
                      ?.map((reg) => reg.name)
                      .map((reg, index) => (
                        <option key={index}>{reg.toUpperCase()}</option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Text className="text-muted">
                    {t("label_send_email")}
                    <b>{t("email_default_concierge")}</b>
                  </Form.Text>
                </Form.Group>
                <Form.Group style={{ display: "flex", justifyContent: "end" }}>
                  <FormButton type="submit">{t("send_email")}</FormButton>
                </Form.Group>
              </Form>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </Modal.Body>
    </Modal>
  );
}
