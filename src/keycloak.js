import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
	url: "https://sgia-clients.portobello.com.br/idp/",

	realm: "customers",
	clientId: "portobello_app1_dev", // local
	//clientId: 'portobello_app1', // dev
	clientSecret: "vrxYN6wVIX1QnNHkd9fMLUlBTd2FFkKb",
});

// keycloak.init({
// 	flow: 'implicit',
// 	onLoad: 'check-sso'
// })

export default keycloak;
