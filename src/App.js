import { useEffect } from "react";
import Routers from "./routers/Routers";
import jwt_decode from "jwt-decode";
import { apis } from "./shared/axios";

function App() {
  useEffect(() => {
    const accessToken = window.localStorage.getItem("access-token");
    if (accessToken) {
      try {
        const { exp } = jwt_decode(accessToken);
        if (Date.now() >= exp * 1000) {
          apis
            .post_reissue()
            .then((response) => {
              localStorage.removeItem("access-token");
              localStorage.removeItem("refresh-token");
              localStorage.setItem(
                "access-token",
                response.headers.authorization
              );
              localStorage.setItem(
                "refresh-token",
                response.headers.refreshtoken
              );
            })
            .catch((err) => {});
          // window.localStorage.removeItem("access-token");
          // window.localStorage.removeItem("refresh-token");
          // window.localStorage.removeItem("user-info");
        }
      } catch (e) {
        window.localStorage.removeItem("access-token");
      }
    }

    if (window.localStorage.getItem("itemCategory")) {
      const itemCategoryString = window.localStorage.getItem("itemCategory");
      const itemCategoryObj = JSON.parse(itemCategoryString);
      if (Date.now() > itemCategoryObj.expire) {
        try {
          window.localStorage.removeItem("itemCategory");
        } catch (e) {
          window.localStorage.removeItem("itemCategory");
        }
      }
    }
  }, []);

  return <Routers />;
}

export default App;
