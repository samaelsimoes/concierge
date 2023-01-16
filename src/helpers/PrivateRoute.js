import { useKeycloak } from "@react-keycloak/web";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const { keycloak, initialized } = useKeycloak();
  const { t } = useTranslation();
  if (
    !initialized ||
    initialized === undefined ||
    keycloak === undefined ||
    keycloak.authenticated === undefined
  )
    return;
  const isLoggedIn = keycloak.authenticated;
  const isAutherized = (roles) => {
    if (keycloak && roles) {
      return roles.some((r) => {
        const realm = keycloak.hasRealmRole(r);
        const resource = keycloak.hasResourceRole(r);
        return realm || resource;
      });
    }
    return false;
  };

  const traducao = t("modal_perfil_1");

  if (isLoggedIn && isAutherized(roles)) {
    return children;
  } else {
    toast.error(traducao);
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
