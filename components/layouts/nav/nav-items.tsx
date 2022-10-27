import Link from "next/link"
import InfoIcon from "./icons/info-icon"
import LetterIcon from "./icons/letter-icon"
import MapMarkerIcon from "./icons/map-marker-icon"
import PlaneIcon from "./icons/plane-icon"
import QuestionIcon from "./icons/question-icon"

const NavItems = () => {

    return (
        <>
            <Link href="/">
                <MapMarkerIcon height={35} width={35} aria-label="Find message locations around you" />
            </Link>

            <Link href="/post-message" aria-label="Post a message">
                <PlaneIcon height={35} width={35} />
            </Link>

            <Link href="/read-messages" aria-label="Read messages near you">
                <LetterIcon height={35} width={35} />
            </Link>

            <Link href="/how-to-use" aria-label="How to use this app">
                <InfoIcon height={35} width={35} />
            </Link>

            {/* <Link href="/about" aria-label="About this app">
                <QuestionIcon height={35} width={35} />
            </Link> */}
        </>
    )
}

export default NavItems

