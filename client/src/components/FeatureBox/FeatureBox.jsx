export default function FeatureBox({title, onClick}) {
    return (
        <div className="card w-76 shadow-md bg-neutral-800" onClick={onClick}>
            <div className="card-body text-center hover:cursor-pointer hover:border-neutral-50 hover:border-2 hover:border-solid hover:rounded-2xl">
                <h2 className="card-title hover:cursor-pointer">{title}</h2>
            </div>
        </div>
    )
}