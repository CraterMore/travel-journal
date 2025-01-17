import { MdFastfood } from "react-icons/md";
import {renderStars} from "../utils/formattingFunctions";

export default function LocationEntry(props: {details: any, selected: boolean}) {
    return (
        <div className={props.selected ? "w-full flex flex-row justify-between px-4 bg-herb border-herb border-2 rounded-2xl" : "hover:bg-herb transition-colors group w-full flex flex-row justify-between px-4 bg-white border-herb border-2 rounded-2xl"}>
            <div className="flex flex-col">
                <div className="flex gap-3">
                <div className="bg-midnight rounded-full w-10 h-10 border-celeste border-2 flex my-auto">
                    <div className="text-celeste text-center font-extrabold text-2xl m-auto">{props.details.properties.MarkerID.unique_id.number}</div>
                    </div>
                    <div>
                        <h1 className={props.selected ? "text-3xl font-display text-white" : "text-3xl text-herb transition-colors group-hover:text-white font-display"}>{props.details.properties.Name.title[0].text.content}</h1>
                        <div className="my-auto flex flex-row items-center -translate-y-1">
                            <p className={props.selected ? "font-light mr-1 text-white" : "font-light mr-1 text-herb transition-colors group-hover:text-white"}>{props.details.properties.Type.select.name} -</p>
                            <p className={props.selected ? "mr-1 font-light text-white" : "mr-1 font-light transition-colors group-hover:text-white"}>{props.details.properties.Rating.number}/5</p>
                            {renderStars(props.details.properties.Rating.number, 20)}
                        </div>
                    </div>
                </div>
                <p className={props.selected ? "text-sm mb-1 text-green-950" : "text-sm mb-1 group-hover:text-green-950 transition-colors"}>{props.details.properties.Description.rich_text[0].text.content}</p>
            </div>
            {/* <div className="self-center">
                <div className="text-3xl font-bold">
                    {props.details.properties.MarkerID.unique_id.number}
                </div>
            </div> */}
        </div>
        
    );
}