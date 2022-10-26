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
        </>
    )
}

export default NavItems