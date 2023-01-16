import { Fragment, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SetFilterData } from "../../../helpers/DataContextFilterConllectionsProvider";
import ModalInventory from "../../Modal/ModalInventory";
import {
	Asc,
	AscIcon,
	DescIcon,
	Dsc
} from "../../TableSort/StyleOrderItens.element";
import "./ListItens.css";

const ListItensInventory = ({
	listItensIventory,
	loading,
	orderParam,
	orderTable,
}: any) => {
	
	let listProductRefEstoque = useRef<RefObject>(null);
	listProductRefEstoque.current?.refEstoque();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { t } = useTranslation();

	const [order, setOrders] = useState(1);
	const { filtro, DataFilters } = SetFilterData();

	const [orderName, setOrderName] = useState(-1);
	const [orderCode, setOrderCode] = useState(-1);
	const [orderTotalStock, setOrderTotalStock] = useState(1);
	const [orderUnitMeasere, setOrderUnitMeasure] = useState(1);

	interface RefObject {
		refEstoque: () => void;
	}

	const paramFilterOrder = (e: any, ord: any) => {
		let param: any = {};

		param = {
			type: "orderFild",
			param: e,
			order: ord,
		};
		DataFilters(param);
	};

	const setItens = (fieldName: any) => {
		let order = 1;
		switch (fieldName) {
			case "name":
				order = -orderName;

				if (orderName == 1) {
					paramFilterOrder("name_asc", order);
				} else {
					paramFilterOrder("name_desc", order);
				}
				setOrderName(-orderName);
				setOrders(-order);
				break;
			case "code":
				order = -orderCode;

				if (orderCode == 1) {
					paramFilterOrder("sku_asc", order);
				} else {
					paramFilterOrder("sku_desc", order);
				}
				setOrderCode(-orderCode);
				setOrders(-order);

				break;
			case "totalStock":
				setOrderTotalStock(-orderTotalStock);
				setOrders(-order);
				break;
			case "unit_measure":
				setOrderUnitMeasure(-orderUnitMeasere);
				setOrders(-order);
				break;
			default:
				
		}
	};

	const handleOrder = async (fieldName: any) => {
		await setItens(fieldName);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		switch (orderParam) {
			case "sku_asc":
				setOrderCode(orderTable);
				setOrders(orderTable);
				break;
			case "sku_desc":
				setOrderCode(orderTable);
				setOrders(orderTable);
				break;
			case "name_asc":
				setOrderName(orderTable);
				setOrders(order);
				break;
			case "name_desc":
				setOrderName(orderTable);
				setOrders(orderTable);
				break;
			default:
		}
	});

	return (
		<div className="table-responsive">
			<Fragment>
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={true}
					style={{
						position: "absolute" as "absolute",
					}}
				>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</Fragment>

			<table className="table table-hover">
				<thead className="">
					<tr>
						<th scope="col" onClick={() => handleOrder("name")}>
							{t("grid_table_2")} {orderName == 1 ? <Dsc /> : <Asc />}
						</th>
						<th scope="col" onClick={() => handleOrder("code")}>
							SKU {orderCode == 1 ? <AscIcon /> : <DescIcon />}{" "}
						</th>
						<th scope="col">TOTAL </th>
						<th scope="col">UOM </th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody
					className="table-group-divider"
					style={{
						textAlign: "start",
						padding: "1rem",
						verticalAlign: "middle",
						fontWeight: "normal",
					}}
				>
					{listItensIventory && listItensIventory.length > 0
						? listItensIventory.map((itens: any, index: any) => {
								return (
									<tr key={index}>
										<th
											scope="row"
											className="th-align-left"
											style={{
												width: "40%",
												textAlign: "left",
											}}
										>
											<img
												src={
													"https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/" +
													itens.zoomImage
												}
												style={{
													width: "60px",
													height: "60px",
												}}
											/>{" "}
											&nbsp;{itens.name}
										</th>
										<td>{itens.code}</td>
										<td>{itens.totalStock}</td>
										<td
											style={{
												width: "15%",
											}}
										>
											{itens.unit_measure}
										</td>
										<td
											style={{
												width: "15%",
											}}
										>
											<a
												href="#"
												style={{ color: "#000" }}
												onClick={handleShow}
											></a>
											<ModalInventory
												itemModalEstoque={itens}
												ref={listProductRefEstoque}
											/>
										</td>
									</tr>
								);
						  })
						: ""}
				</tbody>
			</table>
		</div>
	);
};

export default ListItensInventory;
