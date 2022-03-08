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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    httpEquiv="Refresh"
                    content="0; url='https://xyntechx.netlify.app/bookus'"
                />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                {!session ? (
                    <Auth />
                ) : (
                    <Account key={session.user.id} session={session} />
                )}
            </main>
        </div>
    );
}
