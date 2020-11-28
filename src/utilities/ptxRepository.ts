import axios from "axios";
import routeId from "utils";

type Stop = {
  StationID: string;
  StopBoarding: number;
  StopID: string;
  StopName: {
    Zh_tw: string;
    En: string;
  };
  StopPosition: {
    PositionLat: string;
    PositionLon: string;
    GeoHash: string;
  };
  StopSequence: number;
  StopUID: string;
};

type StopOfRoute = {
  RouteUID: string;
  Direction: string;
  Stops: Stop[];
};

class PtxRepository {
  async getRouteStops(city = "Taipei", routeName = "902") {
    const path = `https://ptx.transportdata.tw/MOTC/v2/Bus/DisplayStopOfRoute/City/${city}/${routeName}?$format=JSON`;
    const { data } = await axios.get<StopOfRoute[]>(path);
    console.log("data", data);
    const route = data.reduce((acc, route) => {
      acc[routeId(route.RouteUID, route.Direction)] = route.Stops.map(
        (stop) => stop.StopName.Zh_tw
      );
      return acc;
    }, {});

    return route;
  }
}

export const ptxRepository = new PtxRepository();
