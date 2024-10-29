import { FormControl } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


type CategorySelectProps = {

    value?: string;

    onChange?: (value: string) => void;

    defaultValue?: string;

};

export function CategorySelect(props: CategorySelectProps) {
    return (
        <Select onValueChange={props.onChange} defaultValue={props.defaultValue}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                <SelectItem value="food">Comida</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
                <SelectItem value="housing">Vivienda</SelectItem>
                <SelectItem value="entertainment">Entretenimiento</SelectItem>
                <SelectItem value="health">Salud</SelectItem>
                <SelectItem value="technology">Tecnología</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
        </Select>
    )
}