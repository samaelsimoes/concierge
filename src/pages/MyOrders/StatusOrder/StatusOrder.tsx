import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Api from "../../../GlobalSerice/api";
import PedidoRecebido from '../../../assets/pedido_recebido.svg'
import PedidoAutorizado from '../../../assets/pedido_autorizado.svg'
import PedidoEntregue from '../../../assets/pedido_entregue.svg'
import EntregaEstimada from '../../../assets/entrega_estimada.svg'
import EmFabricacao from '../../../assets/em_fabricação.svg'

export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);


interface MyOrders {
    cod_produto: string,
    descricao_produto: string,
    line_id: number,
    moeda: string,
    order_number: number,
    preco_venda: number,
    quantidade_vendida: number,
    uom: string
}

const StatusOrder = ({ minStatus }: { minStatus: number }) => {

    const { t } = useTranslation();
    const { id } = useParams();

    const steps = [
        {
            id: 1,
            icone: PedidoRecebido,
            texto: "PEDIDO RECEBIDO",
            final: false
        },
        {
            id: 2,
            icone: PedidoAutorizado,
            texto: "PEDIDO AUTORIZADO",
            final: false
        },
        {
            id: 3,
            icone: EmFabricacao,
            texto: "EM FABRICAÇÃO",
            final: false
        },
        {
            id: 4,
            icone: EntregaEstimada,
            texto: "ENTREGA ESTIMADA PARA",
            final: false
        },
        {
            id: 5,
            icone: PedidoEntregue,
            texto: "PEDIDO ENTREGUE",
            final: true
        },
    ]

    return (
        <div className="d-flex justify-content-around pt-6">
            {steps.map(step =>
                <div className="d-flex justify-content-between">
                    <div key={step.id} className="d-flex flex-column align-items-center w-50 m-10 " >
                        <div className="d-flex align-items-center">
                            <img src={step.icone} alt={step.texto} />
                        </div>
                        <div className="d-flex align-items-center pt-2">
                            <h6>{step.texto}</h6>
                        </div>
                    </div>
                    {!step.final && <div className="d-flex align-items-center justify-content-center"><h2>.......</h2><p>.......</p></div>}
                </div>
            )
            }
        </div>
    );
};

export default StatusOrder;
