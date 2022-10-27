import MapNav from './nav/map-nav'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const Main = styled.main`
  display: flex;
  flex: 1;
  z-index: 0;
`

type Props = {
    children: ReactNode;
}

const MapLayout = ({ children }: Props) => {

    return (
        <>
            <Wrapper>
                <MapNav />

                <Main>
                    {children}
                </Main>
            </Wrapper>
        </>
    )
}

export default MapLayout
