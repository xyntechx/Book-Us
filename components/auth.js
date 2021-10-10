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
        <div className="flex flex-col items-center w-2/6 justify-center py-2">
            <input
                type="email"
                className="block border w-full p-3 rounded mb-4"
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
                className="w-full text-center py-3 rounded text-white bg-green-400 hover:bg-green-500 focus:outline-none my-1"
            >
                <span>{loading ? "Loading..." : "Let's Go!"}</span>
            </button>
        </div>
    );
}
