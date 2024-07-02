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

function convertMetersToFeet(value) {
  return value * 3.28084;
}

handlePredict = async () => {
  const currency = document.getElementById("currency").value;
  const areaInSquareMeters = document.getElementById("area").value;
  const roomsNumber = document.getElementById("rooms").value;
  const bathroomsNumber = document.getElementById("bathrooms").value;
  const location = document.getElementById("location").value;
  const responseDiv = document.getElementById("response");

  const formBody = `total_sqft=${encodeURIComponent(
    convertMetersToFeet(parseFloat(areaInSquareMeters))
  )}&location=${encodeURIComponent(location)}&bhk=${encodeURIComponent(
    roomsNumber
  )}&bath=${encodeURIComponent(bathroomsNumber)}`;

  const url =
    "http://localhost:5000";

  try {
    const response = await fetch(`${url}/predict_home_price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    

    const parsedResponse = await response.json()
    console.log("parsedResponse", parsedResponse)

    console.log("parsedResponse", parsedResponse)
    const estimatedPrice = parseFloat(parsedResponse.estimated_price);    

    if (!parsedResponse.estimated_price) {
      throw new Error("Preço estimado não retornado!");
      responseDiv.innerHTML = "<p class='text' style='text-align: center;'>Erro inesperado durante a predição, tente mais tarde...</p>"
    }

    const lahkValue = 100000;
    const convertedHousePrice = convertors[currency](
      estimatedPrice * lahkValue
    );
    responseDiv.innerHTML =`<p class="text" style='text-align: center;'>${currency === "real" ? "R$" : "U$"} ${convertedHousePrice.toFixed(2).toString().replaceAll(".", ",")}</p>`
  } catch (error) {
    console.error("[ERROR] handlePredict", error);
  }
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
