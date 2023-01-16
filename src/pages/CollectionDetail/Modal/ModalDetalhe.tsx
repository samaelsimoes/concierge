import { forwardRef, Ref, useEffect, useImperativeHandle, useState, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import Api from '../../../GlobalSerice/api';
import { LinkAction } from '../FormatsList.elements';
import { useTranslation } from "react-i18next";
import './ModalDetalhesPacking.css';

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);


interface ItemDetalhe {
    id: string | null | undefined | any,
    title: string | null | undefined,
    formatSize: string | null | undefined,
    sku: string | null | undefined,
    edge: string | null | undefined,
    finish: string | null | undefined,
    image: string | null | undefined
}

interface Props {
    itemModalDetalhe: any,
    ref: Ref<RefObject> | any
}

interface RefObject {
    refDetalhe: () => void;
}

interface Detalhe {
    code: String,
    class4_portfolio: String,
    faces: Number,
    color_body: String,
    typology_cml: String,
    type: String,
    juntas: Juntas,
    thickness: String,
    ProductFinishingEdge: ProductFinishingEdge,
    ProductTonalityVariation: ProductTonalityVariation,
    ProductPei: ProductPei
}


interface Juntas {
    junta_assentamento_is: String,
    junta_assentamento_im: String,
    junta_assentamento_ef: String,
    junta_assentamento_p: String
}

interface ProductFinishingEdge {
    name: String
}

interface ProductTonalityVariation {
    name: String
}

interface ProductPei {
    name: String
}

const ModalDetalhe = forwardRef((props: Props, ref: Ref<RefObject> | any) => {
    useImperativeHandle(ref, () => ({ refDetalhe }));

    const [show, setShow] = useState(false);
    const [sku, setSku] = useState("1");
    const [detalheModalValue, setDetalheModalValue] = useState<ItemDetalhe>();
    const [listProductDetail, setProductDetails] = useState<Detalhe>();
    const { t } = useTranslation();
    const refDetalhe = () => { }

    useEffect(() => {
        setDetalheModalValue(props.itemModalDetalhe);
        if (show && sku != props.itemModalDetalhe.sku) {
            setSku(props.itemModalDetalhe.sku);
            let url = 'https://api-portobello.sensedia.com/dev/concierge-me/1.0/products/details/' + props.itemModalDetalhe.sku;
            Api.get(url, {
                headers: {
                    access_token: localStorage.getItem(TOKEN_KEY) ? '' + localStorage.getItem(TOKEN_KEY) : '',
                    client_id: '2569d5b3-765c-4262-8037-979daca99782',
                    'Access-Control-Allow-Origin': "true",
                }
            }).then(response => {
                if (!!response) {
                    setProductDetails(response.data.result);
                }
            })
        }
    }, [listProductDetail, show, detalheModalValue, sku]);

    return (
        <>
            <Fragment>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-width-collections">

                    <Modal.Header closeButton>
                        <Modal.Title id="">
                            <h4 className="style-title-modal-detailPacking "> {props.itemModalDetalhe.title} </h4>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="show-grid style-modal-detalhes-border">
                        <div className="container">
                            <div className="row ">
                                <div className="col-sm-5">
                                    <img
                                        src={
                                            "https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/" +
                                            props.itemModalDetalhe.zoomImage
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
                                <h4>{t('detalhe_produto_1')}</h4>
                            </div>
                        </div>


                        <br />
                        {!!listProductDetail && (
                            <>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7 ">
                                        <h1>{t('detalhe_produto_2')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.ProductFinishingEdge?.name}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_3')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.ProductTonalityVariation?.name}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_4')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.class4_portfolio}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_5')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.faces + ""}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_6')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.ProductPei.name}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>Color body</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.color_body}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_7')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.typology_cml}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_8')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.type}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_9')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.juntas.junta_assentamento_is}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_10')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.juntas.junta_assentamento_im}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_11')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.juntas.junta_assentamento_ef}</h2>
                                    </div>
                                </div>
                                <div className="row mb-2 style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_12')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.juntas.junta_assentamento_p}</h2>
                                    </div>
                                </div>
                                <div className="row  style-infos-pckd">
                                    <div className="col-sm-7">
                                        <h1>{t('detalhe_produto_13')}</h1>
                                    </div>
                                    <div className="col-sm">
                                        <h2>{listProductDetail?.thickness} mm</h2>
                                    </div>
                                </div>
                            </>
                        )}
                    </Modal.Body>
                </Modal>
                <LinkAction onClick={() => setShow(true)} >
                    {t('modal_packing_10')}
                </LinkAction>
            </Fragment>
        </>
    );
});


export default ModalDetalhe;
