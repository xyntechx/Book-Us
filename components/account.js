import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";

export default function Account({ session }) {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({ username }) {
        try {
            setLoading(true);
            const user = supabase.auth.user();

            const updates = {
                id: user.id,
                username,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("profiles").upsert(updates, {
                returning: "minimal",
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen py-2">
            <input
                id="email"
                type="text"
                className="transition duration-500 ease-in-out block appearance-none border rounded w-4/5 md:w-2/5 py-2 px-3 leading-tight border-green-500 text-center text-xl focus:bg-green-400 focus:outline-none mb-4"
                value={session.user.email}
                disabled
            />

            <input
                id="username"
                type="text"
                className="transition duration-500 ease-in-out block appearance-none border rounded w-4/5 md:w-2/5 py-2 px-3 leading-tight border-green-500 text-center text-xl focus:bg-green-400 focus:outline-none mb-4"
                placeholder="Full Name"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
            />

            <button
                className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:ring-2 ring-green-400 text-white"
                onClick={() => updateProfile({ username })}
                disabled={loading}
            >
                {loading ? "Loading ..." : "Update"}
            </button>

            <Link href="/bookings">
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:ring-2 ring-green-400 text-white">
                    View Calendar
                </button>
            </Link>

            <button
                className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:ring-2 ring-green-400 text-white"
                onClick={() => supabase.auth.signOut()}
            >
                Sign Out
            </button>
        </div>
    );
}
