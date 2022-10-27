import DefaultLayout from 'components/layouts/default-layout'
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

export default function HowToUse() {

    return (
        <>
            <Head>
                <meta name="description" content="How to use this app" />
            </Head>

            <DefaultLayout>
                <h1>How to use this app</h1>

                <Ul>
                    <li>
                        This app lets us leave digital messages in our physical space.
                    </li>

                    <li>
                        The map shows the locations of messages within a radius of you.
                    </li>

                    <li>
                        You have to be physically within {radiusFromVisitor1} metres of the message to read it.
                    </li>

                    <li>
                        You may post only up to {maxMsgs} messages at any one time.
                    </li>

                    <li>
                        Posts are deleted after {maxReaders} people have read them.
                    </li>

                    <li>
                        Unread posts are deleted after {MsgLifespan} days.
                    </li>
                </Ul>
            </DefaultLayout>
        </>
    )
}
