import styled from 'styled-components'
import NavItems from './nav-items'

const MapNavBar = styled.nav`
    width: 100%;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: space-evenly;
    background: rgba(94, 0, 61, 0.6);
    box-shadow: 2px 2px 2px purple;
    padding: 0.5rem;

    font-size: 1.5rem;
    color: white;
    font-weight: 50;
    letter-spacing: 1.5px;

    a {
        color: white;
    }
`

const MapNav = () => {

    return (
        <MapNavBar>
            <NavItems />
        </MapNavBar>
    )
}

export default MapNav
