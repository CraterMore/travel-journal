export default function ImageFullscreenModal(props: {open : boolean, imageURL : string, close: () => void}) {
   return (
    <dialog open={props.open} onClose={props.close}>
        <div className="fixed z-20 inset-0 bg-black bg-opacity-50 w-full h-full flex justify-center items-center" onClick={props.close}>
            <div className="h-2/3 w-fit object-contain">
                <img src={props.imageURL} className="aspect-auto w-full h-full"/>
            </div>
        </div>
    </dialog>
   );
}