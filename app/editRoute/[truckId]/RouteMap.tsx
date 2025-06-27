"use client"

import {AdvancedMarker, Map, Pin, useMap, useMapsLibrary} from "@vis.gl/react-google-maps";

import {v4 as uuidv4} from 'uuid';

import {
    cityGestureHandling,
    cityMapId,
    cityZoom,
    mapDefaultCenter,
    mapRestriction,
    mapStyle, maxUpdateAge, pollingInterval, publicApiBaseURL
} from "@/app/config";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Poi, Truck} from "@/app/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import {TruckIcon} from "@/app/ui/TruckIcon";

type latLng = { id: string, lat: number, lng: number };
type setPois = (value: (((prevState: latLng[]) => latLng[]) | latLng[])) => void;

interface RecordRouteBtnProps {
    polyline: null | google.maps.Polyline,
    truckId?: number | undefined,
    setPois: (value: (((prevState: latLng[]) => latLng[]) | latLng[])) => void,
    truckPoi?: Poi | undefined,
    pois: latLng[],
    setClearBtnEnabled: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setSaveBtnEnabled: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setAddPointBtnEnabled: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const RecordRouteBtn = ({
                            polyline,
                            setPois,
                            truckPoi,
                            pois,
                            setClearBtnEnabled,
                            setSaveBtnEnabled,
                            setAddPointBtnEnabled
                        }: RecordRouteBtnProps) => {
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        if (!isRecording) {
            return;
        }

        if (!truckPoi || !polyline) return;

        const last = pois[pois.length - 1];
        if (last && last.lat === truckPoi.latitude && last.lng === truckPoi.longitude) {
            return;
        }

        setPois(prev => {
            const newPoint = {id: uuidv4(), lat: truckPoi.latitude, lng: truckPoi.longitude};
            const newPois = [...prev, newPoint];
            polyline?.setPath([...prev.map(poi => ({lat: poi.lat, lng: poi.lng})), {
                lat: newPoint.lat,
                lng: newPoint.lng
            }]);
            return newPois;
        });

    }, [truckPoi]);

    return (
        <Button
            variant={isRecording ? "destructive" : "default"}
            onClick={() => {
                if (!polyline || !truckPoi) {
                    console.error("Polyline or Truck not initialized");
                    return;
                }
                setClearBtnEnabled(isRecording);
                setSaveBtnEnabled(isRecording);
                setAddPointBtnEnabled(isRecording)
                if (isRecording) {
                    saveRoute(truckPoi.truckId, polyline, setPois, false);
                }
                setIsRecording(prev => !prev)
            }}
        >
            {!isRecording && <FontAwesomeIcon icon={faPlay} className="mr-2"/>}
            {isRecording && <FontAwesomeIcon icon={faStop} className="mr-2"/>}
            {isRecording ? "Detener grabación" : "Grabar recorrido"}
        </Button>
    )
}

