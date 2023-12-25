import React from 'react'
import RedberryLogo from "../../assets/redberry_logo.png";
import ArrowIcon2 from "../../assets/Arrow-3.svg";
import UploadImg from '../../assets/folder-add.png'
import InputGroup from '../../components/InputGroup';
import TextAreaGroup from '../../components/TextAreaGroup';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import { useGlobalContext } from '../../context/Context';
import { ValidateBlog } from '../../validation/validation';


const CreateBlog = () => {
    const { info, setStore, setValidationErrors, validationErrors } =
      useGlobalContext();
      
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
    const validateForm = () => {
        const errors = ValidateBlog(info);
      };
  
      const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
      };

    return (
        <div className="min-w-[1920px] min-h-[1080px] bg-[#E4E3EB] flex flex-col gap-12">
            <div className="flex items-center justify-center bg-white px-24 py-8">
                <img src={RedberryLogo} />
            </div>
            <div className="px-24 py-8 flex">
                <button className={`bg-[#FFFFFF] h-[44px] w-[44px] rounded-full flex items-center justify-center`} >
                    <img src={ArrowIcon2} />
                </button>
                <div className="w-full justify-center flex">
                    <div className="w-[720px] flex flex-col gap-4 ">
                        <h1 className="font-bold text-[30px] leading-[45px]">
                            ბლოგის დამატება
                        </h1>
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                <p className="font-medium leading-[20px]">ატვირთეთ ფოტო</p>
                                <div className="relative cursor-pointer w-full bg-[#F4F3FF] border-[2px] border-dashed border-[#85858D] rounded-xl justify-center flex flex-col items-center gap-6 h-[180px]">
                                    <input
                                        type="file"
                                        name="image"
                                        className="cursor-pointer absolute top-0 left-0 w-full h-full opacity-0"
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
                            <div className="flex gap-8 items-center">
                            <div className="flex flex-col gap-3 w-full ">
                                    <label
                                        className={`font-bold text-[14px] text-[#1A1A1F] ${
                                        validationErrors.author == "invalid" ? "text-red-500" : ""
                                        } md:text-[16px]`}
                                    >
                                        ავტორი *
                                    </label>
                                    <div className="w-full relative">
                                        <input
                                        type="text"
                                        name="author"
                                        value={info.author}
                                        className={`w-full border-[2px] ${
                                            Object.values(validationErrors.author).some(
                                            (error) => error === "invalid"
                                            )
                                            ? "border-red-500"
                                            : Object.values(validationErrors.author).every(
                                                (error) => error === "valid"
                                                )
                                            ? "border-green-500"
                                            : "#c3c2c8"
                                        } border-[#c3c2c8] rounded-2xl px-[15px] py-[16px] outline-none`}
                                        onChange={handleTextInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p
                                        className={`font-small text-[13px] ${
                                            validationErrors.author.tooShort === "invalid"
                                            ? "text-red-500"
                                            : validationErrors.author.tooShort === "valid"
                                            ? "text-green-500"
                                            : "text-[#85858D]"
                                        } md:text-15px`}
                                        >
                                        მინიმუმ 4 სიმბოლო
                                        </p>
                                        <p
                                        className={`font-small text-[13px] ${
                                            validationErrors.author.twoWord === "invalid"
                                            ? "text-red-500"
                                            : validationErrors.author.twoWord === "valid"
                                            ? "text-green-500"
                                            : "text-[#85858D]"
                                        } md:text-15px`}
                                        >
                                        მინიმუმ ორი სიტყვა
                                        </p>

                                        <p
                                        className={`font-small text-[13px] ${
                                            validationErrors.author.georgianChars === "invalid"
                                            ? "text-red-500"
                                            : validationErrors.author.georgianChars === "valid"
                                            ? "text-green-500"
                                            : "text-[#85858D]"
                                        } md:text-15px`}
                                        >
                                        მხოლოდ ქართული სიმბოლოები
                                        </p>
                                    </div>
                                    </div>
                                <InputGroup
                                    label="სათაური *"
                                    type="text"
                                    name="title"
                                    placeholder="შეიყვნეთ სათაური"
                                    hint="მინიმუმ 2 სიმბოლო"
                                    value={info.title}
                                    changeHandler={handleTextInputChange}
                                    validation={validationErrors?.description}
                                />
                            </div>
                            <TextAreaGroup
                                name="description"
                                label="აღწერა *"
                                placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                                hint="მინიმუმ 4 სიმბოლო, ქართული ასოები"
                                value={info.description}
                                changeHandler={handleTextInputChange}
                                isValid={validationErrors.publish_date}
                            />
                        <div className="flex gap-8 items-center">
                            <InputGroup
                            label="გამოქვეყნების თარიღი *"
                            type="date"
                            name="publish_date"
                            value={info.publish_date}
                            changeHandler={handleTextInputChange}
                            />
                            <div className="flex flex-col gap-3 w-full pb-3">
                                <p className={`font-bold text-[14px] text-[#1A1A1F] `} >
                                    კატეგორია
                                </p>
                                <MultiSelectDropdown
                                    label="პოზიცია"
                                    handleChange={(selectedOption) =>
                                        handleSelect(selectedOption, "position")
                                    }
                                />
                            </div>
                            </div>
                            <InputGroup
                                label="ელ-ფოსტა"
                                type="text"
                                name="email"
                                placeholder="Example@redberry.ge"
                                hint="მეილი უნდა მთავრდებოდეს @redberry.ge-ით"
                                value={info.email}
                                changeHandler={handleTextInputChange}
                                isValid={validationErrors.email}
                            />
                            <div className='flex justify-end'>
                            <button
                                className="bg-[#adadad] rounded-md text-white px-10 py-3"
                                type="submit">გამოქვეყნება</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog