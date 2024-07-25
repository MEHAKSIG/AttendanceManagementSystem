import * as Location from "expo-location";
import { Alert } from "react-native";
import { getGoogleApiKeyForLocation } from "../services/DataStorageService";
import Config from "../constants/Config";

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    alert("Permission to access location was denied");
    return;
  }
  let expoAddress = "";
  let googleAddress = "";
  let reverseGeoCode;
  let latitude;
  let longitude;
  let location;

  try {
    console.log("start - Location.getCurrentPositionAsync()-LocationHelper.ts");
    location = await Location.getCurrentPositionAsync();
    console.log("end - Location.getCurrentPositionAsync()-LocationHelper.ts");

    // const { latitude, longitude } = location.coords;
    const coords = location.coords;
    // let address = "";
    //
    latitude = coords.latitude;
    longitude = coords.longitude;

    console.log({ latitude, longitude }, "latitude, longitude");

    if (location?.coords) {
      console.log("start - Location.reverseGeocodeAsync()-LocationHelper.ts");

      reverseGeoCode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log("end - Location.reverseGeocodeAsync()-LocationHelper.ts");
      // console.log(reverseGeoCode, "reverseGeoCode");

      // console.log(reverseGeoCode, "response");
      // console.log("Expo API response", reverseGeoCode);
      for (let item of reverseGeoCode) {
        expoAddress = `${item.name}, ${item.street ?? ""}, ${
          item.district ?? ""
        }, ${item.city ?? ""}, ${item.postalCode ?? ""} `;

        // setLocation({ address });
      }
    }
    //

    //Fetch address using Google Geocoding API
    // const apiKey = await getGoogleApiKeyForLocation(); // Replace with your API key
    const apiKey = Config.googleMapAPIKey; // Replace with your API key

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      console.log("start - fetch(url)-Google Address-LocationHelper.ts");

      let response = await fetch(url);
      let data = await response.json();
      console.log("end - fetch(url)-Google Address-LocationHelper.ts");

      // console.log(data, "Google-LocationHelper.ts");

      // console.log("Google API response", data);
      if (data.status === "OK" && data.results.length > 0) {
        googleAddress = data.results[0].formatted_address;
      } else {
        console.log("Unable to retrieve address");
      }
    } catch (error) {
      console.error("Error: google", error);
    }
  } catch (e) {
    console.error("Error(getCurrentLocation-LocationHelper) : ", e);
  }

  console.log("return - getCurrentLocation-LocationHelper.ts");
  // console.log(
  //   { latitude, longitude, googleAddress, expoAddress },
  //   "return - getCurrentLocation-LocationHelper.ts"
  // );

  return {
    latitude,
    longitude,
    googleAddress: googleAddress,
    expoAddress,
    completeLocation: location,
    reverseGeoCode,
  };
};

export const getLocationProviderByIndex = (
  index: number
): "Google" | "Expo" => {
  return index == 0 ? "Google" : "Expo";
};

export const getDistanceBetweenCordinatesGoogleMapAPI = async (
  location1Cordinates: any,
  location2Cordinates: any
) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${location1Cordinates.latitude},${location1Cordinates.longitude}&destinations=${location2Cordinates.latitude},${location2Cordinates.longitude}&mode=walking&key=${Config.googleMapAPIKey}`;

  const res = await fetch(apiUrl);
  let data = await res.json();
  // console.log(data, "data-google-api");
  let distance = {
    text: "",
    distanceInMeter: 0,
    error: "",
  };
  if (data.status === "OK" && data.rows.length > 0) {
    distance = {
      text: data.rows[0]?.elements[0]?.distance?.text,
      distanceInMeter: data.rows[0]?.elements[0]?.distance?.value,
      error: "",
    };
  } else {
    distance.error = data;
  }

  return distance;
};
