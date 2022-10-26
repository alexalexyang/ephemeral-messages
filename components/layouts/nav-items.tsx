import Link from "next/link"

const NavItems = () => {

    return (
        <>
            <Link href="/">
                Map
            </Link>

            <Link href="/post-message" aria-label="Post a message">
                Msg
            </Link>

            <Link href="/read-messages" aria-label="Read nearby messages">
                Read
            </Link>

            <Link href="/how-to-use" aria-label="How to use">
                i
            </Link>
        </>
    )
}

export default NavItems