import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { categoryEnum } from '../enums/categoryEnum';
import { CategorySelect } from './CategorySelect';
import { Textarea } from './ui/textarea';
import { DatePicker } from './DatePicker';
import { useAuth } from '../contexts/authContext/useAuth';
import { addCost } from '../lib/firebase/database';
import { CostType } from '../types/CostType';
import { toast } from 'sonner';

export function CostForm() {

    const { currentUser } = useAuth();

    const formSchema = z.object({
        category: z.enum(Object.values(categoryEnum) as [string, ...string[]]),
        description: z.string().optional(),
        cost: z.preprocess((value) => parseFloat(value as string), z.number().positive()),
        date: z.date(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: categoryEnum.food,
            description: '',
            cost: 0,
            date: new Date(),
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (currentUser) {
            try {
                const cost: CostType = {
                    ...values,
                    category: values.category as categoryEnum,
                    date: values.date.toISOString(),
                }
                addCost(currentUser.uid, cost);
            } catch (error) {
                console.log(error)
                toast("Error", {
                    description: "Ha ocurrido un error al guardar el gasto.",
                    action: {
                        label: "Cerrar",
                        onClick: () => { },
                    },
                })
            }
        }else{
            toast("Error", {
                description: "Debes iniciar sesión para guardar un gasto.",
                action: {
                    label: "Cerrar",
                    onClick: () => { },
                },
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha</FormLabel>
                            <FormControl>
                                <DatePicker field={field} />
                            </FormControl>
                            <FormDescription>
                                Fecha del gasto.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoría</FormLabel>
                            <FormControl>
                                <CategorySelect onChange={field.onChange} defaultValue={field.value} />
                            </FormControl>
                            <FormDescription>
                                Selecciona una categoría del gasto.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription>
                                Descripción del gasto.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Costo</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Cantidad gastada.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Añadir</Button>
            </form>
        </Form>
    )
}