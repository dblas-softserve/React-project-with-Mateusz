const axios = require("axios");

class Service {
  async fetchPeople(id) {
    return axios.get(`https://swapi.dev/api/people/${id}/`);
  }

  async fetchPlanets(id) {
    return axios.get(`https://swapi.dev/api/planets/${id}/`);
  }

  async fetchStarships(id) {
    return axios.get(`https://swapi.dev/api/starships/${id}/`);
  }
}

const AppService = new Service();

export default AppService;
