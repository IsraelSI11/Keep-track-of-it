import { useDispatch, useSelector } from "react-redux";
import { decrementYear, incrementYear } from "../redux/features/monthSelector/monthSelectorSlice";
import { RootState } from "../redux/store";

export function YearSelector() {

    const dispatch = useDispatch();

    const year = useSelector((state: RootState) => state.monthSelector.year);

    const onClickDecrease = () => {
        dispatch(decrementYear())
    }

    const onClickIncrease = () => {
        dispatch(incrementYear())
    }

    console.log(year)

    return(
        <div className="flex justify-around">
            <button onClick={onClickDecrease}>&lt;</button>
            <p>{year}</p>
            <button onClick={onClickIncrease}>&gt;</button>
        </div>
    )
}