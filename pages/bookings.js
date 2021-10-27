import Head from "next/head";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";

export default function BookUsCalendar() {
    const localizer = momentLocalizer(moment);
    var myEventsList = [];

    async function createDateRecord({ start, end }) {
        try {
            const user = supabase.auth.user();
            const updates = { createdat: new Date(), date: start, userid: user.id };
            
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
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}