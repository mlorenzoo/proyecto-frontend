export default class UserService {

	async getOne(authToken) {
		try {
			const url = process.env.API_URL + `/user`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json",
					"Authorization": `Bearer ${authToken}`
				},
				method: "GET",
			});
			const json = await resp.json();
			console.log(json)
			if (json.success) {
				return json;
			} else {
				throw new Error("Unable to get user ")
			}
		} catch (error) {
			throw error
		}
	}

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

}