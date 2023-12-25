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

  if (!values?.author || values?.author.trim().length < 4) {
    response.author.tooShort = "invalid";
  }else{
    response.author.tooShort = "valid";
  }

  if (wordCount < 2) {
    response.author.twoWord = "invalid";
  }else{
    response.author.twoWord = "valid";
  }

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


  if (values.email !== undefined) {
    const trimmedEmail = values.email.trim();
    if (trimmedEmail === "") {
      delete response.email;
    } else if (REGEX_EMAIL.test(trimmedEmail)) {
      response.email = "valid";
    } else {
      response.email = "invalid";
    }
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

  return response;
};
