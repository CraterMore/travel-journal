import { MdLocationPin } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { formatDate, renderStars } from "../utils/formattingFunctions";
import { FaMoneyBill } from "react-icons/fa6";


export default function PlaceDetailsPane(props : {data: any, setSelected: (place: string | null) => void}) {


    return (
    <div className="bg-white drop-shadow-xl h-2/3 w-full md:relative md:w-96 md:rounded-t-3xl fixed z-10 overflow-y-auto">
        <div className="flex flex-row gap-3 justify-start px-4 w-full h-20 bg-marigold">
            <div className="my-auto min-w-fit">
                <FaArrowLeft size={36} className="cursor-pointer p-1 hover:p-0 hover:transition-all" onClick={() => props.setSelected(null)}/>
            </div>
            <div className="my-auto grow h-fit overflow-hidden">
            <div className="text-3xl font-display font-bold line-clamp-1">
                {props.data.properties.Name.title[0].text.content}
            </div>
            <p className="truncate text-orange-900">
                {props.data.properties.Description.rich_text[0].text.content}
            </p>
            </div>
        </div>
        <div className="px-4 pt-4">
            <div className="flex flex-row w-full gap-2">
                <div className="grow flex flex-col">
                    <div className="flex overflow-hidden gap-1">
                        <MdDateRange size={26} color="#708C69"/>
                        <h1 className="text-lg truncate font-light">Visited on {formatDate(props.data.properties.Visited.date.start)}</h1>
                    </div>
                    <div className="flex overflow-hidden gap-1">
                        <MdLocationPin size={26} color="#708C69"/>
                        <h1 className="text-lg truncate font-light">{props.data.properties.Address.rich_text[0].text.content}</h1>
                    </div>
                    
                    <div className="flex overflow-hidden gap-1 items-center">
                        <FaMoneyBill size={24} color="#708C69"/>
                        <h1 className="text-lg ml-1 truncate font-light">{props.data.properties.Price.select.name}</h1>
                    </div>
                    <div className="my-auto flex flex-row items-center">
                        <div className="text-xl mr-1 font-semibold">{props.data.properties.Rating.number}/5</div>
                        {renderStars(props.data.properties.Rating.number, 24)}
                    </div>
                </div>
            <div>
            <div className="bg-midnight rounded-full h-16 w-16 p-5 mx-auto cursor-pointer hover:bg-sky-800 hover:p-4 hover:transition-all" onClick={() => window.open(props.data.properties["Google Link"].url, '_blank')}>
                <FaExternalLinkAlt color="white" className="w-full h-full"/>
            </div>
            <p className="max-w-16 text-sm text-center text-midnight mt-2">
                Google Maps
            </p>
        </div>
        </div>
            <p className="font-handwritten text-2xl text-center h-fit my-3 font-semibold">"{props.data.properties.Anecdote.rich_text[0].text.content}"</p>
        </div>
        <div className="relative mt-8">
            {props.data.properties.Images.files[0] ? 
            <div className="absolute left-4 shadow-xl -rotate-6 w-48 h-56 bg-celeste flex flex-row justify-center">
                <div className="w-40 h-40 border-midnight border-4 mt-4">
                    <img src={props.data.properties.Images.files[0].file.url} className="w-full h-full object-cover bg-orange-100"/>
                </div>
            </div>
            : <></>}
            {props.data.properties.Images.files[1] ? 
            <div className="absolute left-44 shadow-xl top-8 rotate-3 w-48 h-56 bg-celeste flex flex-row justify-center">
                <div className="w-40 h-40 border-midnight border-4 mt-4">
                    <img src={props.data.properties.Images.files[1].file.url} className="w-full h-full object-cover bg-orange-100"/>
                </div>
             </div>
            : <></>}
            {props.data.properties.Images.files[2] ? 
            <div className="absolute left-20 shadow-xl top-48 -rotate-2 w-48 h-56 bg-celeste flex flex-row justify-center">
                <div className="w-40 h-40 border-midnight border-4 mt-4">
                    <img src={props.data.properties.Images.files[1].file.url} className="w-full h-full object-cover bg-orange-100"/>
                </div>
             </div>
            : <></>}
            {/* {props.data.properties.Images.files.map((image: any, index: number) => (
                <img src={image.file.url} key={index} className="w-full h-full"/>
            ))} */}
        </div>
    </div>
    );
}