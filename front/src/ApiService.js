import { API_BASE_URL } from "./api-config";

export function call(api, method, request) {
  let options = {
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // POST method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
}
