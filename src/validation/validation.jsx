export const ValidateBlog = (values) => {
  const response = {
    author: {
      tooShort: "",
      twoWord: "",
      georgianChars: "",
    },
  };

  const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry\.ge$/;
  const REGEX_NAME = /^[ა-ჰ\s]+$/;

  const words = values.author.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (!REGEX_NAME.test(values?.author)) {
    response.author.georgianChars = "invalid";
  }else{
    response.author.georgianChars = "valid";
  }

  if (!values?.title || values?.title.length < 2) {
    response.title = "invalid";
  } else {
    response.title = "valid";
  }

  if (!values?.description || values?.description.length < 2) {
    response.description = "invalid";
  } else {
    response.description = "valid";
  }


  if (!REGEX_EMAIL.test(values?.email)) {
    response.email = "invalid";
  } else {
    response.email = "valid";
  }

  if (!values?.publish_date) {
    response.publish_date = "invalid";
  } else {
    response.publish_date = "valid";
  }

  if (!values?.categories || !values?.categories.length !== 0) {
    response.categories = "valid";
  } else {
    response.categories = "invalid";
  }

  if (!values?.image || !values?.image.url) {
     response.image = "invalid";
   } else {
     response.image = "valid";
   }

  console.log(response);

  return response;
};