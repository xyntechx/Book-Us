import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    async function handleLogin(email) {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({ email });
            if (error) throw error;
            alert("Check your email for your Magic Link!");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen py-2">
            <h1 className="text-6xl font-bold">Welcome to BookUs</h1>
            <br />
            <input
                type="email"
                className="transition duration-500 ease-in-out block appearance-none border rounded w-4/5 md:w-2/5 py-2 px-3 leading-tight border-green-500 text-center text-xl focus:bg-green-400 focus:outline-none mb-4"
                name="id"
                placeholder="RI Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleLogin(email);
                }}
                disabled={loading}
                className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:ring-2 ring-green-400 text-white"
            >
                <span>{loading ? "Loading..." : "Let's Go!"}</span>
            </button>
        </div>
    );
}
