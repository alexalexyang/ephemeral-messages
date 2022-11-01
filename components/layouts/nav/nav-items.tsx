import Link from "next/link"
import InfoIcon from "components/icons/info-icon"
import LetterIcon from "components/icons/letter-icon"
import MapMarkerIcon from "components/icons/map-marker-icon"
import PlaneIcon from "components/icons/plane-icon"
import QuestionIcon from "components/icons/question-icon"

const iconSize = 35

const NavItems = () => {

    return (
        <>
            <Link href="/" aria-label="How to use this app">
                <InfoIcon height={iconSize} width={iconSize} />
            </Link>

            <Link href="/map">
                <MapMarkerIcon height={iconSize} width={iconSize} aria-label="Find message locations around you" />
            </Link>

            <Link href="/post-message" aria-label="Post a message">
                <PlaneIcon height={iconSize} width={iconSize} />
            </Link>

            <Link href="/read-messages" aria-label="Read messages near you">
                <LetterIcon height={iconSize} width={iconSize} />
            </Link>

            <Link href="/about" aria-label="About this app">
                <QuestionIcon height={iconSize} width={iconSize} />
            </Link>
        </>
    )
}

export default NavItems

