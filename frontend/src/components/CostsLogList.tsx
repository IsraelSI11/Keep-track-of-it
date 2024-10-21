import { CostType } from "../types/CostType";

export function CostsLogList(costs:CostType[]){
    return(
        <section>
            {costs.map((cost, index) => (
                <div key={index} className="flex">
                    <div className="flex flex-col">
                        <img src={`/images/${cost.category}.svg`} alt={`${cost.category} image`} />
                        <p>{cost.date.toLocaleDateString()}</p>
                    </div>
                    <p>{cost.category}</p>
                    <p>{cost.description}</p>
                    
                    <p>{cost.cost}</p>
                </div>
            ))}
        </section>
    );
}