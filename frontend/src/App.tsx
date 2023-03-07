import { useCallback, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./context/authContext";

import { useState } from "react";

function App(): JSX.Element {
  const router = useRoutes(routes);

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userInfos, setUserInfos] = useState(null);

  const login = useCallback(
    (userInfos: null, token: string) => {
      setToken(token);
      setisLoggedIn(true);
      setUserInfos(userInfos);

      localStorage.setItem("user", JSON.stringify({ token }));
    },
    [isLoggedIn]
  );

  const logout = useCallback(() => {
    setToken("");
    setUserInfos(null);
    setisLoggedIn(false);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user") || "{}");
    if (localStorageData) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setisLoggedIn(true);
          setUserInfos(userData);
        });
    } else {
      setisLoggedIn(false);
    }
  }, [login, logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;
