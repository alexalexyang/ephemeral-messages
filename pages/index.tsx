import DefaultLayout from 'components/layouts/default-layout'
import Head from 'next/head'
import styled from 'styled-components'
import { maxMsgs, maxReaders, msgLifespan, radiusFromVisitor1, radiusFromVisitor2 } from 'util/constants'

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
                        The map shows locations of messages within {radiusFromVisitor2 / 1000}km of you. It takes some time to load.
                    </li>

                    <li>
                        You must be <strong>physically</strong> within {radiusFromVisitor1}m of a message to read it.
                    </li>

                    <li>
                        You may post up to {maxMsgs} messages at any one time.
                    </li>

                    <li>
                        Allowed HTML tags: b, strong, u, em, i. Line breaks allowed too.
                    </li>

                    <li>
                        Messages are deleted after {maxReaders} people have read them.
                    </li>

                    <li>
                        You may load each message only once.
                    </li>

                    <li>
                        Unread posts are deleted after {msgLifespan} days.
                    </li>

                    <li>
                        This is a <a href="https://en.wikipedia.org/wiki/Progressive_web_app" target="_blank" rel="noopener noreferrer">Progressive Web App (PWA)</a>. Some browsers allow us to install it on our devices.
                    </li>
                </Ul>
            </DefaultLayout>
        </>
    )
}
