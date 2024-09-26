import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import constants from "./constants";
import notifications from "../component/Notifications/Notifications";
export const optionsLang = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
];

export const optionsCurrency = [
  { value: "USD", label: "USD" },
  { value: "BTC", label: "BTC" },
];

export const isLang = (data) => {
  if (data === "en") {
    return {
      value: "en",
      label: "English",
    };
  }
  if (data === "es") {
    return {
      value: "es",
      label: "Spanish",
    };
  }
  return {
    value: "en",
    label: "English",
  };
};

export const round = (value, lenth) => parseFloat(value).toFixed(lenth);

export const amountFormat = (value) =>
  value
    .replace(",", ".")
    .replace(/[^\d\.]/g, "")
    .replace(/\./, "x")
    .replace(/\./g, "")
    .replace(/x/, ".");

export const customStyles = {
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    zIndex: 2,
    backgroundColor: "#fff",
    color: isSelected ? "#359C67" : isFocused ? "#53C48A" : "#000",
    cursor: "pointer",
    padding: " 5px 15px",
  }),
  control: (style) => ({
    display: "flex",
    justifyContent: "spaceBetween",
    alignItems: "center",
    height: "38px",
    cursor: "pointer",
  }),
  menu: (style) => ({
    marginTop: 10,
    border: "1px solid var(--border-color-main)",
    borderRadius: "5px",
    position: "absolute",
    top: "100%",
    width: "100%",
    height: "10px",
    left: 0,
    zIndex: 5,
  }),
  singleValue: (style) => ({
    color: "#fff",
  }),
  dropdownIndicator: (style) => ({
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  valueContainer: (style) => ({
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "500",
    padding: "10px 0",
    display: "flex",
    alignItems: "center",
  }),
  menuList: (style) => ({
    padding: "10px 0",
    borderRadius: "10px",
    background: "#fff",
    boxShadow:
      "0px 0px 2px rgb(40 41 61 / 4%), 0px 4px 8px rgb(96 97 112 / 16%)",
  }),
};

export const customStyles2 = {
  option: (styles, { isFocused, isSelected, isActive }) => ({
    ...styles,
    zIndex: 2,
    backgroundColor: isSelected ? "#fff" : isFocused ? "#fff" : "#fff",
    color: isSelected ? "#359C67" : isFocused ? "#53C48A" : "#000",
    cursor: "pointer",
    padding: " 5px 15px",
    // borderRadius: "10px",
  }),
  control: (style) => ({
    display: "flex",
    justifyContent: "spaceBetween",
    alignItems: "center",
    // height: "38px",
    cursor: "pointer",
    width: "inherit",
  }),
  menu: (style) => ({
    marginTop: "10px",
    backgroundColor: "#fff",
    left: 0,
    borderRadius: "10px",
    position: "absolute",
    top: "100%",
    width: "100%",
    boxShadow:
      "0px 0px 2px rgb(40 41 61 / 4%), 0px 4px 8px rgb(96 97 112 / 16%)",
  }),
};

export const clearJWT = () => {
  delete axios.defaults.headers.common.Authorization;
  Cookies.remove(constants.jwtToken);
};

export const setAuthorizationToken = (token = null) => {
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export const formatData = (value, format) => moment(value).format(format);

export const articleEn = [
  {
    id: 1,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 2,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 3,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 4,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 5,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 6,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolordo amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 7,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 8,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 9,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 10,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

export const articleEs = [
  {
    id: 1,
    title: "Esw to use the Crypto.Exchange platform?",
    text:
      "Eset minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis" +
      " enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Eset minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim" +
      " velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 2,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 3,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 4,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 5,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 6,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolordo amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 7,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 8,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 9,
    title: "How to use the Crypto.Exchange platform?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
  {
    id: 10,
    title:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint?",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. ",
    text2:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  },
];

export const homeSliderEn = [
  {
    id: "1",
    images: "images/content/user.jpg",
    text: "I’m so glad I found CryptoExchange. The site was easy to use and by the time I paid off my loan I had already made money on my bitcoin!",
    name: "Zach R.",
  },
  {
    id: "2",
    images: "images/content/user2.jpg",
    text: "I was skeptical at first and I thought it might be a scam but the custom service agents were so helpful. They answered all my questions, walked me through how to make the payment process and once I paid it off, I moved my bitcoin to my BlockChain wallet.",
    name: "Ricky S.",
  },
  {
    id: "3",
    images: "images/content/user3.jpg",
    text: "No complaints, quick and easy to use. I’ve already started my second advance. ",
    name: "Raj N.",
  },
  {
    id: "4",
    images: "images/content/user4.jpg",
    text: "Everyone around me was investing in crypto and talking about the money they have made, and I wanted in. I didn’t have cash on hand I need to make the kind of investment that would yield a solid return.  A buddy told me about BTC Advance just as he was wrapping up his final payments. I decided to give it a try and I’m so glad I did! I got a lump sum of bitcoin at good price. It’s a long-term investment so I’m looking forward to watching my $ grow. I’m planning to start my second advance as soon as there is a slight dip in the market.",
    name: "Jose R.",
  },
  {
    id: "5",
    images: "images/content/user5.jpg",
    text: "I wish BTC Advance was around a few years ago! I’d be rich. It’s a no brainer, buy bitcoin, pay it off over time and watch your money grow.",
    name: "Joey J.",
  },
  {
    id: "6",
    images: "images/content/user.png",
    text: "I’ve been a small-time player in the crypto game for the last few years and I’ve lost some money but made more. I like BTC Advance because I can make my payments with crypto buy larger amounts than I otherwise would be able too. ",
    name: "Rebecca H.",
  },
];

export const homeSliderEs = [
  {
    id: "1",
    images: "images/content/user.jpg",
    text: "I’m so glad I found CryptoExchange. The site was easy to use and by the time I paid off my loan I had already made money on my bitcoin!",
    name: "Zach R.",
  },
  {
    id: "2",
    images: "images/content/user2.jpg",
    text: "I was skeptical at first and I thought it might be a scam but the custom service agents were so helpful. They answered all my questions, walked me through how to make the payment process and once I paid it off, I moved my bitcoin to my [BlockChain] wallet.",
    name: "Ricky S.",
  },
  {
    id: "3",
    images: "images/content/user3.jpg",
    text: "No complaints, quick and easy to use. I’ve already started my second advance. ",
    name: "Raj N.",
  },
  {
    id: "4",
    images: "images/content/user4.jpg",
    text: "Everyone around me was investing in crypto and talking about the money they have made, and I wanted in. I didn’t have cash on hand I need to make the kind of investment that would yield a solid return.  A buddy told me about BTC Advance just as he was wrapping up his final payments. I decided to give it a try and I’m so glad I did! I got a lump sum of bitcoin at good price. It’s a long-term investment so I’m looking forward to watching my $ grow. I’m planning to start my second advance as soon as there is a slight dip in the market.",
    name: "Jose R.",
  },
  {
    id: "5",
    images: "images/content/user.jpg",
    text: "I wish BTC Advance was around a few years ago! I’d be rich. It’s a no brainer, buy bitcoin, pay it off over time and watch your money grow.",
    name: "Joey J.",
  },
  {
    id: "6",
    images: "images/content/user2.jpg",
    text: "I’ve been a small-time player in the crypto game for the last few years and I’ve lost some money but made more. I like BTC Advance because I can make my payments with crypto buy larger amounts than I otherwise would be able too. ",
    name: "Rebecca H.",
  },
];

export const errorsMessage = (error) => {
  if (error?.response?.data?.errors?.[0]) {
    notifications(
      "danger",
      "Errors",
      error?.response?.data?.errors?.[0]?.replace(/\_/g, " ")
    );
  } else if(error?.response?.data?.errors){
    let err = error?.response?.data?.errors;
    for (const property in err) {
        if(typeof err[property][0] === 'undefined'){}else{
          notifications(
            "danger",
            "Errors",
            err[property][0]?.replace(/\_/g, " ")
          )
        }
    }
  }else {
    notifications("danger", "Errors", "Server error data!");
  }
};
export const successMessage = (error) => {
    notifications(
      "success",
      "Success",
      "Check your Email to activate your account",
    );
  
};

export const warningMessage = (error) => {
    notifications(
      "warning",
      "Warning",
      error
    );
};

const editText = (text) => {
  let newText = "";
  const arrayText = text.split("_");
  const firstWord = arrayText[0][0].toUpperCase() + arrayText[0].slice(1);

  for (let i = 0; i < arrayText.length; i += 1) {
    if (i > 0) {
      newText += ` ${arrayText[i]}`;
    } else {
      newText += firstWord;
    }
  }
  return newText;
};

export const textError = (array) => {
  if (!array) return "error";
  const keys = Object?.keys(array);
  if (typeof array[keys] === "string") {
    return editText(array[keys]);
  }
  return editText(array[keys][0]);
};
