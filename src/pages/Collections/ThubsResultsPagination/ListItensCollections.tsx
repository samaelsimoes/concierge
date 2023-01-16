import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ListItensCollections = ({ listCollections, loading }: any) => {

    const { t } = useTranslation()
    const ajustCLick = () => {
        window.scrollTo(0, 0);
    }

    if (listCollections.length === 0) {
        return <h3>{t("search_not_found")}</h3>
    }

    return (
        <div className="row style-container">
            {listCollections && listCollections.length > 0 ? (
                listCollections.map((collection: any) => (
                    <div className="col-md-6" key={collection.id}>
                        <Link to={"/collection/" + collection.id + "/" + collection.name} style={{ textDecoration: "none" }} onClick={ajustCLick}>
                            <img src={"https://imagens.portobello.com.br/unsafe/fit-in/600x600/https://www.portobello.com.br/" + collection.medioImage}
                                className="style-image-collection-list "
                            />
                            <h4 className="style-title-collection-list" style={{ color: "black" }}>{collection.name}</h4>
                        </Link>
                    </div>
                ))
            ) : (
                ""
            )}
        </div>
    );
}

export default ListItensCollections;
