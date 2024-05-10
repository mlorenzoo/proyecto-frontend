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

	async getOneById(id) {
		try {
			const url = process.env.API_URL + `/users/${id}`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json"
				},
				method: "GET",
			});
			const json = await resp.json();
			console.log(json)
			if (json.success) {
				return json.data;
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
			const url = process.env.API_URL + `/users`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json"
				},
				method: "GET",
			});
			const json = await resp.json();
			console.log(json);
			if (json.success) {				
				return json.data;
			} else {
				throw new Error("Unable to get all users")
			}
		} catch (error) {
			throw error
		}
	}

	async doEdit(id, name, surname, email, role) {
		try {
			console.log(name);
			const url = process.env.API_URL + `/users/${id}`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				method: "PUT",
				body: JSON.stringify({ name, surname, email, role })
			});
			const json = await resp.json();
			console.log(json);
			if (json.success) {				
				return json.data;
			} else {
				throw new Error("Unable to get all users")
			}
		} catch (error) {
			throw error
		}
	}

	async doDelete(id) {
		try {
			const url = process.env.API_URL + `/users/${id}`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json"
				},
				method: "DELETE"
			});
			const json = await resp.json();
			console.log(json.success);
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