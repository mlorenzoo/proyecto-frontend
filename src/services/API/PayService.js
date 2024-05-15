export default class PayService {

  async newPayment(user_id, pay_date, plan, amount, clientId) {
		try {
			const url = process.env.API_URL + `/payments`
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json",
          "Content-Type": "application/json"
				},
				method: "POST",
        body: JSON.stringify({ user_id, pay_date, plan, amount })
			});
			const json = await resp.json();

			if (json.success) {
				console.log(json.data)

        const url2 = process.env.API_URL + `/clients/${clientId}`
        const resp2 = await fetch(url2, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          method: "PUT",
          body: JSON.stringify({ subscribed: 1 })
        });
        const json2 = await resp2.json();
        if (json2.success) {
          console.log("GoZZZZZ")
        } else {
          throw new Error("Unable to get user2 ")
        }
			} else {
				throw new Error("Unable to get user ")
			}
		} catch (error) {
			throw error
		}
	}
}
