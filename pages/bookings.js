import Head from "next/dist/shared/lib/head";
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
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "90vh" }}
            />
            <Link href="/">
                <button className="w-1/4 text-center py-3 rounded text-white bg-blue-400 hover:bg-blue-500 focus:outline-none my-1">
                    Back to Home
                </button>
            </Link>
        </div>
    );
}
