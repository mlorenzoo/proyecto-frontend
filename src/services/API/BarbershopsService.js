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

  async getBarbers() {
    try {
      const url = process.env.API_URL + `/barbers`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      console.log(json);
      if (json) {        
        return(json)
      } else {
        throw new Error("Unable to login")
      }
    } catch (error) {
      throw error
    }
  }

  async quitBarber(barberId) {
    try {
      const url = process.env.API_URL + `/barbers/${barberId}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ barbershop_id: null })
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

  async addBarberToBarbershop(barberId, barbershopId) {
    try {
      const url = process.env.API_URL + `/barbers/${barberId}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ barbershop_id: barbershopId })
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

  async getBarberSchedules(barberId) {
    try {
      const url = `${process.env.API_URL}/barbers/${barberId}/schedules`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      if (json.success) {
        return json.schedules;
      } else {
        throw new Error("Unable to get barber schedules");
      }
    } catch (error) {
      throw error;
    }
  }

  async getAvailableAppointments(barberId, date) {
    try {
      const url = `${process.env.API_URL}/barbers/${barberId}/appointments?date=${date}`;
      console.log(url)
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      console.log(json.available_hours)
      if (json) {
        return json.available_hours;
      } else {
        throw new Error("Unable to get available appointments");
      }
    } catch (error) {
      throw error;
    }
  }

  async doAppointment(appointmentData) {
    try {
      console.log(appointmentData)
      const url = process.env.API_URL + "/appointments";
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(appointmentData)
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

  async showAppointments(clientId) {
    try {
      console.log(clientId)
      const url = process.env.API_URL + `/appointments/${clientId}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      console.log(json)
      if (json) {
        return json;
      } else {
        throw new Error("Unable to get available appointments");
      }
    } catch (error) {
      throw error;
    }
  }

  async showBarberApp(barberId) {
    try {
      console.log(barberId)
      const url = process.env.API_URL + `/appointments/barber/${barberId}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      console.log(json)
      if (json) {
        return json;
      } else {
        throw new Error("Unable to get available appointments");
      }
    } catch (error) {
      throw error;
    }
  }

  async cancelarApp(appId) {
    try {
      const url = process.env.API_URL + `/appointments/${appId}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ state: "cancelada" })
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

  async completarApp(appId) {
    try {
      const url = process.env.API_URL + `/appointments/${appId}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({ state: "completada" })
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

  async checkClientSubscription(clientId) {
    try {
      const url = `${process.env.API_URL}/clients/${clientId}`;
      const resp = await fetch(url, {
        headers: {
          "Accept": "application/json"
        },
        method: "GET"
      });
      const json = await resp.json();
      console.log(json);
      if (json.success) {
        return json.data.subscribed;
      } else {
        throw new Error("Unable to get client subscription status");
      }
    } catch (error) {
      throw error;
    }
  }

}