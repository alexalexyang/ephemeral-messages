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
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" />

                {!!msgLocs.length && msgLocs.map((loc, idx) => (
                    <Marker position={loc} key={idx}>
                        <Popup>{`${loc[0]}, ${loc[1]}`}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </MapWrapper>
    )
}

export default Map
