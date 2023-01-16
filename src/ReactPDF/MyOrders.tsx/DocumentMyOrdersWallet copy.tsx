import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { CSVLink } from "react-csv";
import Moment from "moment";

function DocumentMyOrdersWallet(
	list: any,
	tradPedido1: any,
	tradPedido2: any,
	tradPedido3: any,
	tradPedido4: any,
	tradPedido5: any,
	tradPedido6: any,
	tradPedido7: any,
	tradPedido8: any,
	tradPedido9: any,
	tradPedido10: any,
	tradPedido11: any,
	tradPedido12: any
) {
	const [userdata, setUserdata] = useState<any>([]);
	useEffect(() => {
		const getuserdata = async () => {
			setUserdata(list);
		};
		getuserdata();
	}, []);
	return (
		<React.Fragment>
			<Container>
				<div className="row">
					<div className="col-sm-8">
						<h4 className="mt-3 mb-3">Export Data in Excel using React Js </h4>

						<CSVLink
							data={userdata}
							filename="RegisterUserData"
							className="btn btn-success mb-3"
						>
							Export User Data
						</CSVLink>

						<table className="table table-bordered text-white">
							<thead>
								<tr>
									<th scope="col">{tradPedido1}</th>
									<th scope="col">{tradPedido2}</th>
									<th scope="col">{tradPedido3}</th>
									<th scope="col">{tradPedido4}</th>
									<th scope="col">{tradPedido5}</th>
									<th scope="col">{tradPedido6}</th>
									<th scope="col">{tradPedido7}</th>
									<th scope="col">{tradPedido8}</th>
									<th scope="col">{tradPedido9}</th>
									<th scope="col">{tradPedido10}</th>
									<th scope="col">{tradPedido11}</th>
								</tr>
							</thead>
							<tbody>
								{userdata.map((itens: any, index: any) => (
									<tr key={index}>
										<td>{itens.tracking} </td>
										<td>{itens.order_number} </td>
										<td>{itens.oc_cliente} </td>
										<td>
											{itens.request_date == ""
												? "-"
												: Moment(itens.request_date).format("DD-MM-YYYY")}{" "}
										</td>
										<td>{itens.cod_produto} </td>
										<td>{itens.descricao_produto} </td>
										<td>{itens.uom} </td>
										<td>{itens.quantidade_vendida} </td>
										<td>{itens.moeda} </td>
										<td>{itens.preco_venda} </td>
										<td>{itens.valor_total} </td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</Container>
		</React.Fragment>
	);
}

export default DocumentMyOrdersWallet;
