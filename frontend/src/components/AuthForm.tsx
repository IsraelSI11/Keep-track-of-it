/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { doSignInWithGoogle } from "../lib/firebase/auth";
import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/authContext/useAuth';
import { toastMessage } from '../lib/utils';

interface AuthFormProps {
    title: string;
    description?: string;
    handleSubmit: (email: string, password: string) => Promise<any>;
    register?: boolean;
    error?: string;
}

// Define the validation schema
const authSchema = z.object({
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export function AuthForm({ title, description, handleSubmit, register, error }: AuthFormProps) {
    const { isAuthenticated } = useAuth();

    // Initialize form with zod validation schema
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await doSignInWithGoogle();
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : "An unknown error occurred";
            toastMessage("Error", errorMsg);
        }
    };

    const onSubmit = async (values: z.infer<typeof authSchema>) => {
        try {
            await handleSubmit(values.email, values.password);
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : "An unknown error occurred";
            toastMessage("Error", errorMsg);
        }
    };

    return (
        <div className="h-full">
            {isAuthenticated && <Navigate to={"/home"} />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col py-12 px-16 h-full space-y-12">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{title}</h1>
                        {description && <p className="w-2/3">{description}</p>}
                    </div>
                    <div className='space-y-10'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        La contraseña debe tener al menos 6 caracteres.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <div className='flex justify-center w-full'>
                            <Button type="submit" className="bg-ut-orange hover:bg-selective-yellow rounded-full px-6 py-2 w-3/4">
                                {title}
                            </Button>
                        </div>


                        <p className="text-center font-semibold my-2">O</p>

                        <div className="flex justify-center">
                            <div className="flex items-center justify-center border border-black rounded-3xl md:w-3/4 bg-white transition hover:bg-slate-200">
                                <button
                                    type="button"
                                    className="px-4 py-2 flex gap-2 items-center"
                                    onClick={handleGoogleSignIn}
                                >
                                    <img
                                        className="w-6 h-6"
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        loading="lazy"
                                        alt="google logo"
                                    />
                                    <span>{title} con Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {!register && (
                        <div>
                            <p className="text-center">¿No tienes una cuenta? <a href="/register" className="text-ut-orange hover:underline underline-offset-2">Regístrate</a></p>
                        </div>)}


                    {error && <p className="text-center mt-4 text-red-600 font-semibold">{error}</p>}
                </form>
            </Form>
        </div>
    );
}
