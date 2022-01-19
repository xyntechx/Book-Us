# BookUs

BookUs is a centralised platform for booking academic consultations, study groups, and many more!

## 🤖 Technologies

-   Next.js
-   Tailwind CSS
-   Supabase

## 🔨 Usage

```bash
npm install
```

```bash
npm run dev
```

# TODO

-   [ ] For the user database, insert a column to store each users' meetings (a list of events)

-   [ ] Find a way to pass the username clicked on the find user page to bookings page - so when the calendar screen is displayed we can render the selected user's events on that calendar. Wld be nice to display user's name in the title eg Nyx's Calendar

-   [ ] When you click and drag on a slot, the calendar currently adds that timing to the own user's database. Need to change this to when the slot is selected, check if the timeslot overlaps with any of the selected user's events. If there are overlaps, reject the meeting, else add the event to the selected user and the own users database
