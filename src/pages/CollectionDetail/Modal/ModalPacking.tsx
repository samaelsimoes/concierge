import { forwardRef, Ref, useEffect, useImperativeHandle, useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Api from '../../../GlobalSerice/api';
import { LinkAction } from '../FormatsList.elements';
import { useTranslation } from "react-i18next";
import './ModalDetalhesPacking.css';

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

interface Item {
    id: string | null | undefined | any,
    title: string | null | undefined,
    formatSize: string | null | undefined,
    sku: string | null | undefined,
    edge: string | null | undefined,
    finish: string | null | undefined,
    image: string | null | undefined
}

interface Props {
    itemModal: Item | any,
    ref: Ref<RefObject> | any
}

interface RefObject {
    refPacking: () => void;
}

interface Packing {
    id: String,
    jsonrpc: String,
    result: [Resultado]
}

interface Resultado {
    unit_measure: String,
    number_m2_box: Number,
    number_parts_box: Number,
    net_weight_amount: Number,
    gross_weight_amount: Number,
    number_m2_pallet_mi: Number,
    number_box_pallet_mi: Number,
    number_parts_pallet_mi: Number,
    pallet_weight: Number
}


const ModalPacking = forwardRef((props: Props, ref: Ref<RefObject> | any) => {

    useImperativeHandle(ref, () => ({ refPacking }));

    const [show, setShow] = useState(false);
    const [sku, setSku] = useState("1");
    const [ItemModalValue, setItemModalValue] = useState<Item>();
    let dados: Packing | null | undefined;
    const [listProductPacking, setProduct] = useState<any>();

    const refPacking = () => { }

    useEffect(() => {
        setItemModalValue(props.itemModal);

        if (show && sku != props.itemModal.sku) {
            setSku(props.itemModal.sku);
            let url = 'https://api-portobello.sensedia.com/dev/concierge-me/1.0/products/packing/' + props.itemModal.sku;
            Api.get(url, {
                headers: {
                    access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
                    client_id: '2569d5b3-765c-4262-8037-979daca99782',
                    'Access-Control-Allow-Origin': "true",
                }
            }).then(response => {
                if (!!response) {
                    dados = response.data.result;
                    setProduct(dados);
                }
            })
        }
    }, [listProductPacking, show, ItemModalValue, sku]);

    const { t } = useTranslation();
    return (
        <Fragment>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-width-collections">

                <Modal.Header closeButton>
                    <Modal.Title id="">
                        <h4 className="style-title-modal-detailPacking "> {props.itemModal.title} </h4>
                    </Modal.Title>
                </Modal.Header>



                <Modal.Body className="show-grid style-modal-detalhes-border">
                    <div className="container">
                        <div className="row ">
                            <div className="col-sm-5">
                                <img
                                    src={
                                        "https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/" +
                                        props.itemModal.zoomImage
                                    }
                                    style={{
                                        width: "180px",
                                        height: "180px",
                                    }}
                                />
                            </div>

                            <div className="col-sm-7 style-infos-pckd">
                                <div className="row style-padding-bottom padding-modal-top">
                                    <h4 className="style-text-modal-title">
                                        {t("Iventario_3")}{" "}
                                    </h4>
                                    <h4 className="style-text-modal">{sku}</h4>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='row'>
                            <div className='col'>
                                <h5 style={{ textDecorationLine: "underline" }}></h5>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col border-col-bottom style-infos-pckd'>
                                <h4>PACKING</h4>
                            </div>
                        </div>

                    <br />
                    {!!listProductPacking && (
                        <>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1> {t('modal_packing_1')} </h1>
                                </div>
                                <div className="col-sm">
                                    <h2> {listProductPacking?.unit_measure} </h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_2')}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{listProductPacking?.number_m2_box}</h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_3')}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{listProductPacking?.number_parts_box}</h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_4')}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{listProductPacking?.net_weight_amount}</h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_5')}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{listProductPacking?.gross_weight_amount}</h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_6')}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{listProductPacking?.number_m2_pallet_mi}</h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_7')}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{listProductPacking?.number_box_pallet_mi}</h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_8')}</h1>
                                </div>
                                <div className="col-sm">
                                    <h2> {listProductPacking?.number_parts_pallet_mi}</h2>
                                </div>
                            </div>
                            <div className="row mb-2 style-infos-pckd">
                                <div className="col-sm-5">
                                    <h1>{t('modal_packing_9')} </h1>
                                </div>
                                <div className="col-sm">
                                    <h2>{listProductPacking?.pallet_weight}</h2>
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
            </Modal>
            <LinkAction onClick={() => setShow(true)}>
                Packing
            </LinkAction>
        </Fragment>
    );
});


export default ModalPacking;