const saveRoute = (truckId: number, polyline: google.maps.Polyline, setPois: setPois, snap: boolean) => {
    const route = polyline?.getPath().getArray().map((point: google.maps.LatLng) => {
        return {lat: point.lat(), lng: point.lng()}
    });

    fetch(`${publicApiBaseURL}/trucks/${truckId}/route?snap=${snap}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(route),
    }).then(response => {
        if (!response.ok) {
            console.log('Error saving route');
        }
        return response.json();
    }).then(data => {
        setPois(data.map((point: { lat: number, lng: number }) => {
            return {id: uuidv4(), lat: point.lat, lng: point.lng}
        }));
        polyline?.setPath(data.map((point: { lat: number, lng: number }) => {
            return {lat: point.lat, lng: point.lng}
        }));
    })

}

interface AddPointBtnProps {
    setPois: setPois,
    polyline: null | google.maps.Polyline,
    addPointBtnEnabled: boolean
}

const AddPointBtn = ({setPois, polyline, addPointBtnEnabled}: AddPointBtnProps) => {
    const map = useMap();

    return (
        <Button className="mt-2" disabled={!addPointBtnEnabled} onClick={() => {
            if (map) {
                const center = map.getCenter();
                if (center) {
                    setPois(prev => {
                        const newPoint = {id: uuidv4(), lat: center.lat(), lng: center.lng()};
                        polyline?.setPath([...prev.map(poi => ({lat: poi.lat, lng: poi.lng})), {
                            lat: newPoint.lat,
                            lng: newPoint.lng
                        }]);
                        return [...prev, newPoint]
                    })
                }
            }
        }}>Añadir punto</Button>
    )
}

interface SaveRouteBtnProps {
    truckId?: number | undefined,
    polyline?: null | google.maps.Polyline,
    setPois: setPois,
    saveBtnEnabled: boolean
}

const SaveRouteBtn = ({truckId, polyline, setPois, saveBtnEnabled}: SaveRouteBtnProps) => {

    if (!truckId || !polyline) return null;

    return (
        <Button className="mt-2" disabled={!saveBtnEnabled} onClick={() => saveRoute(truckId, polyline, setPois, true)}
        >Guardar recorrido</Button>
    )
}

interface ClearRouteBtnProps {
    polyline?: null | google.maps.Polyline,
    setPois: setPois,
    clearBtnEnabled?: boolean
}

const ClearRouteBtn = ({polyline, setPois, clearBtnEnabled}: ClearRouteBtnProps) => {

    return (
        <Button disabled={!clearBtnEnabled} className="mt-2 " variant={"destructive"} onClick={() => {
            setPois([]);
            polyline?.setPath([]);
        }}>
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2"/>
            Limpiar Recorrido
        </Button>
    )
}

const PoiMarkers = ({pois, setPois, polyline}: {
    pois: latLng[],
    setPois: setPois,
    polyline: google.maps.Polyline | null
}) => {

    const movePoiHandler = (event: google.maps.MapMouseEvent, id: string) => {
        const lat = event.latLng?.lat();
        const lng = event.latLng?.lng();
        if (lat && lng) setPois(prev => {
            const newPoint = {id, lat, lng};
            const newPois = prev.map(poi => poi.id === id ? newPoint : poi);
            polyline?.setPath(newPois.map(poi => ({
                lat: poi.lat,
                lng: poi.lng
            })));
            return newPois;
        });
    }

    return <>
        {pois.map((poi: latLng) => (
            <AdvancedMarker
                key={poi.id}
                position={{lat: poi.lat, lng: poi.lng}}
                draggable={true}
                onDrag={(e) => movePoiHandler(e, poi.id)}
            >
                <Pin scale={0.7} glyphColor='#008000' borderColor='#0f4d0f' background='#5ce65c'/>
            </AdvancedMarker>
        ))}
    </>
}

function animateCircle(line: null | google.maps.Polyline) {
    if (!line) return;

    let count = 0;

    window.setInterval(() => {
        count = (count + 1) % 200;

        const icons = line.get("icons");

        icons[0].offset = count / 2 + "%";
        line.set("icons", icons);
    }, 20);
}

interface TruckPoiMarkerProps {
    truckId?: number | undefined,
    setTruckPoi: (value: (((prevState: (Poi | undefined)) => (Poi | undefined)) | Poi | undefined)) => void,
    truckPoi: Poi | undefined
}

const TruckPoiMarker = ({truckId, setTruckPoi, truckPoi}: TruckPoiMarkerProps) => {

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(`${publicApiBaseURL}/trucks/${truckId}/positionRecords/latest`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (!response.ok) {
                    console.log('Error getting trucks location data');
                }
                return response.json();
            }).then(data => {
                if (Date.now() - data.timestamp > maxUpdateAge) return;
                setTruckPoi(
                    {
                        id: data.truckId,
                        truckId: data.truckId,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        timestamp: data.timestamp,
                        direction: data.direction
                    }
                )
            });
        }, pollingInterval);

        return () => clearInterval(intervalId);
    }, []);

    if (!truckPoi) return null;

    return <>
        <AdvancedMarker key={truckPoi.truckId} position={{lat: truckPoi.latitude, lng: truckPoi.longitude}}>
            <TruckIcon direction={truckPoi.direction}/>
        </AdvancedMarker>
    </>
}

interface RouteMapProps {
    truck?: Truck
}

const RouteMap = ({truck}: RouteMapProps) => {

    const [pois, setPois] = useState<latLng[]>([]);
    const [truckPoi, setTruckPoi] = useState<Poi>()
    const [clearBtnEnabled, setClearBtnEnabled] = useState(true);
    const [saveBtnEnabled, setSaveBtnEnabled] = useState(true);
    const [addPointBtnEnabled, setAddPointBtnEnabled] = useState(true);

    const mapsLib = useMapsLibrary("maps");
    const geoLib = useMapsLibrary("geometry");
    const map = useMap();

    const lineSymbol = {
        path: 2.0,
        scale: 4,
        strokeColor: "#393",
    };

    const polyline = React.useMemo(() => {
        if (!mapsLib) return null;
        return new mapsLib.Polyline({
            path: [],
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            icons: [{
                icon: lineSymbol,
                offset: "100%",
            }],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapsLib]);

    useEffect(() => {
        animateCircle(polyline);
    }, [polyline]);

    useEffect(() => {
        if (!geoLib) return;
        const route: latLng[] = [];
        truck?.route.forEach((point) => {
            route.push({id: uuidv4(), lat: point.lat, lng: point.lng})
        });
        setPois(route);
        polyline?.setPath(route.map(poi => ({lat: poi.lat, lng: poi.lng})));
    }, [geoLib, polyline, truck?.route]);

    polyline?.setMap(map);

    return (
        <div className='flex flex-row'>
            <Map
                style={mapStyle}
                defaultCenter={mapDefaultCenter}
                defaultZoom={cityZoom}
                gestureHandling={cityGestureHandling}
                disableDefaultUI={true}
                mapId={cityMapId}
                restriction={mapRestriction}
            >
                <PoiMarkers pois={pois} setPois={setPois} polyline={polyline}/>
                <TruckPoiMarker truckId={truck?.id} setTruckPoi={setTruckPoi} truckPoi={truckPoi}/>
            </Map>
            <div className='flex flex-col ml-3'>
                <RecordRouteBtn polyline={polyline} pois={pois} setPois={setPois} truckPoi={truckPoi}
                                setClearBtnEnabled={setClearBtnEnabled} setSaveBtnEnabled={setSaveBtnEnabled}
                                setAddPointBtnEnabled={setAddPointBtnEnabled}/>
                <AddPointBtn setPois={setPois} polyline={polyline} addPointBtnEnabled={addPointBtnEnabled}/>
                <SaveRouteBtn truckId={truck?.id} polyline={polyline} setPois={setPois}
                              saveBtnEnabled={saveBtnEnabled}/>
                <ClearRouteBtn polyline={polyline} setPois={setPois} clearBtnEnabled={clearBtnEnabled}/>
            </div>
        </div>
    )
}

export default RouteMap;