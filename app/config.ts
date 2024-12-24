// Main map configuration

export const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

export const cityLat = parseFloat(process.env.NEXT_PUBLIC_CITY_LAT as string);
export const cityLng = parseFloat(process.env.NEXT_PUBLIC_CITY_LNG as string);
export const cityZoom = parseInt(process.env.NEXT_PUBLIC_CITY_ZOOM as string);
export const cityGestureHandling = process.env.NEXT_PUBLIC_GOOGLE_MAP_GESTURE_HANDLING as string;
export const cityMapId = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string;
export const cityRestrictionNorth = parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_NORTH as string);
export const cityRestrictionSouth = parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_SOUTH as string);
export const cityRestrictionEast = parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_EAST as string);
export const cityRestrictionWest = parseFloat(process.env.NEXT_PUBLIC_CITY_RESTRICTION_WEST as string);

export const mapStyle = {width: '100%', height: '75vh'};

export const mapDefaultCenter = {
    lat: cityLat,
    lng: cityLng
};

export const mapRestriction = {
    latLngBounds: {
        north: cityRestrictionNorth,
        south: cityRestrictionSouth,
        east: cityRestrictionEast,
        west: cityRestrictionWest
    }
};

export const publicApiBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string
export const privateApiBaseURL = process.env.API_BASE_URL as string

// Connection to the WebSocket
export const brokerURL = process.env.NEXT_PUBLIC_WEB_SOCKET_BROKER_URL as string
export const truckLocationUpdatesTopic = process.env.NEXT_PUBLIC_WEB_SOCKET_TRUCK_LOCATION_UPDATES_TOPIC as string

export const maxUpdateAge =  10 * 60 * 1000; // Maximum age of a truck update (in milliseconds) to be shown on the map
export const pollingInterval = parseInt(process.env.NEXT_PUBLIC_POLLING_INTERVAL as string); // Interval to poll the API for truck updates (in milliseconds)

// Links
export const facebookLink = process.env.NEXT_PUBLIC_FACEBOOK_LINK as string
export const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_LINK as string
export const twitterLink = process.env.NEXT_PUBLIC_TWITTER_LINK as string
export const youtubeLink = process.env.NEXT_PUBLIC_YOUTUBE_LINK as string
export const websiteLink = process.env.NEXT_PUBLIC_WEBSITE_LINK as string