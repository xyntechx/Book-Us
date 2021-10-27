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
        var date = dateItems[2];

        if (dateItems[1] == 'Jan') {
            date += '/01';
        }

        else if (dateItems[1] == 'Feb') {
            date += '/02';
        }

        else if (dateItems[1] == 'Mar') {
            date += '/03';
        }

        else if (dateItems[1] == 'Apr') {
            date += '/04';
        }

        else if (dateItems[1] == 'May') {
            date += '/05';
        }

        else if (dateItems[1] == 'Jun') {
            date += '/06';
        }

        else if (dateItems[1] == 'Jul') {
            date += '/07';
        }

        else if (dateItems[1] == 'Aug') {
            date += '/08';
        }

        else if (dateItems[1] == 'Sep') {
            date += '/09';
        }

        else if (dateItems[1] == 'Oct') {
            date += '/10';
        }

        else if (dateItems[1] == 'Nov') {
            date += '/11';
        }

        else if (dateItems[1] == 'Dec') {
            date += '/12';
        }

        date += '/' + dateItems[3];
        date += '/' + dateItems[4];
        return date;
    }

    async function createDateRecord({ start, end }) {
        try {
            const user = supabase.auth.user();
            const startDate = formatDate(String(start));
            const endDate = formatDate(String(end));

            const updates = { createdOn: new Date(), startDate: startDate, endDate: endDate, userID: user.id };
            
            let { error } = await supabase.from('dates').upsert(updates, { returning: 'minimal'});
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
                events = {myEventsList}
                style={{ height: "90vh" }}
                onSelectSlot={createDateRecord}
            />
            <Link href="/">
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-blue-400 border rounded hover:animate-bounce text-white">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}