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
            <div className="absolute md:left-64 md:w-72 md:h-72 bottom-12 left-2 sm:w-64 sm:h-64 w-48 h-48 bg-green-300 rounded-full filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute md:top-0 md:right-48 md:w-72 md:h-72 bottom-32 right-3 sm:w-64 sm:h-64 w-48 h-48 bg-green-700 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute md:bottom-0 md:w-72 md:h-72 top-32 sm:w-64 sm:h-64 w-48 h-48 bg-gray-800 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <section className="relative flex flex-col items-center justify-center w-screen">
                <h1 className="text-4xl md:text-6xl font-bold ">BookUs</h1>
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
                    className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white"
                >
                    <span>{loading ? "Loading..." : "Let's Go!"}</span>
                </button>
            </section>
        </div>
    );
}
