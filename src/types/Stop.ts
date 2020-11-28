export type Stop = {
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
