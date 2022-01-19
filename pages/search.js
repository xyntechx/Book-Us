import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function FindUser() {
    const [results, setResults] = useState([]);
    const [value, setValue] = useState("");
    const [usernameToEmailID, setUsernameToEmailID] = useState({});
    const [emailID, setEmailID] = useState("");

    useEffect(() => {
        getProfile();
    }, []);

    useEffect(checkUsers, [value]);

    async function getProfile() {
        try {
            const user = supabase.auth.user();

            let { data, error, status } = await supabase
                .from("profiles")
                .select("emailID")
                .eq("id", user.id)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setEmailID(data.emailID);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    function handleChange(event) {
        event.preventDefault();
        setValue(event.target.value.toLowerCase());
    }

    function capitalize(name) {
        let arr_name = name.split(" ");
        let result = [];
        for (const sub of arr_name) {
            result.push(sub.charAt(0).toUpperCase() + sub.slice(1));
        }
        return result.join(" ");
    }

    async function checkUsers() {
        let allUsers = [];
        const { data, error } = await supabase
            .from("profiles")
            .select("username, emailID");

        for (const item of data) {
            // extract all users from supabase
            allUsers.push(item.username);
        }

        for (const item of data) {
            usernameToEmailID[item.username] = item.emailID;
        }

        console.log(usernameToEmailID);

        let filteredUsers = [];
        for (const item of allUsers) {
            if (item.toLowerCase().includes(value)) {
                filteredUsers.push(item);
            }
        }

        if (filteredUsers.length == 0) {
            filteredUsers.push("Sorry, no users found.");
        }

        setResults(filteredUsers);
    }

    return (
        <div
            className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center m-4"
            id="root"
        >
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className="text-4xl md:text-6xl font-bold">Book a Person</h1>

            <form className="w-4/5 m-20 h-10" autoComplete="off">
                <input
                    placeholder="Name of Person to Book"
                    value={capitalize(value) || ""}
                    name="name"
                    className="border rounded"
                    onChange={handleChange}
                ></input>
            </form>

            <h1 className="text-2xl md:text-xl font-bold">Search Results</h1>

            <ul>
                {value ? (
                    results.map((username, _) => {
                        return (
                            <>
                                <Link
                                    href={
                                        "/book/" + usernameToEmailID[username]
                                    }
                                >
                                    <button>{username}</button>
                                </Link>
                                <br></br>
                            </>
                        );
                    })
                ) : (
                    <></>
                )}
            </ul>

            <br></br>

            <Link href={"/" + emailID}>
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                    My Dashboard
                </button>
            </Link>
        </div>
    );
}
