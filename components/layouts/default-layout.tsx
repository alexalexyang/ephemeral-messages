import { ReactNode } from 'react'
import styled from 'styled-components'
import DefaultNav from './default-nav'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Main = styled.main`
  display: flex;
  flex: 1;
`

type Props = {
    children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {

    return (
        <>
            <Wrapper>
                <DefaultNav />

                <Main>
                    {children}
                </Main>
            </Wrapper>
        </>
    )
}

export default DefaultLayout
