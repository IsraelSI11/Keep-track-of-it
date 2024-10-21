/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/authContext/useAuth";
import { getCosts } from "../lib/firebase/database";
import { CostForm } from "../components/CostForm";

export function HomePage() {

    const { currentUser } = useAuth();

    const [costs, setCosts] = useState<any[]>([]);

    useEffect(() => {
        if (currentUser) {
            getCosts(currentUser.uid).then((data) => {
                console.log(data)
                setCosts(data);
            });
        }
    }, []);



    return (
        <div>
            <Header />
            {costs.map((cost, index) => (
                <div key={index}>
                    <p>{cost.category}</p>
                    <p>{cost.description}</p>
                    <p>{cost.cost}</p>
                    <p>{cost.date}</p>
                </div>
            ))}
            <h1>Home Page</h1>
            <CostForm />
        </div>
    )
}