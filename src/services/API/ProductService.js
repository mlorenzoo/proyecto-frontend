export default class ProductService {

	async getAll(filters = {}) {
		try {
			const params = new URLSearchParams(filters)
			const url = process.env.API_URL + `/products?${params}`
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
				throw new Error("Unable to get all products")
			}
		} catch (error) {
			throw error
		}
	}

	async getOne(id) {
		try {
			const url = process.env.API_URL + `/products/${id}`
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
				throw new Error("Unable to get product " + id)
			}
		} catch (error) {
			throw error
		}
	}

}