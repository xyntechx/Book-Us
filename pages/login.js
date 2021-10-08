import Head from "next/head";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Login</h1>
                    <input
                        type="text"
                        class="block border w-full p-3 rounded mb-4"
                        name="id"
                        placeholder="RI Login ID"
                    />

                    <input
                        type="password"
                        class="block border w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                    />

                    {/* TODO: Make button functional */}
                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded text-white bg-green-400 hover:bg-green-500 focus:outline-none my-1"
                    >
                        Let's Go!
                    </button>
                </div>

                <div class="mt-6 text-gray-600">
                    New to BookUs?{" "}
                    <a class="text-blue-400 hover:underline" href="../sign-up/">
                        Sign Up
                    </a>
                    !
                </div>
            </div>
        </div>
    );
}
