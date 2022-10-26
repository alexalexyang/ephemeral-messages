import DefaultLayout from 'components/layouts/default-layout'
import Head from 'next/head'
import styled from 'styled-components'

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
                        Use the map to find posts within a radius of you.
                    </li>

                    <li>
                        You may post only up to 5 posts a week.
                    </li>

                    <li>
                        Posts are deleted after 5 people have read them.
                    </li>

                    <li>
                        Unread posts are deleted after 5 days.
                    </li>
                </Ul>
            </DefaultLayout>
        </>
    )
}
