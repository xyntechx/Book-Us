import Head from "next/head";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";

export default function BookUsCalendar() {
    const localizer = momentLocalizer(moment);
    var myEventsList = [];

    function formatDate(dateString) {
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
        date += "/" + dateItems[4];

        return date;
    }

    async function createDateRecord({ start, end }) {
        try {
            const user = supabase.auth.user();
            const startDate = formatDate(String(start));
            const endDate = formatDate(String(end));

            const updates = {
                createdOn: new Date(),
                startDate: startDate,
                endDate: endDate,
                userID: user.id,
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

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center m-4">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Calendar</h1>
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                selectable={true}
                events={myEventsList}
                style={{ height: "90vh" }}
                onSelectSlot={createDateRecord}
            />
            <Link href="/">
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}
