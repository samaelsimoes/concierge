import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import FormButton from "../FormButton";

interface QuestionModalProps {
    child: React.ReactNode;
    label?: string;
    title?: string;
    onConfirm: Function;
}

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

function QuestionModal(props: QuestionModalProps) {
    const [show, setShow] = useState(false);
    const {t} = useTranslation();
    return (
        <>
            <div onClick={() => setShow(true)}>{props.child}</div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Header>{props.title}</Header>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>{props.label ? props.label : "Tem certeza?"}</div>
                        <Footer>
                            <FormButton variant="secondary" onClick={() => setShow(false)}>
                                {t("cancel")}
                            </FormButton>
                            <FormButton
                                variant="primary"
                                onClick={() => {
                                    setShow(false);
                                    props.onConfirm();
                                }}
                            >
                                {t("confirm")}
                            </FormButton>
                        </Footer>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default QuestionModal;
