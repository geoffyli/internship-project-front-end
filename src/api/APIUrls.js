// CORS Domain
const corsDomain = 'http://localhost:5173'; 

// Define your base API URL if you have one
const baseUrl = 'http://localhost:9093';

// Define individual API endpoints
const loginUrl = `${baseUrl}/login`;
const signupUrl = `${baseUrl}/signup`;
const logoutUrl = `${baseUrl}/logout`;
const deviceUrl = `${baseUrl}/device`;
const quotaUrl = `${baseUrl}/quota`;
const alarmUrl = `${baseUrl}/alarm`;

const deviceStatusUrl = `${baseUrl}/report/statusCollect`;
const changeDeviceStatusUrl = `${baseUrl}/device/status`;
const alarmLogUrl = `${baseUrl}/alarm/log`;
// const getUserUrl = `${baseUrl}/users`;
// const postDataUrl = `${baseUrl}/data`;

// Export the URLs for use in other parts of your Vue project
export {
  baseUrl,
  loginUrl,
  signupUrl,
  logoutUrl,
  deviceUrl,
  deviceStatusUrl,
  changeDeviceStatusUrl,
  corsDomain,
  quotaUrl,
  alarmLogUrl,
  alarmUrl
//   getUserUrl,
//   postDataUrl,
  // Add more URLs here as needed
};