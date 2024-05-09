export default class BarbershopsService {

  async getBarbershop() {
    try {
      const url = process.env.API_URL + "/barbershops";
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      console.log(json.barbershops);
      if (json.success) {        
        return json.barbershops
      } else {
        throw new Error("Unable to get barbershops")
      }
    } catch (error) {
      throw error
    }
  }

  async getBarbershopById(id) {
    try {
      const url = process.env.API_URL + `/barbershops/${id}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      console.log(json);
      if (json.success) {        
        return json.barbershop
      } else {
        throw new Error("Unable to get barbershop")
      }
    } catch (error) {
      throw error
    }
  }

  async addBarbershop(name, ubication, lat, lon, gestor_id) {
    try {
      console.log(lat, lon)
      const url = process.env.API_URL + "/barbershops";
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ name, ubication, lat, lon, gestor_id })
      });
      const json = await resp.json();
      console.log(json);
      if (json) {
        
      } else {
        throw new Error("Unable to login")
      }
    } catch (error) {
      throw error
    }
  }

  async delBarbershop(id) {
    try {
      const url = process.env.API_URL + `/barbershops/${id}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "DELETE"
      });
      const json = await resp.json();
      console.log(json);
      if (json.success) {        

      } else {
        throw new Error("Unable to login")
      }
    } catch (error) {
      throw error
    }
  }
  // async doRegister(name, surname, email, password) {
  //   try {
  //     const url = process.env.API_URL + "/register"; // Suponiendo que la ruta correcta para el registro es '/register'
  //     const resp = await fetch(url, {
  //       headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       method: "POST",
  //       body: JSON.stringify({ name, surname, email, password }) // Envía los datos de registro como JSON
  //     });
  //     const json = await resp.json();
  //     console.log(json);
  //     if (json.success) {
  //       return json.authToken; // Retorna el token de autenticación si el registro es exitoso
  //     } else {
  //       throw new Error("Unable to register");
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async doRegisterRole(name, surname, email, password, role) {
  //   try {
  //     const url = process.env.API_URL + "/register";
  //     const resp = await fetch(url, {
  //       headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       method: "POST",
  //       body: JSON.stringify({ name, surname, email, password, role }) // Envía los datos de registro como JSON
  //     });
  //     const json = await resp.json();
  //     console.log(json);
  //     if (json.success) {
  //       return json.authToken; // Retorna el token de autenticación si el registro es exitoso
  //     } else {
  //       throw new Error("Unable to register");
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async doLogout(authToken) {
  //   try {
  //     const url = process.env.API_URL + "/logout";
  //     const resp = await fetch(url, {
  //       headers: {
  //         "Authorization": `Bearer ${authToken}`,
  //         "Accept": "application/json"
  //       },
	// 			method: "POST"
  //     });
  //     const json = await resp.json();
  //     if (json.success) {
  //       // Retorna true para indicar que el cierre de sesión fue exitoso
  //       return true;
  //     } else {
  //       throw new Error("Unable to logout");
  //     }
  //   } catch (error) {
  //     // Maneja cualquier error que ocurra durante el proceso de cierre de sesión.
  //     throw error;
  //   }
  // }

}