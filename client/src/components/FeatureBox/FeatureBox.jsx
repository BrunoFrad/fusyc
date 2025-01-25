export default function FeatureBox({title}) {
    return (
        <div class="card w-76 shadow-md bg-neutral-800">
            <div class="card-body text-center hover:cursor-pointer hover:border-neutral-50 hover:border-2 hover:border-solid hover:rounded-2xl">
                <h2 class="card-title hover:cursor-pointer">{title}</h2>
            </div>
        </div>
    )
}