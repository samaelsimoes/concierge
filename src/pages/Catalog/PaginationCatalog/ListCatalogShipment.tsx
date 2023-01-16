import { AiOutlineDownload } from "react-icons/ai";
import './listCatalog.css';
export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

const CatalogShipment = ({listItensCatalog, loading, func, funcModal}:any) => {

     const downloadDocument = async(id:any, fileName:any, file:any) => {
        let url = 'https://www.portobello.com.br/produtos/download/' + id + '/' + fileName + '.' + file;
        var win = window.open(url, '_blank');
        win?.focus();
    }

    return (   
        <div className="row">         
            {listItensCatalog && listItensCatalog.length > 0 ? (
                listItensCatalog?.map((itens:any, index:any) => {
                    return(
                        <div className="col-md-3 style-padding-card" key={index}> 
                            <div className="card style-card">
                                <img className="style-card-img-top" src={"https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/"+itens.thumb} />

                                <div className="card-body">
                                    <br/>
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <h5 className="card-title style-h4-catalogs-title">{itens.title}</h5>
                                        </div>
                                        <div className="col-sm-2">
                                            <AiOutlineDownload className="style-downloads-icons-catalog" onClick={() => downloadDocument(itens.id, itens.fileName, itens.fileType)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    )               
                    }          
                )
            ) : (
                ""
            )}
        </div>
    );
}

export default CatalogShipment;