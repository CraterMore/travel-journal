import { MdLocationPin } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

export default function PlaceDetailsPane(props : {data: any, setSelected: (place: string | null) => void}) {
    function formatDate(date: string) {
        let dateSliced = date.split("-");
        dateSliced = dateSliced.map((item) => item.replace(/^0+/, ''));
        return (dateSliced[1]+"/"+dateSliced[2]+"/"+dateSliced[0]);
    }

    function renderStars(rating: number) {
        let stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FaStar key={i} size={24} color="#F4A258"/>);
        }
        if (rating % 1 >= 0.5) {
            stars.push(<FaStarHalf key={5} size={24} color="#F4A258"/>);
        }
        return stars;
    }

    return (
    <div className="bg-white drop-shadow-xl h-2/3 w-96 rounded-t-3xl relative z-10 overflow-y-auto">
        <div className="flex flex-row gap-3 justify-start px-4 w-full h-20 bg-marigold">
            <div className="my-auto min-w-fit">
            <FaArrowLeft size={32} className="cursor-pointer" onClick={() => props.setSelected(null)}/>
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
                        <MdLocationPin size={26} color="#708C69"/>
                        <h1 className="text-lg truncate font-light">{props.data.properties.Address.rich_text[0].text.content}</h1>
                    </div>
                    <div className="flex overflow-hidden gap-1">
                        <MdDateRange size={26} color="#708C69"/>
                        <h1 className="text-lg truncate font-light">Visited on {formatDate(props.data.properties.Visited.date.start)}</h1>
                    </div>
                    <div className="my-auto flex flex-row items-center">
                        <div className="text-xl mr-1 font-semibold">{props.data.properties.Rating.number}/5</div>
                        {renderStars(props.data.properties.Rating.number)}
                    </div>
                </div>
            <div>
            <div className="bg-midnight rounded-full h-16 w-16 p-5 mx-auto">
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
            <div className="absolute left-36 shadow-xl top-8 rotate-2 w-48 h-56 bg-celeste flex flex-row justify-center">
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