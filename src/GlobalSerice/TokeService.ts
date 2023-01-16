export const TOKEN_KEY = "Employee-token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const doLogin = (token: any) => {
    localStorage.setItem(TOKEN_KEY, token)
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
};