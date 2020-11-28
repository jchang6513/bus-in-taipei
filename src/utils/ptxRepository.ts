import axios from "axios";
import { StopOfRoute } from "../types";
import { routeId } from "./routeId";

class PtxRepository {
  async getRouteStops(city = "Taipei", routeName = "902") {
    const path = `https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/${city}/${routeName}?$format=JSON`;
    const { data } = await axios.get<StopOfRoute[]>(path, {
      params: {}
    });
    console.log("data", data);
    const routes = data.reduce((acc, route) => {
      acc[routeId(route.RouteUID, route.Direction)] = route.Stops.map(
        (stop) => stop.StopName.Zh_tw
      );
      return acc;
    }, {});
    console.log(routes);
    return routes;
  }
}

export const ptxRepository = new PtxRepository();
