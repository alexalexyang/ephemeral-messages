import DefaultLayout from 'components/layouts/default-layout'
import { NextPage } from 'next'
import Head from 'next/head'

const About: NextPage = () => {

    return (
        <>
            <Head>
                <meta name="description" content={`What's this app about?`} />
            </Head>

            <DefaultLayout>
                <h1>About</h1>

                <section>
                    <p>
                        This work lets us meditate on the ephemerality of the relations between us.
                    </p>

                    <p>
                        {`This work was conceived on 24 Oct 2022, and this text written on 27 Oct 2022. As an artist, I say it's too early to indulge in exegesis.`}
                    </p>

                    <p>
                        Enjoy.
                    </p>
                </section>

                <section>
                    <h2>Funding</h2>

                    <p>This work currently relies on the free tiers of the following services:</p>

                    <ul>
                        <li>OpenStreetMap</li>
                        <li>Vercel</li>
                        <li>MongoDB</li>
                    </ul>

                    <p>{`If things get heavy, we'll experience issues.`}</p>

                    <p>If you like this idea and want to help pay for more assured performance, <a href="mailto:alexalexyang@gmail.com" target="_blank" rel="noreferrer">text me</a>.</p>
                </section>

                <section>
                    <h2>Known issues</h2>

                    <ul>
                        <li>
                            {`OpenStreetMap rate limits: exceed them and we might see "rate limit exceeded" tiles all over the map.`}
                        </li>

                        <li>
                            This app is not as accessible as it could be.                        </li>
                    </ul>
                </section>
            </DefaultLayout>
        </>
    )
}

export default About