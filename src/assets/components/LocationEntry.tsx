export default function LocationEntry(props: {details: any}) {
    return (
        <div className="w-full flex flex-col px-4">
            <h1 className="text-3xl font-bold mb-1">{props.details.properties.Name.title[0].text.content}</h1>
            <p className="text-sm">{props.details.properties.Description.rich_text[0].text.content}</p>
        </div>
    );
}