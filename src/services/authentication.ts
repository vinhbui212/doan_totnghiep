import { axiosCreatesForme } from "@/api/configApi";

interface IParamsAuthenticationAccount {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
}

export const registerAccountService = (body: IParamsAuthenticationAccount) => {
	return axiosCreatesForme.post("auth/registerCustomer", body);
};

export const loginAccountService = (body: IParamsAuthenticationAccount) => {
	return axiosCreatesForme.post("auth/authenticate", body);
};
