import "@fontsource/montserrat";
import "@fontsource/roboto";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import AppRouter from "./AppRouter";
import keycloak from "./keycloak";

function App() {
  const token = localStorage.getItem("kc_token");
  const refreshToken = localStorage.getItem("kc_refreshtoken");

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ checkLoginIframe: false, token, refreshToken }}
	  
      onTokens={({ token, refreshToken, idToken }) => {
        if (
          token != undefined &&
          refreshToken != undefined &&
          idToken != undefined
        ) {
          localStorage.setItem("kc_token", token);
          localStorage.setItem("kc_refreshtoken", refreshToken);
          localStorage.setItem("kc_refreshtoken", idToken);
        }
      }}
    >
      <AppRouter/>
    </ReactKeycloakProvider>
  );
}

export default App;
