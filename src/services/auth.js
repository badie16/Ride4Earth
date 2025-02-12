import axios from "axios";
import { API_BASE_URL } from "@/src/Constant/Api";


export const register = async (userData) => {
	try {
		const response = await axios.post(
			`${API_BASE_URL}/api/auth/register`,
			userData
		);
		return response.data;
	} catch (error) {
		console.error("Erreur lors de l'enregistrement:", error);
		throw error;
	}
};
