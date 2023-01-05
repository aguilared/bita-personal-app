import axios from "axios";
import Constants from "expo-constants";
import { AppConfig } from "../app.config";

const { API_TOKEN, API_URL } = Constants.manifest?.extra as AppConfig;
const apiUrl = API_URL + "events/";

export default async function getEventsId(id: number) {
  try {
    const resp = await axios.get(apiUrl + id);
    return resp.data;
  } catch (error) {
    return error;
  }
}
