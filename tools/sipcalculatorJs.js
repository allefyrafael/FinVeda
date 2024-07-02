const convertors = {
  real(currency) {
    const currencyParsed = parseFloat(currency);
    const currencyTaxToReal = 0.068;

    return currencyParsed * currencyTaxToReal;
  },
  dollar(currency) {
    const currencyParsed = parseFloat(currency);
    const currencyTaxToReal = 0.012;

    return currencyParsed * currencyTaxToReal;
  },
};

handlePredict = async () => {
  const currency = document.getElementById("currency").value;
  const areaInSquareMeters = document.getElementById("area").value;
  const roomsNumber = document.getElementById("rooms").value;
  const bathroomsNumber = document.getElementById("bathrooms").value;
  const location = document.getElementById("location").value;

  // try {
  //   const response = await fetch(
  //     "https://dadosabertos.camara.leg.br/api/v2/deputados/91228"
  //   );
  //   if (response.ok) {
  //     console.log("opened", await response.json());
  //   }
  // } catch (error) {
  //   console.error("[ERROR] handlePredict", error);
  // }
};

currencyChange = () => {
  let selectedValue = currency.value;
  document.getElementById("currency-change-1").innerHTML = selectedValue;
  document.getElementById("currency-change-2").innerHTML = selectedValue;
  document.getElementById("currency-change-3").innerHTML = selectedValue;
};

commas = (x) => {
  let amount = document.getElementById("investment").value;
  let temp = amount.split(" ");
  if (temp.includes("Rs")) {
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("investment").value = amount
      .concat(" ")
      .concat("Rs");
  }
};
percentage = (x) => {
  let value = document.getElementById("return-rate").value;
  let temp = value.split(" ");
  if (temp.length < 2)
    document.getElementById("return-rate").value = value
      .concat(" ")
      .concat("%");
};
