import { createContext } from "react";
export interface ContextProps {
  isLoggedIn: boolean;
  token: boolean | string;
  userInfos: userInfosItem | null;
  login: (userInfos: null, token: string) => void;
  logout: () => void;
}

export interface userInfosItem {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profile: string;
  phone: string;
  courses?: CoursesEntity[] | null;
}
export interface CoursesEntity {
  _id: string;
  name: string;
  description: string;
  cover: string;
  shortName: string;
  categoryID: string;
  creator: string;
  createdAt: string;
  courseAverageScore: number;
  discount: string;
  updatedAt: string;
  __v: number;
  isComplete: number;
  support: string;
  price: number;
  status: string;
}
const AuthContext = createContext<ContextProps>({
  isLoggedIn: false,
  token: false,
  userInfos: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
