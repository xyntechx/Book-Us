import Head from "next/head";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";

export default function BookUsCalendar() {
    const localizer = momentLocalizer(moment);
    const [username, setUsername] = useState("");
    const [emailID, setEmailID] = useState("");
    const [myEventsList, setMyEventsList] = useState([]);

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
        <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-4xl md:text-6xl font-bold fl">My Calendar</h1>
            <br />
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                selectable={false}
                defaultView={Views.WEEK}
                views={{ week: true }}
                step={15}
                timeslots={1}
                events={myEventsList}
                style={{ height: "70vh", width: "70vw" }}
            />
            <br />
            <Link href={"/" + emailID}>
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                    My Dashboard
                </button>
            </Link>
        </div>
    );
}
