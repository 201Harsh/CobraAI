import React, { useEffect, useState } from "react";
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Preloader from "../Utils/Preloader";

const DashboardProtector = ({ children }) => {
  const [IsLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const Navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      Navigate("/");
    }

    const CheckUser = async () => {
      try {
        const res = await AxiosInstance.get("/users/me");

        if (res.status === 200) {
          localStorage.setItem("email", res.data.User.email);
          localStorage.setItem("name", res.data.User.name);
        }
      } catch (error) {
        console.log(error)
        localStorage.clear();
        Navigate("/");
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 25000);
      }
    };

    CheckUser();
  }, [token, Navigate]);

  if (IsLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  return { children };
};

export default DashboardProtector;
