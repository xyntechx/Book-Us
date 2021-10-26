import Head from "next/head";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Link from "next/link";

export default function BookUsCalendar() {
    const localizer = momentLocalizer(moment);
    const myEventsList = [
        { start: new Date(), end: new Date(), title: "event0" },
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center m-4">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Calendar</h1>
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "90vh" }}
            />
            <Link href="/">
                <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-blue-400 border rounded hover:animate-bounce text-white">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}
