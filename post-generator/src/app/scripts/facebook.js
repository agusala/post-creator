import axios from 'axios';

const facebookAPI = axios.create({
  baseURL: 'https://graph.facebook.com/v.20.0/',
});
facebookAPI.get('/me', {
  params: {
    access_token: 'EAAMQ30J3R08BO7EsttfcoGSRrfRNh4CEKFqwgeZA0ZBGBHFLqWJFeTtrk9rAcAsqHWnTB0tEmN71V6Gr9wUUkeJuW24zC3sKIKQo5z3NGf3BwYj8OSBXNfinu4DhTjQiiZApvuLMqdJUZCZBVURYcSI8gKpABTHqBHD12pwG3Tw8dkURxB8mZB4GFTRTwszHgSHPjNAIOaXiBGNmOgLTnDmQZDZD',
  },
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
