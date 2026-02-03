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
        // --- 1. WRAPPER UTAMA (PENGGANTI GUESTLAYOUT) ---
        // Ini membuat background abu-abu dan menengahkan konten secara vertikal & horizontal
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50">
            <Head title="Log in" />
            {/* --- 2. KARTU LOGIN --- */}
            <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-lg overflow-hidden sm:rounded-xl border border-gray-100">
                {/* --- HEADER (LOGO JAM & JUDUL) --- */}
                <div className="mb-8 text-center">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Masuk ke YRAP Klinik
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        Sistem Informasi Penjadwalan
                    </p>
                </div>

                {status && (
                    <div className="mb-4 rounded-md bg-green-50 p-4 text-sm font-medium text-green-600 border border-green-200">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    {/* --- EMAIL --- */}
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="text-gray-700 font-semibold"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
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
                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
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
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="text-indigo-600 focus:ring-indigo-500 rounded border-gray-300"
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Ingat saya
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    {/* --- BUTTON FULL WIDTH --- */}
                    <div>
                        <PrimaryButton
                            className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all"
                            disabled={processing}
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
