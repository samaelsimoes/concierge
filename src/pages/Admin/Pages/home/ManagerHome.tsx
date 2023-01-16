import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Paragraph } from "../../../../globalStyles";

import { ItemParagraph, ThumbImage } from "../ManagerAdmStyle.elements";

import ApiAdm from "../../ApiAdm/ApiAdm";
import "../ManagerAdm.css";
import ModalAdd from "../modal/ModalAdd";
import ModalEdit from "../modal/ModalEdit";
import ModalExcluir from "../modal/ModalExcluir";
import { versionReact } from "../../../../components/Version/Version";

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

interface ItensBanner {
	active: string;
	createdAt: string;
	id: string;
	image: string;
	name: string;
	page: string;
}

const ManagerHome = () => {
	const { t } = useTranslation();
	let listProductRef = useRef<RefObject>(null);
	let listProductRefEstoque = useRef<RefObject>(null);
	let listProductRefDetalhe = useRef<RefObject>(null);

	const [listItensBannerSuperior, setCurrentPostsBannerSup] = useState<any>();
	const [listItensBannerInferior, setCurrentPostsInferior] = useState<any>();

	const [valueModal, setModalControl] = useState<boolean>(false);

	listProductRefEstoque.current?.refEstoque();
	listProductRefDetalhe.current?.refDetalhe();
	listProductRef.current?.refPacking();

	const serviceAdm = async () => {
		let url = "/banner/findbypage/home";
		await ApiAdm.get(url, {
			headers: {
				access_token: localStorage.getItem(TOKEN_KEY)
					? "" + localStorage.getItem(TOKEN_KEY)
					: "",
				client_id: "2569d5b3-765c-4262-8037-979daca99782",
				Authorization:
					"Basic MjU2OWQ1YjMtNzY1Yy00MjYyLTgwMzctOTc5ZGFjYTk5NzgyOjMyZjc1NDhkLTg4M2EtNGUyNi04ZTkyLThhYThlOGM2ZTQzZQ",
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				const itensBannerSuperior: Array<ItensBanner> = [];
				const itensBannerInferior: Array<ItensBanner> = [];

				response.data.forEach((elem: any) => {
					let paramElem = {
						active: elem.active,
						createdAt: elem.createdAt,
						id: elem.id,
						image: elem.filename,
						name: elem.name,
						page: elem.page,
					};

					if (elem.id.includes("banner_superior")) {
						itensBannerSuperior.push(paramElem);
					} else if (elem.id.includes("banner_inferior")) {
						itensBannerInferior.push(paramElem);
					}
				});

				const currentPostBannerSuperior = itensBannerSuperior.slice(0, 10);
				const currentPostBannerInferior = itensBannerInferior.slice(0, 10);
				setCurrentPostsBannerSup(currentPostBannerSuperior);
				setCurrentPostsInferior(currentPostBannerInferior);
			})
	};

	const modalControl = async (e: any) => {
		setModalControl(e);
		serviceAdm();
	};

	const controlModal = (value: any) => modalControl(value);

	useEffect(() => {
		const fetchData = async () => {
			await serviceAdm();
		};
		fetchData();
	}, []);

  useEffect(() => {
    const fetchData = async () => {
      await serviceAdm();
    };
    fetchData();
  }, [
    
  ]);
    
  return (
      <div className="col-lg-12">
        <div className="row">
          <div className="col">
            <Paragraph size="36px">{/*t("grid_table_1")*/}Gerenciar banner home</Paragraph>
          </div>                
        </div>
        <div className="row table-responsive">
          <div className="col-md-12">
            <table className="table-hover table table-style-admin">
              <thead>
                <tr className="">
                  <th scope="col">{/*t("grid_table_1")*/}Imagem Banner superior</th>
                  <th scope="col">Titulo</th>
                  <th scope="col" className="button-admin-th">{/*t("grid_table_1")*/} 
                    <ModalAdd  
                      stateModal={controlModal}
                      pageLocal={'home'}
                      local={"banner_superior_home_"} />
                  </th>                     
                </tr>
              </thead>
              <tbody>
                {listItensBannerSuperior?.map((item:any, index: number) => {
                  return (
                    <tr style={{ marginTop: "40px", paddingBottom: "31px" }} key={index}>
                      <td>                     
                        <ThumbImage
                          src={`https://portobello.com.br/concierge/images/${item.image}` + '?v='+ versionReact()}                
                          />
                      </td>
                      <td >
                        <div className="row">
                          <ItemParagraph>{item.name}</ItemParagraph>
                        </div>
                        
                        <div className="style-tag-a">
                          
                        </div>
                      </td>
                      <td className="button-admin-td">
                        <ModalEdit idCarousel={item.id}
                          imageCarousel={item.image}
                          titleCarousel={item.name}
                          stateModal={controlModal} />
                        <ModalExcluir 
                          id={item.id}
                          stateModal={controlModal}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <br/><br/><br/>

        <div className="row table-responsive">
          <div className="col-md-12">
            <table className="table-hover table table-style-admin">
              <thead>
                <tr className="">
                  <th scope="col">{/*t("grid_table_1")*/}Imagem Banner superior</th>
                  <th scope="col">Titulo</th>
                  <th scope="col" className="button-admin-th">{/*t("grid_table_1")*/} 
                    <ModalAdd  
                      stateModal={controlModal}
                      pageLocal={'home'}
                      local={"banner_superior_home_"} />
                  </th>                     
                </tr>
              </thead>
              <tbody>
                {listItensBannerInferior?.map((item:any, index: number) => {
                  return (
                    <tr style={{ marginTop: "40px", paddingBottom: "31px" }} key={index}>
                      <td>
                        <ThumbImage
                        src={`https://portobello.com.br/concierge/images/${item.image}` + '?v='+ versionReact()}                
                        />
                      </td>
                      <td >
                        <div className="row">
                          <ItemParagraph>{item.name}</ItemParagraph>
                        </div>
                        
                        <div className="style-tag-a">
                          
                        </div>
                      </td>
                      <td className="button-admin-td">
                        <ModalEdit idCarousel={item.id}
                          imageCarousel={item.image}
                          titleCarousel={item.name}
                          stateModal={controlModal} />
                        <ModalExcluir 
                          id={item.id}
                          stateModal={controlModal}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>                   
  );
};

export default ManagerHome;
