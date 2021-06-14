export const getCookie = (name) => {
  try {
    const cookie = document.cookie.split(';').filter((el) => el.trim().startsWith(name))[0];
    if (cookie) {
      return cookie.split('=')[1];
    }
    return null;
  } catch (e) {
    console.warn(`Unable to get cookie - ${name}`, e);
    return null;
  }
};

export const setCookie = ({ key, value }) => {
  try {
    document.cookie = `${key}=${value}; Path=/; Expires=Thu, 01 Jan 2022 00:00:01 GMT;`;
  } catch (e) {
    console.warn('Unable to set cookie -', key);
  }
};
