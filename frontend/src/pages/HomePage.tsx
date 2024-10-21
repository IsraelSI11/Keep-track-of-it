/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "../components/Header";
import { CostForm } from "../components/CostForm";
import { CostsLogList } from "../components/CostsLogList";

export function HomePage() {

    return (
        <div>
            <Header />
            <div className="w-1/3">
                <CostsLogList />
            </div>
            <h1>Home Page</h1>
            <CostForm />
        </div>
    )
}