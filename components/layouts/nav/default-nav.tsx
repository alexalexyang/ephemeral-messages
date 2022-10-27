
import styled from 'styled-components'
import NavItems from './nav-items'

const DefaultNavBar = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    background-color: #ffdddd;
    box-shadow: 2px 2px 2px lightgray;
    padding: 0.5rem;

    font-size: 1.5rem;
    color: white;
    font-weight: 50;
    letter-spacing: 1.5px;

    a {
        color: white;
    }
`

const DefaultNav = () => {

    return (
        <DefaultNavBar>
            <NavItems />
        </DefaultNavBar>
    )
}

export default DefaultNav
