import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        // --- WRAPPER UTAMA ---
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
            <Head title="Log in" />

            {/* --- KARTU LOGIN --- */}
            <div className="w-full sm:max-w-md mt-6 px-6 py-10 bg-white shadow-xl overflow-hidden sm:rounded-2xl border border-gray-100">
                {/* --- HEADER (LOGO STETOSKOP & JUDUL) --- */}
                <div className="mb-8 text-center">
                    {/* Background Icon diganti jadi Teal */}
                    <div className="mx-auto h-16 w-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-105 duration-300">
                        {/* ICON STETOSKOP */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-9 h-9"
                        >
                            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A6.065 6.065 0 0 1 22.8 8.25a.75.75 0 0 1-1.5 0 4.565 4.565 0 0 0-8.823-.75H12V11a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V7.5h-.224A4.565 4.565 0 0 0 .95 8.25a.75.75 0 0 1-1.5 0 6.065 6.065 0 0 1 10.5-5.445Z" />
                            <path
                                d="M12 11V7.5H9V11a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1.5h1.5V11a3.5 3.5 0 0 1-7 0V9.5h1.5V11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5Z"
                                opacity="0.5"
                            />
                            <path
                                fillRule="evenodd"
                                d="M12 2.25a.75.75 0 0 1 .75.75v8.69l.73.73a.75.75 0 0 1-1.06 1.06l-.42-.42v4.69a3.75 3.75 0 1 1-7.5 0v-2.625a.75.75 0 0 1 1.5 0v2.625a2.25 2.25 0 0 0 4.5 0v-5.002l-.42.42a.75.75 0 0 1-1.06-1.06l.73-.73V3a.75.75 0 0 1 .75-.75Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Masuk ke YRAP Klinik
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        Sistem Informasi Penjadwalan Dokter
                    </p>
                </div>

                {status && (
                    <div className="mb-4 rounded-md bg-teal-50 p-4 text-sm font-medium text-teal-700 border border-teal-200">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* --- EMAIL --- */}
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-gray-700 font-semibold"
                        />

                        {/* Focus ring diganti jadi Teal */}
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm py-2.5"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="nama@klinik.com"
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* --- PASSWORD --- */}
                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-gray-700 font-semibold"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm py-2.5"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="••••••••"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* --- REMEMBER ME & FORGOT PASSWORD --- */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            {/* Checkbox diganti jadi Teal */}
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="text-teal-600 focus:ring-teal-500 rounded border-gray-300"
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Ingat saya
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm font-semibold text-teal-600 hover:text-teal-500"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    {/* --- BUTTON FULL WIDTH --- */}
                    <div>
                        {/* Button diganti jadi Teal */}
                        <PrimaryButton
                            className="flex w-full justify-center rounded-lg bg-teal-600 px-3 py-3 text-sm font-bold leading-6 text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-all duration-200"
                            disabled={processing}
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>

            {/* Footer kecil opsional untuk mempercantik */}
            <p className="mt-8 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} YRAP Klinik. All rights
                reserved.
            </p>
        </div>
    );
}
