// import axios from "axios";
// import { apiURL } from "config";
// // import { accessTokenWithType } from 'selectors/auth';

// const instance = axios.create({
//   baseURL: apiURL,

//   headers: {
//     // "Content-Type": "application/json",
//     'Content-Type': 'multipart/form-data',
//     "Accept": "*/*",
//     // "Access-Control-Allow-Headers": "origin,Content-Type,X-Requested-With,X-File-Name, x-mime-type,Accept-Encoding,Authorization, Content-Range,Content-Disposition,Content-Description, Access-Control-Request-Method, Access-Control-Request-Headers",
//     // "Access-Control-Allow-Origin": "http://13.200.156.177:8080",
//     // "Access-Control-Allow-Methods": "GET,DELETE,OPTIONS,POST,PUT"
//   },
// });

// export function createAxios({ getState }: { getState: any }) {
//   console.log(apiURL)
//   instance.interceptors.request.use(
//     (config: any) => {
//       const { useAuth, ...headers } = config.headers;

//       const state = getState();
//     //   headers.Authorization = accessTokenWithType(state);

//       return { ...config, headers };
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// }

// export default instance;


import axios from "axios";
import { apiURL } from "config";

const instance = axios.create({
  baseURL: apiURL,
  headers: {
    "Accept": "*/*", // Default Accept header for all requests.
  },
});

// Function to modify Axios requests dynamically
export function createAxios({ getState }: { getState: any }) {
  instance.interceptors.request.use(
    (config: any) => {
      // Extract headers from the request
      const { contentType, ...headers } = config.headers;

      // 1. Check the request data type
      // If data is `FormData`, set `Content-Type` to `multipart/form-data`
      if (config.data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
      } else {
        // Default to `application/json` if not specified
        headers["Content-Type"] = contentType || "application/json";
      }

      // 2. Handle authorization or other headers from Redux state if needed
      const state = getState();
      // Example: Uncomment the following line if you need to pass an auth token
      // headers.Authorization = accessTokenWithType(state);

      // Return updated configuration
      return { ...config, headers };
    },
    (error) => Promise.reject(error)
  );
}

export default instance;
