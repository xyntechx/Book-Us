import Head from "next/head";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Link from "next/link";
import { supabase } from "../../utils/supabaseClient";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function BookUsCalendar() {
    const localizer = momentLocalizer(moment);
    const router = useRouter();
    const { emailID } = router.query;
    const [username, setUsername] = useState("");
    const [myUsername, setMyUsername] = useState("");
    const [myEmailID, setMyEmailID] = useState("");

    useEffect(() => {
        getMyProfile();
        getProfile();
    }, []);

    var myEventsList = [];

    function getDate(dateString) {
        const dateItems = dateString.split(" ");
        var month = dateItems[1];
        var date = dateItems[2];

        switch (month) {
            case "Jan":
                date += "/01";
                break;
            case "Feb":
                date += "/02";
                break;
            case "Mar":
                date += "/03";
                break;
            case "Apr":
                date += "/04";
                break;
            case "May":
                date += "/05";
                break;
            case "Jun":
                date += "/06";
                break;
            case "Jul":
                date += "/07";
                break;
            case "Aug":
                date += "/08";
                break;
            case "Sep":
                date += "/09";
                break;
            case "Oct":
                date += "/10";
                break;
            case "Nov":
                date += "/11";
                break;
            case "Dec":
                date += "/12";
                break;
        }

        date += "/" + dateItems[3];
        return date;
    }

    function getTime(dateString) {
        const dateItems = dateString.split(" ");
        return dateItems[4];
    }

    async function createEvent({ start, end }) {
        try {
            const user = supabase.auth.user();

            const date = getDate(String(start)); // 12/01/2022 for 12 Jan 2022
            const startTime = getTime(String(start)); // 23:30:00 for 11.30 pm
            const endTime = getTime(String(end)); // 23:59:59 for 11.59 pm

            const updates = {
                userID: user.id,
                createdOn: new Date(),
                date: date,
                startTime: startTime,
                endTime: endTime,
            };

            let { error } = await supabase
                .from("dates")
                .upsert(updates, { returning: "minimal" });
            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function getProfile() {
        try {
            let { data, error, status } = await supabase
                .from("profiles")
                .select("username")
                .eq("emailID", emailID)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async function getMyProfile() {
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
                setMyUsername(data.username);
                setMyEmailID(data.emailID);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center m-4">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-4xl md:text-6xl font-bold fl">
                {username}&apos;s Calendar
            </h1>
            <br />
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                defaultView={Views.WEEK}
                views={{ week: true }}
                step={15}
                timeslots={1}
                events={myEventsList}
                style={{ height: "70vh", width: "60vw" }}
                onSelectSlot={createEvent}
            />
            <br />
            <Link href={"/" + myEmailID}>
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                    My Dashboard
                </button>
            </Link>
        </div>
    );
}
