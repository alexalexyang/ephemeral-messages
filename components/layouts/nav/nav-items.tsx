import Link from "next/link"
import InfoIcon from "components/icons/info-icon"
import LetterIcon from "components/icons/letter-icon"
import MapMarkerIcon from "components/icons/map-marker-icon"
import PlaneIcon from "components/icons/plane-icon"
import QuestionIcon from "components/icons/question-icon"

const NavItems = () => {

    return (
        <>
            <Link href="/" aria-label="How to use this app">
                <InfoIcon height={35} width={35} />
            </Link>

            <Link href="/map">
                <MapMarkerIcon height={35} width={35} aria-label="Find message locations around you" />
            </Link>

            <Link href="/post-message" aria-label="Post a message">
                <PlaneIcon height={35} width={35} />
            </Link>

            <Link href="/read-messages" aria-label="Read messages near you">
                <LetterIcon height={35} width={35} />
            </Link>

            <Link href="/about" aria-label="About this app">
                <QuestionIcon height={35} width={35} />
            </Link>
        </>
    )
}

export default NavItems

