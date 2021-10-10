import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/auth";
import Account from "../components/account";

export default function Home() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        setSession(supabase.auth.session());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="text-6xl font-bold">Welcome to BookUs</h1>
                <br />
                {!session ? (
                    <Auth />
                ) : (
                    <Account key={session.user.id} session={session} />
                )}
            </main>
        </div>
    );
}
