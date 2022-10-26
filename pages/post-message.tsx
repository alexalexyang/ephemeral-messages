import DefaultLayout from 'components/layouts/default-layout'
import MapNav from 'components/layouts/map-nav'
import { NextPage } from 'next'

import Head from 'next/head'



const PostMessage: NextPage = () => {

    return (
        <>
            <Head>
                <meta name="description" content="Post a message" />
            </Head>

            <DefaultLayout>

                <h2>Post a message</h2>
            </DefaultLayout>
        </>
    )
}

export default PostMessage