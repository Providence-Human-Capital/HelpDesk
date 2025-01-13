import React from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function logout() {
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);
  const navigate = useNavigate();

  axios
    .post("http://localhost:8888/admin/logout")
    .then((res) => {
      // console.log(res.data);
      logoutAuthUser();
      navigate("/admin");
    })
    .catch((err) => {
      console.log(err);
    });

  return <></>;
}
