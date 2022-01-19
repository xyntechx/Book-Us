import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
    const [username, setUsername] = useState(null);
    const [emailID, setEmailID] = useState("");

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        try {
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select("username, emailID")
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
                setEmailID(data.emailID);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-4xl md:text-6xl font-bold fl">
                    Hi, {username}!
                </h1>
                <br />
                <Link href="/search">
                    <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                        Book Us
                    </button>
                </Link>

                <Link href={"/book/" + emailID}>
                    <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-blue-400 border rounded hover:border-blue-500 text-white">
                        My Calendar
                    </button>
                </Link>
            </main>
        </div>
    );
}
