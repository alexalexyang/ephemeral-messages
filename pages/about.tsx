import DefaultLayout from 'components/layouts/default-layout'
import { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import { maxMsgs, maxReaders, MsgLifespan, radiusFromVisitor1 } from 'util/constants'

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    font-size: 1.5rem;
    font-weight: 200;
    letter-spacing: 0.4px;
`

const About: NextPage = () => {

    return (
        <>
            <Head>
                <meta name="description" content="What's this app about?" />
            </Head>

            <DefaultLayout>
                <h1>About</h1>

                <p></p>

                <h2>Funding</h2>

                <p></p>
            </DefaultLayout>
        </>
    )
}

export default About