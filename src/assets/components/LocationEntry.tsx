import { MdFastfood } from "react-icons/md";

export default function LocationEntry(props: {details: any, selected: boolean}) {
    return (
        <div className={props.selected ? "w-full flex flex-row justify-between px-4 bg-herb border-herb border-2 rounded-2xl" : "hover:bg-herb group w-full flex flex-row justify-between px-4 bg-lionsmane border-herb border-2 rounded-2xl"}>
            <div className="flex flex-col">
                <div className="flex gap-2">
                    <MdFastfood size={24} className="my-auto" color="F4A258"/>
                    <h1 className={props.selected ? "text-3xl font-display text-white" : "text-3xl text-herb group-hover:text-white font-display"}>{props.details.properties.Name.title[0].text.content}</h1>
                </div>
                <p className="text-sm my-1">{props.details.properties.Description.rich_text[0].text.content}</p>
            </div>
            <div className="self-center">
                <div className="text-3xl font-bold">
                    {props.details.properties.Rating.number}
                </div>
            </div>
        </div>
        
    );
}