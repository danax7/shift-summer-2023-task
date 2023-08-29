export interface IAuthContext {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}
