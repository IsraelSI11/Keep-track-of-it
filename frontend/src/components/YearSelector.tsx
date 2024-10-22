type YearSelectorProps = {
    year: number;
    setYear: (year: number) => void;
}

export function YearSelector({year, setYear}: YearSelectorProps) {

    const onClickDecrease = () => {
        setYear(year - 1);
    }

    const onClickIncrease = () => {
        setYear(year + 1);
    }

    return(
        <div className="flex justify-around">
            <button onClick={onClickDecrease}>&lt;</button>
            <p>{year}</p>
            <button onClick={onClickIncrease}>&gt;</button>
        </div>
    )
}