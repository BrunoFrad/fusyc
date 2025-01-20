export default function AncorBox({icon, selected, onClick, aid}) {

    if(selected) {
        return(
            <div className="flex justify-center items-center ancorbox-container px-4 py-4 rounded-lg bg-indigo-500" onClick={onClick} id={aid}>
                <i className={icon + " text-white"} id={aid}></i>
            </div>
        )
    }else {
        return(
            <div className="flex justify-center items-center ancorbox-container px-4 py-4 rounded-lg bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 cursor-pointer" onClick={onClick} id={aid}>
                <i className={icon + " text-neutral-700 dark:text-white"} id={aid}></i>
            </div>
        )
    }

}