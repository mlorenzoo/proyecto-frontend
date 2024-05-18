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

	async doEdit(id, data, authToken) {
		try {
			const url = process.env.API_URL + `/users/${id}`;
			// Comprobar si algún campo en data está vacío o no definido
			const isDataEmpty = Object.keys(data).some(key => data[key] === '' || data[key] === undefined);
			let requestBody;
			// Si data está vacío, enviar una solicitud vacía (sin cuerpo)
			if (isDataEmpty) {
				requestBody = {};
			} else {
				requestBody = data;
			}
			const resp = await fetch(url, {
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": `Bearer ${authToken}`
				},
				method: "PUT",
				body: JSON.stringify(requestBody) // Pasar requestBody directamente como cuerpo de la solicitud
			});
			const json = await resp.json();
			console.log(json);
			if (json.success) {                
				return json.data;
			} else {
				throw new Error("No se pudo editar el usuario");
			}
		} catch (error) {
			throw error;
		}
	}

	async updateProfilePicture(id, formData) {
    try {
				const url = process.env.API_URL + `/users/${id}/update-pfp`;
        const resp = await fetch(url, {
					headers: {
						"Accept": "application/json"
					},
					method: "POST",
					body: formData
        });

        const json = await resp.json();
        console.log(json);

        if (json.success) {                
            return json.data;
        } else {
            throw new Error("No se pudo actualizar la imagen de perfil del usuario");
        }
    } catch (error) {
        throw error;
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

	async getClient(id) {
    try {
			console.log(id)
			const url = process.env.API_URL + `/userclient/${id}`;
			const resp = await fetch(url, {
					headers: {
							"Accept": "application/json"
					},
					method: "GET"
			});
			const json = await resp.json();
			console.log(json.data.client_id);
			if (json.success) {
				return(json.data.client_id)
			} else {
					throw new Error("Unable to get all users");
			}
    } catch (error) {
        throw error;
    }
	}

	async getIfSub(client_id) {
    try {
			const url = process.env.API_URL + `/clients/${client_id}`;
			const resp = await fetch(url, {
					headers: {
							"Accept": "application/json"
					},
					method: "GET"
			});
			const json = await resp.json();
			console.log(json);
			if (json.success) {
				return(json.data.subscribed)
			} else {
					throw new Error("Unable to get all users");
			}
    } catch (error) {
        throw error;
    }
	}
	
}