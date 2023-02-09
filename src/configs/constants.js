import moment from "moment";

export const APP_BASE_URL = "http://localhost:8083";

export const numberFormat = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

export const formatDate = (value) =>
  moment(value).format("DD-MM-YYYY").split("T")[0];
