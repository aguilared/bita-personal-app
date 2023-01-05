import axios from "axios";
import Constants from "expo-constants";
import { AppConfig } from "../app.config";

const { API_TOKEN, API_URL } = Constants.manifest?.extra as AppConfig;
const apiUrl = API_URL + "bitacora/tipoEvents/";

export default async function getTypeEvents() {
  try {
    const resp = await axios.get(apiUrl);
    //console.log("RESPP", resp);
    return resp.data;
  } catch (error) {
    console.log("ERRORP", error);
    return error;
  }
}
