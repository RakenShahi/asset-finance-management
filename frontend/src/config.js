// This is where you define the base API URL
export const API_URL = process.env.NODE_ENV === 'development'
  ? '${API_URL}/api'  // Local development URL
  : 'http://ec2-3-107-212-234.ap-southeast-2.compute.amazonaws.com/api';  // Production URL
