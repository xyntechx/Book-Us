import Head from "next/head";
import Link from "next/link";
import React from "react";
import { supabase } from "../utils/supabaseClient";

class FindUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: 'User123'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.checkUser();
    }

    async checkUser() {
        const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("username", this.state.value);
        
        if (data.length > 0) {
            alert(this.state.value + " was found!");
        }

        else {
            alert(this.state.value + " was not found :(");
        }

        this.setState({value: "User123"});
    }

    render() {
        return (
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center m-4">
                <Head>
                    <title>BookUs</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                
                <h1>Who would you like to book?</h1>
    
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Key in the person's name:
                        <textarea value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
    
                <Link href="/">
                    <button className="transition duration-500 ease-in-out w-4/5 md:w-2/5 text-center py-3 focus:outline-none my-1 bg-green-400 border rounded hover:border-green-500 text-white">
                        Cancel
                    </button>
                </Link>
            </div>
        );
    }
}

export default FindUser;