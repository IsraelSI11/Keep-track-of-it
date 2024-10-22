import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { YearSelector } from "./YearSelector";

export function MonthSelector() {

    const [year, setYear] = useState<number>(new Date().getFullYear());

    const [month, setMonth] = useState<number>(new Date().getMonth());

    return (
        <Popover>
            <PopoverTrigger asChild>
                {year} - {month}
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid grid-rows-5 gap-4">
                    <div>
                        <YearSelector year={year} setYear={setYear} />
                    </div>
                    <div className="row-span-4 grid grid-cols-3 grid-rows-4">
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(1)}>Enero</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(2)}>Febrero</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(3)}>Marzo</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(4)}>Abril</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(5)}>Mayo</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(6)}>Junio</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(7)}>Julio</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(8)}>Agosto</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(9)}>Septiembre</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(10)}>Octubre</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(11)}>Noviembre</button>
                        </div>
                        <div className="col-span-3 row-span-1">
                            <button className="w-full h-full" onClick={()=>setMonth(12)}>Diciembre</button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}