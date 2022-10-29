type Props = {
    content: string;
}

const Preview = ({ content }: Props) => {
    return (
        <>
            <h2>Preview</h2>

            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>)

}

export default Preview