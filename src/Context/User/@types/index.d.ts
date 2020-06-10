interface IUserInfo {
  name: string;
  email: string;
  alias: string;
  image: string;
}

interface IUserContext {
  isLoading: false;
  userInfo: IUserInfo | undefined;
  login: (email: string, password: string) => void;
  getUserInfo: () => void;
  logout: () => void;
}
