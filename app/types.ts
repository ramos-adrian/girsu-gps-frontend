export type MovementDirection = "N" | "S" | "E" | "W" | undefined;

export type Poi = {
    id: number,
    truckId: number,
    latitude: number,
    longitude: number,
    timestamp: number,
    direction?: MovementDirection
};

export type TruckLocationUpdateDTO = {
    id: number;
    truckId: number;
    latitude: number;
    longitude: number;
    timestamp: number;
};

export type LatLngLiteral = {
    lat: number;
    lng: number;
};

export type Truck = {
    id: number;
    plate: string;
    route: boolean
};