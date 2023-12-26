import React, { useEffect, useState } from 'react'
import RedberryLogo from "../../assets/redberry_logo.png";
import ArrowIcon2 from "../../assets/Arrow-3.svg";
import UploadImg from '../../assets/folder-add.png'
import InputGroup from '../../components/InputGroup';
import TextAreaGroup from '../../components/TextAreaGroup';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import { useGlobalContext } from '../../context/Context';
import { ValidateBlog } from '../../validation/validation';
import GalleryIcon from '../../assets/gallery.png'
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Modal from '../../components/Modal';
import axios from 'axios';
import SuccessIcon from "../../assets/success.png";
import CloseIcon from '../../assets/close.png'


const CreateBlog = () => {
  const [statusCode, setStatusCode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    info,
    setStore,
    setValidationErrors,
    validationErrors,
    animations,
    getBlogs
  } = useGlobalContext();

    const handleTextInputChange = (e) => {
        const { value, name } = e.target;

        let formattedValue = value;

        const updatedInfo = {
            ...info,
            [name]: formattedValue,
        };

        const errors = ValidateBlog(updatedInfo);

        setStore((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errors[name],
        }));
    };

    const handleSelect = (selectedOption, field) => {
        setStore((formData) => ({
            ...formData,
            [field]: selectedOption,
        }));
    };

    const makeBlog = async () => {
      try {
        const formData = new FormData();
        formData.append("title", info.title);
        formData.append("description", info.description);
        formData.append("author", info.author);
        formData.append("publish_date", info.publish_date);
        formData.append("email", info.email);
        const categoryIds = info.categories
          .map((category) => category.id)
          .join(",");
        formData.append("categories", `[${categoryIds}]`);
        const response = await fetch(info.image.url);
        const blob = await response.blob();
        formData.append("image", blob, info.image.url);
        const blogResponse = await axiosClient.post("/blogs", formData);
        if (blogResponse.status === 204) {
          setShowModal(true);
          setStatusCode(blogResponse.status);
          setValidationErrors({})
          setStore({
            title: "",
            description: "",
            image: {},
            author: "",
            publish_date: "",
            categories: [],
            email: "",
          });
          getBlogs();
        }
        console.log("Blog created successfully:", blogResponse);
      } catch (error) {
        console.error("Error creating blog:", error);
      }
    };

    const validateForm = () => {
        const errors = ValidateBlog(info);
        makeBlog()
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
    };

    const handleImageUpload = (event) => {
        const { files } = event.target;

        if (files && files[0]) {
            const selectedImage = files[0];
            const reader = new FileReader();

            reader.onload = () => {
                const dataUrl = reader.result;
                const fileName = selectedImage.name; // Get the file name

                setStore((prevInfo) => ({
                    ...prevInfo,
                    image: {
                        url: dataUrl,
                        name: fileName,
                    },
                }));

                const updatedInfo = {
                    ...info,
                    image: {
                        url: dataUrl,
                        name: fileName,
                    },
                };

                const imageErrors = ValidateBlog(updatedInfo).image;

                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    image: imageErrors,
                }));
            };

            reader.readAsDataURL(selectedImage);
        }
    };

    info.categories.map((category) =>
        console.log(JSON.stringify(category.id))
    );

    const handleImageDelete = () => {
        setStore((prevInfo) => ({
            ...prevInfo,
            image: {},
        }));

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            image: {},
        }));
    };

    const [formValid, setFormValid] = useState(false);

    const checkFormValidity = () => {
        const errors = ValidateBlog(info);

        const isAuthorValid =
            errors.author &&
            Object.values(errors.author).every((error) => error === "valid");

            if (
              isAuthorValid &&
              errors.title == "valid" &&
              errors.description == "valid" &&
              errors.publish_date == "valid" &&
              info.categories.length !== 0 &&
              errors.image == "valid" &&
              errors.email !== "invalid" 
            ) {
              setFormValid(true);
            } else {
              setFormValid(false);
            }
          };

    useEffect(() => {
        checkFormValidity();
    }, [validationErrors, info]);

      const areAllAuthorFieldValid =
        validationErrors.author &&
        Object.values(validationErrors.author).every(
          (error) => error === "valid"
        );

        const isAnyAuthorFieldInvalid = Object.values(
          validationErrors?.author || {}
        ).some((error) => error === "invalid");


      const isFocused = areAllAuthorFieldValid || isAnyAuthorFieldInvalid;
      return (
        <>
          {statusCode === 204 && (
            <Modal showModal={showModal} setShowModal={setShowModal}>
              <AnimatePresence>
                <motion.div
                  key="validContent"
                  className="gap-6 flex flex-col justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img src={SuccessIcon} alt="Success Icon" />
                  <h1 className="font-bold text-[25px]">
                    ჩანაწერი წარმატებით დაემატა
                  </h1>
                  <Link to={"/"} className="w-full">
                    <button
                      type="button"
                      className="bg-[#5D37F3] rounded-xl text-white py-[16px] w-full"
                      onClick={() => setShowModal(false)}
                    >
                      მთავარ გვერდზე დაბრუნება
                    </button>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </Modal>
          )}
    
            <motion.div
                className="max-w-[1920px] min-h-[1080px] bg-[#FBFAFF] flex flex-col gap-12"
                variants={animations}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
            >
            <div className="flex items-center justify-center bg-white px-24 py-8">
              <img src={RedberryLogo} className="w-[100px] md:w-auto" />
            </div>
            <div className="px-[10px] py-8 flex md:px-24">
              <Link to="/" className="hidden lg:block">
                <button
                  className={`bg-[#FFFFFF] h-[44px] w-[44px] rounded-full flex items-center justify-center`}
                >
                  <img src={ArrowIcon2} />
                </button>
              </Link>
              <div className="w-full justify-center flex">
                <div className="w-[720px] flex flex-col gap-4 ">
                  <h1 className="font-bold text-[30px] leading-[45px]">
                    ბლოგის დამატება
                  </h1>
                  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    {Object.keys(info.image).length == 0 ? (
                      <div className="flex flex-col gap-3">
                        <p className="font-medium leading-[20px]">ატვირთეთ ფოტო</p>
                        <div className="relative cursor-pointer w-full bg-[#F4F3FF] border-[2px] border-dashed border-[#85858D] rounded-xl justify-center flex flex-col items-center gap-6 h-[180px]">
                          <input
                            type="file"
                            name="image"
                            className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0"
                            onChange={(event) => handleImageUpload(event)}
                          />
                          <div className="flex flex-col items-center w-full">
                            <img src={UploadImg} />
                            <div className="flex gap-1">
                              <p>ჩააგდეთ ფაილი აქ ან </p>
                              <p className="font-medium underline"> აირჩიეთ ფაილი</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#F2F2FA] px-5 py-6 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={GalleryIcon} />
                          <p className="text-[#1A1A1F] font-medium">
                            {info?.image?.name}
                          </p>
                        </div>
                        <button onClick={handleImageDelete}>
                          <img src={CloseIcon} alt="Close Icon" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-8 flex-col md:flex-row">
                      <div className="flex flex-col gap-3 w-full ">
                        <label
                          className={`font-bold text-[14px] text-[#1A1A1F] ${
                            isAnyAuthorFieldInvalid ? "text-red-500" : ""
                          } md:text-[16px]`}
                        >
                          ავტორი *
                        </label>
                        <div className="w-full relative">
                          <input
                            type="text"
                            placeholder={"შეიყვნეთ ავტორი"}
                            name="author"
                            value={info.author}
                            className={`w-full border-[2px] ${
                              validationErrors?.author && isAnyAuthorFieldInvalid
                                ? "border-red-500"
                                : areAllAuthorFieldValid
                                  ? "border-green-500 bg-[#F8FFF8]"
                                : "#c3c2c8"
                              } border-[#c3c2c8] rounded-2xl px-[15px] py-[16px] outline-none
                              ${!isFocused ? "focus:border-[#5D37F3]" : ""} ${
                                isAnyAuthorFieldInvalid
                                  ? "shakeAnimation"
                                  : ""
                              }`}
                              onChange={handleTextInputChange}
                          />
                        </div>
                        <ul className="font-small text-[13px] list-disc list-inside md:text-15px">
                          <li
                            className={`${
                              validationErrors?.author?.tooShort === "invalid"
                                ? "text-red-500"
                                : validationErrors?.author?.tooShort === "valid"
                                ? "text-green-500"
                                : "text-[#85858D]"
                            }`}
                          >
                            მინიმუმ 4 სიმბოლო
                          </li>
                          <li
                            className={`${
                              validationErrors?.author?.twoWord === "invalid"
                                ? "text-red-500"
                                : validationErrors?.author?.twoWord === "valid"
                                ? "text-green-500"
                                : "text-[#85858D]"
                            }`}
                          >
                            მინიმუმ ორი სიტყვა
                          </li>
                          <li
                            className={`${
                              validationErrors?.author?.georgianChars === "invalid"
                                ? "text-red-500"
                                : validationErrors?.author?.georgianChars ===
                                  "valid"
                                ? "text-green-500"
                                : "text-[#85858D]"
                            }`}
                          >
                            მხოლოდ ქართული სიმბოლოები
                          </li>
                        </ul>
                      </div>
                      <InputGroup
                        label="სათური *"
                        type="text"
                        name="title"
                        placeholder="შეიყვნეთ სათაური"
                        hint="მინიმუმ 2 სიმბოლო"
                        value={info.title}
                        changeHandler={handleTextInputChange}
                        isValid={validationErrors?.title}
                      />
                    </div>
                    <TextAreaGroup
                      name="description"
                      label="აღწერა *"
                      placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                      hint="მინიმუმ 2 სიმბოლო"
                      value={info.description}
                      changeHandler={handleTextInputChange}
                      validation={validationErrors?.description}
                    />
                    <div className="flex-col flex gap-8 items-center md:flex-row">
                      <InputGroup
                        label="გამოქვეყნების თარიღი *"
                        type="date"
                        name="publish_date"
                        value={info.publish_date}
                        changeHandler={handleTextInputChange}
                        isValid={validationErrors.publish_date}
                      />
                      <div className="flex flex-col gap-3 w-full pb-3">
                        <p className={`font-bold text-[14px] text-[#1A1A1F] `}>
                          კატეგორია *
                        </p>
                        <MultiSelectDropdown
                          label="პოზიცია"
                          handleChange={(selectedOption) =>
                            handleSelect(selectedOption, "position")
                          }
                          isValid={validationErrors?.categories}
                        />
                      </div>
                    </div>
                    <div className="w-full md:pr-4 md:w-1/2">
                      <InputGroup
                        label="ელ-ფოსტა *"
                        type="text"
                        name="email"
                        placeholder="Example@redberry.ge"
                        hint="მეილი უნდა მთავრდებოდეს @redberry.ge-ით"
                        value={info.email}
                        changeHandler={handleTextInputChange}
                        isValid={validationErrors.email}
                      />
                    </div>
                    <div className="flex justify-end mt-10">
                      <button
                        className={`bg-[#E4E3EB] rounded-md text-white px-3 md:px-10 py-3 ${
                          formValid
                            ? "cursor-pointer"
                            : "cursor-not-allowed opacity-50"
                        }`}
                        type="submit"
                        disabled={!formValid}
                        style={{
                          backgroundColor: formValid ? "#5D37F3" : "#E4E3EB",
                        }}
                      >
                        გამოქვეყნება
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      );
    }

export default CreateBlog