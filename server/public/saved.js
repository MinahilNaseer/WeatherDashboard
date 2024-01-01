
const countryStateInfo = {
    USA: {
      states:['California','Texas']
      
    },
    Germany: {
      states: ['Bavaria', 'Hessen']
    },
  };

  window.onload = function () {
    //todo: Get all input html elements from the DOM
  
    const countrySelection = document.querySelector("#country"),
      stateselection = document.querySelector("#state");
      
      stateselection.disabled = true;

      for (let country in countryStateInfo) {
        countrySelection.options[countrySelection.options.length] = new Option(
            country,
            country
        );
    }
    function populateStates(selectedCountry) {
      stateselection.length = 1; // Remove all options except the default one
      if (selectedCountry in countryStateInfo) {
          for (let state of countryStateInfo[selectedCountry].states) {
              stateselection.options[stateselection.options.length] = new Option(
                  state,
                  state
              );
          }
      }
  }
  countrySelection.onchange = function () {
    stateselection.disabled = false;
    populateStates(countrySelection.value);
    updateSelectedInfo();
};
stateselection.onchange = function () {
  updateSelectedInfo();
};

function updateSelectedInfo() {
  const selectedCountry = countrySelection.value;
  const selectedState = stateselection.value;

  selectedInfo.innerHTML = `
      <span>${selectedCountry}</span>
      <span>${selectedState}</span>
      <span class="material-symbols-outlined">
                                favorite
      </span>
  `;
}
  }