import { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import styled from 'styled-components'

const MapWrapper = styled.div`
    display: flex;
    flex: 1;

    .leaflet-container {
        display: flex;
        flex: 1;
    }
`

type Props = {
    visitorCoords: [number, number];
    msgLocs: [number, number][]
}

const Map = ({ visitorCoords, msgLocs }: Props) => {

    return (
        <MapWrapper>
            <MapContainer center={visitorCoords} zoom={15} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
                />
                <ZoomControl position="bottomright" />

                {!!msgLocs.length && msgLocs.map((loc, idx) => (
                    <Marker position={loc} key={idx} />
                ))}
            </MapContainer>
        </MapWrapper>
    )
}

export default Map
