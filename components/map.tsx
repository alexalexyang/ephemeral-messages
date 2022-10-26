import { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import styled from 'styled-components'

const MapWrapper = styled.div`
    display: flex;
    flex: 1;

    .leaflet-container {
        display: flex;
        flex: 1;
    }
`

const Map = () => {
    const position = [51.505, -0.09] as LatLngExpression

    return (
        <MapWrapper>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </MapWrapper>
    )
}

export default Map
