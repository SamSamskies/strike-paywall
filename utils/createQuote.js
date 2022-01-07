import axios from "axios";

const createQuote = (invoiceId) => {
  return axios({
    method: "post",
    url: "/api/quotes/create",
    data: { invoiceId },
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.log(error);
    });
};

export default createQuote;
