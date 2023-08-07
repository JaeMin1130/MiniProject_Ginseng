import { API_BASE_URL } from "./api-config";

export function call(api, method, request) {
  const headers = new Headers({
    enctype: "multipart/form-data",
    "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
  });
  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // POST method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      console.log("url", options.url);
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}
