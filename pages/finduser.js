import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function FindUser() {
    const [results, setResults] = useState([]);
    const [value, setValue] = useState("");
    
    function handleChange(event) {
        event.preventDefault();
        setValue(event.target.value.toLowerCase());
    }

    async function checkUsers() {
        var allUsers = [];
        const {data, error} = await supabase
        .from('profiles')
        .select('username');
        for (const item of data) allUsers.push(item.username); // extract all users from supabase
        
        var filteredUsers = [];
        for (const item of allUsers) {
            if (item.toLowerCase().includes(value)) {
                filteredUsers.push(item);
            }
        }

        if (filteredUsers.length == 0) {
            filteredUsers.push('Sorry, no users found.');
        }

        setResults(filteredUsers);
    }

    useEffect(checkUsers, [value]);

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center m-4" id="root">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <h1 className="text-4xl md:text-6xl font-bold">Who would you like to meet?</h1>

            <form className = "w-4/5 m-20 h-10">
                <input placeholder = "Enter a username" name = "name" className = "border rounded" onChange={handleChange}></input>
            </form>

            <p><b>Search Results</b></p>
            <br></br>

            <ul>
                {
                    results.map((username, i) => {
                        return <li>{username}</li>
                    })
                }
            </ul>

            <br></br>

            <Link href="/">
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}