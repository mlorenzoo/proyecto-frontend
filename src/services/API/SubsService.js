export default class SubsService {

	async getSubs() {
		try {
			const url = process.env.API_URL + `/subscriptions`
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

  async addSubs(plan, price, description, duration) {
		try {
			const url = process.env.API_URL + `/subscriptions`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json",
          "Content-Type": "application/json"
				},
				method: "POST",
        body: JSON.stringify({ plan, price, description, duration })
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

  async delSubs(id) {
		try {
			const url = process.env.API_URL + `/subscriptions/${id}`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json"
				},
				method: "DELETE"
			});
			const json = await resp.json();
			console.log(json)
			if (json.success) {
        // No retorno nada
			} else {
				throw new Error("Unable to get user ")
			}
		} catch (error) {
			throw error
		}
	}

}