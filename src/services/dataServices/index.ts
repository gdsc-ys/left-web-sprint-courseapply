import axios from 'axios';
import { HOST_URL } from '@data/url';

class DataServices {
	async getData() {
		const response = await axios.get(`${HOST_URL}/`);
		return response;
	}
}

export const dataServices = new DataServices();
