import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "../config/axiosClient";
import { useSessionStorage } from "../hooks/useSessionStorage";
const info = {
  title: "",
  description: "",
  image: {},
  author: "",
  publish_date: "",
  categories: [],
  email: "",
};

const AppContext = createContext({
  info: info,
});

export const AppProvider = ({ children }) => {
  const [store, setStore] = useSessionStorage("info", info);
  const [validationErrors, setValidationErrors] = useSessionStorage(
    "blogErrors",
    {}
  );
  const [email, setEmail] = useSessionStorage("email", "");
  const [isLogged, setIsLogged] = useSessionStorage("isLoggedin", "");
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState({});

  const getBlogs = async () => {
    try {
      const response = await axiosClient.get("/blogs");
      console.log(response);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.blog.redberryinternship.ge/api/categories"
        );
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const loginUser = async (email) => {
    try {
      const response = await axios.post(
        "https://api.blog.redberryinternship.ge/api/login",
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer${"7a2b6b3d3f9a5370396c63aebe6118f45bd44e89337ae5206457b71256c5c1a5"}`,
          },
        }
      );
      console.log("Login successful:", response);

      if (response.status === 204) {
        setIsLogged("isLogged");
      } else {
        setIsLogged("isNotLogged");
      }

      return response.data;
    } catch (error) {
      console.error("Error during login:", error.response);
      setIsLogged("isNotLogged");
    }
  };

  const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <AppContext.Provider
      value={{
        isLogged,
        setIsLogged,
        info: store,
        setStore,
        setValidationErrors,
        validationErrors,
        categories,
        blogs,
        animations,
        setBlogs,
        email,
        setEmail,
        loginUser,
        singleBlog,
        setSingleBlog,
        getBlogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
