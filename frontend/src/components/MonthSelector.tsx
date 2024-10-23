import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { YearSelector } from "./YearSelector";
import { useSelector, useDispatch } from "react-redux";
import { changeMonth } from "../redux/features/monthSelector/monthSelectorSlice";
import { RootState } from "../redux/store";
import { Button } from "./ui/button";

export function MonthSelector() {

    const dispatch = useDispatch();

    const year = useSelector((state: RootState) => state.monthSelector.year)

    const month = useSelector((state: RootState) => state.monthSelector.month)

    const customButton = (month: number, content: string) => {
        return (
            <button className="w-full h-full" onClick={() => dispatch(changeMonth(month))}>{content}</button>
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>{year} - {month}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid grid-rows-5 gap-4">
                    <div>
                        <YearSelector/>
                    </div>
                    <div className="row-span-4 grid grid-cols-3 grid-rows-4">
                        <div className="col-span-3 row-span-1">
                            {customButton(1, "Enero")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(2, "Febrero")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(3, "Marzo")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(4, "Abril")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(5, "Mayo")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(6, "Junio")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(7, "Julio")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(8, "Agosto")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(9, "Septiembre")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(10, "Octubre")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(11, "Noviembre")}
                        </div>
                        <div className="col-span-3 row-span-1">
                            {customButton(12, "Diciembre")}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}