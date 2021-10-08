import Head from "next/head";

export default function SignUp() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>BookUs</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign Up</h1>
                    <input
                        type="text"
                        class="block border w-full p-3 rounded mb-4"
                        name="fullname"
                        placeholder="Full Name"
                    />

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
                    <input
                        type="password"
                        class="block border w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                    />

                    {/* TODO: Make button functional */}
                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded text-white bg-green-400 hover:bg-green-500 focus:outline-none my-1"
                    >
                        Create Account
                    </button>

                    <div class="text-center text-sm text-gray-600 mt-4">
                        By signing up, you agree to the
                        <br />
                        <a class="text-blue-400 hover:underline" href="#">
                            Terms of Service{" "}
                            {/* TODO: Create Terms of Service */}
                        </a>{" "}
                        and{" "}
                        <a class="text-blue-400 hover:underline" href="#">
                            Privacy Policy {/* TODO: Create Privacy Policy */}
                        </a>
                    </div>
                </div>

                <div class="mt-6 text-gray-600">
                    Already have an account?{" "}
                    <a class="text-blue-400 hover:underline" href="../login/">
                        Log in
                    </a>
                    !
                </div>
            </div>
        </div>
    );
}
