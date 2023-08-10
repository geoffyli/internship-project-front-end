// apiUrls.js

// Define your base API URL if you have one
const baseUrl = 'http://localhost:9093';

// Define individual API endpoints
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;
// const getUserUrl = `${baseUrl}/users`;
// const postDataUrl = `${baseUrl}/data`;

// Export the URLs for use in other parts of your Vue project
export {
  baseUrl,
  loginUrl,
  signupUrl
//   getUserUrl,
//   postDataUrl,
  // Add more URLs here as needed
};