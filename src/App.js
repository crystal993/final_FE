import { useEffect } from "react";
import Routers from "./routers/Routers";
import jwt_decode from "jwt-decode";

function App() {
  useEffect(() => {
    const user = window.localStorage.getItem("access-token");
    if (user) {
      try {
        const { exp } = jwt_decode(user);
        console.log(exp);
        console.log(Date.now());
        if (Date.now() >= exp * 1000) {
          window.localStorage.removeItem("access-token");
          window.localStorage.removeItem("refresh-token");
          window.localStorage.removeItem("user-info");
        }
      } catch (e) {
        window.localStorage.removeItem("access-token");
      }
    }
  }, []);
  return <Routers />;
}

export default App;
