import request from "../axios";
import { LOGIN_URL, SIGN_UP_URL } from "../url";

export const signUpApi = async (payload) => {
  return request.post(SIGN_UP_URL, { data: { attributes: { ...payload } } });
};

export const loginApi = async (payload) => {
  return request.post(LOGIN_URL, { data: { attributes: { ...payload } } });
};
