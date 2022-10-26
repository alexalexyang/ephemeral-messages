import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { Dispatch, SetStateAction } from 'react';

export type VisitorCoordsProps = {
    lat: number;
    lon: number;
    denied?: boolean;
};


export const getvisitorCoords = (
    setLocState: React.Dispatch<React.SetStateAction<VisitorCoordsProps | undefined>>
) =>
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            setLocState({ lat: latitude, lon: longitude });
        },
        (err) => {
            setLocState({ lat: 0, lon: 0, denied: true });
            throw err;
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );

/**
* Browser-level fingerprinting.
*/
export const createVisitorId = async (setVisitorId: Dispatch<SetStateAction<string>>) => {
    const fpPromise = FingerprintJS.load({ monitoring: false })

    const fp = await fpPromise
    const { visitorId } = await fp.get()
    console.log(`Visitor ID: ${visitorId}`)
    setVisitorId(visitorId)
}