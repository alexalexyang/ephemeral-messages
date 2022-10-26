import Link from "next/link"

const NavItems = () => {

    return (
        <>
            <Link href="/">
                Map
            </Link>

            <Link href="/post-message">
                Post message
            </Link>

            <Link href="/how-to-use">
                How to use
            </Link>
        </>
    )
}

export default NavItems