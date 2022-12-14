import LetterIcon from 'components/icons/letter-icon'
import MapMarkerIcon from 'components/icons/map-marker-icon'
import PlaneIcon from 'components/icons/plane-icon'
import DefaultLayout from 'components/layouts/default-layout'
import Head from 'next/head'
import styled from 'styled-components'
import { maxMsgs, maxReaders, msgLifespan, radiusFromVisitor1, radiusFromVisitor2 } from 'util/constants'

const iconSize = 18

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    font-size: 1.5rem;
    font-weight: 200;
    letter-spacing: 0.4px;
`

const IconBox = styled.span`
    svg {
        display: inline
    };
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
                        The map (<IconBox><MapMarkerIcon height={iconSize} width={iconSize} aria-label="Map icon" /></IconBox>) shows locations of messages within {radiusFromVisitor2 / 1000}km of you. It takes some time to load.
                    </li>

                    <li>
                        You must be <strong>physically</strong> within {radiusFromVisitor1}m of a message (<IconBox><LetterIcon height={iconSize} width={iconSize} aria-label="Map icon" /></IconBox>) to read it.
                    </li>

                    <li>
                        You may post (<IconBox><PlaneIcon height={iconSize} width={iconSize} aria-label="Map icon" /></IconBox>) up to {maxMsgs} messages at any one time.
                    </li>

                    <li>
                        Line breaks and all the text formatting HTML tags listed <a href="https://www.w3schools.com/html/html_formatting.asp" target="_blank" rel="noopener noreferrer">here</a> are allowed.
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
