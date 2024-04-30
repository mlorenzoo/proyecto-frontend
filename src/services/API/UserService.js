export default class UserService {

	async getAll(filters = {}) {
		try {
			const params = new URLSearchParams(filters)
			const url = process.env.API_URL + `/users?${params}`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json"
				},
				method: "GET",
			});
			const json = await resp.json();
			if (json.success) {				
				return json.data;
			} else {
				throw new Error("Unable to get all users")
			}
		} catch (error) {
			throw error
		}
	}

	async getOne(id) {
		try {
			const url = process.env.API_URL + `/users/${id}`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json"
				},
				method: "GET",
			});
			const json = await resp.json();
			if (json.success) {
				return json.data;
			} else {
				throw new Error("Unable to get user " + id)
			}
		} catch (error) {
			throw error
		}
	}

}