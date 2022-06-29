class Functions {
  setDefaultImage = (e) => {
    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
  }

  peopleBaseImageUrl = "https://starwars-visualguide.com/assets/img/characters"
  planetsBaseImageUrl = "https://starwars-visualguide.com/assets/img/planets"
  starshipsBaseImageUrl = "https://starwars-visualguide.com/assets/img/starships"
}

const AppFunctions = new Functions();
export default AppFunctions