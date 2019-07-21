import axios from "axios";
import { toast } from "react-toastify";

export const logout = history => {
  axios
    .post("/v1/logout.json")
    .then(() => {
      removeUserInfoFromLocalStorage();
      history.push("/");
    })
    .catch(() => {
      toast.error(
        "Could not log you out! Something has gone wrong on our end.."
      );
    });
};

const removeUserInfoFromLocalStorage = () => {
  localStorage.setItem(
    "userState",
    JSON.stringify({
      user: null,
      loggedIn: false
    })
  );
};
