import { ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoints } from 'styles/constants'
import DefaultNav from './nav/default-nav'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Main = styled.main`
  display: flex;
  flex: 1;
`

const Content = styled.div`
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #444;

    h1 {
        font-size: 1.5rem;
        font-weight: 200;
        letter-spacing: 0.4px;
    }

    h2 {
        font-size: 1.3rem;
        font-weight: 200;
        letter-spacing: 0.4px;
    }

    ul {
        font-size: 1.3rem;
    }

    li {
        letter-spacing: 0.5px;
    }

    @media only screen and (min-width: ${breakpoints.sm}px) {
        width: ${breakpoints.sm}px
  }

  @media only screen and (min-width: ${breakpoints.md}px) {
    width: ${breakpoints.md}px;
    gap: 1rem;

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.7rem;
    }
  }
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
                    <Content>
                        {children}
                    </Content>
                </Main>
            </Wrapper>
        </>
    )
}

export default DefaultLayout
