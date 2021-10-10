import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

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
                returning: "minimal", // Don't return the value after inserting
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
        <div className="flex flex-col items-center w-2/6 justify-center py-2">
            <input
                id="email"
                type="text"
                className="block border w-full p-3 rounded mb-4"
                value={session.user.email}
                disabled
            />

            <input
                id="username"
                type="text"
                className="block border w-full p-3 rounded mb-4"
                placeholder="Full Name"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
            />

            <button
                className="w-full text-center py-3 rounded text-white bg-green-400 hover:bg-green-500 focus:outline-none my-1"
                onClick={() => updateProfile({ username })}
                disabled={loading}
            >
                {loading ? "Loading ..." : "Update"}
            </button>

            <button
                className="w-full text-center py-3 rounded text-white bg-red-400 hover:bg-red-500 focus:outline-none my-1"
                onClick={() => supabase.auth.signOut()}
            >
                Sign Out
            </button>
        </div>
    );
}
