import { Head, Link } from "@inertiajs/react";

// --- ICONS ---
const Icons = {
    Stethoscope: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
        >
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A6.065 6.065 0 0 1 22.8 8.25a.75.75 0 0 1-1.5 0 4.565 4.565 0 0 0-8.823-.75H12V11a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V7.5h-.224A4.565 4.565 0 0 0 .95 8.25a.75.75 0 0 1-1.5 0 6.065 6.065 0 0 1 10.5-5.445Z" />
            <path
                d="M12 11V7.5H9V11a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1.5h1.5V11a3.5 3.5 0 0 1-7 0V9.5h1.5V11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5Z"
                opacity="0.5"
            />
        </svg>
    ),
    Calendar: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
        </svg>
    ),
    Shield: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
        </svg>
    ),
    Chart: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
        </svg>
    ),
};

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Selamat Datang" />
            <div className="min-h-screen bg-gray-50 text-black/80 font-sans selection:bg-teal-500 selection:text-white relative overflow-hidden">
                {/* --- BACKGROUND DECORATION --- */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                </div>

                <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
                    {/* --- HEADER --- */}
                    <header className="flex justify-between items-center py-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-teal-600 text-white p-2 rounded-xl shadow-lg">
                                {Icons.Stethoscope}
                            </div>
                            <span className="text-xl font-bold text-gray-800 tracking-tight">
                                SIP Klinik
                            </span>
                        </div>
                        <nav>
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="px-5 py-2.5 bg-white text-teal-700 border border-teal-200 font-semibold rounded-lg shadow-sm hover:bg-teal-50 hover:border-teal-300 transition duration-300"
                                >
                                    Log in
                                </Link>
                            )}
                        </nav>
                    </header>

                    {/* --- MAIN HERO --- */}
                    <main className="mt-16 lg:mt-24 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wide mb-6 animate-fade-in-up">
                            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            Sistem Informasi Penjadwalan Terintegrasi
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-4xl">
                            Kelola Jadwal Dokter <br />
                            <span className="text-teal-600">
                                Lebih Efisien.
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
                            Solusi digital untuk manajemen jadwal dokter,
                            pengaturan shift perawat, dan persetujuan cuti dalam
                            satu platform yang mudah digunakan.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="px-8 py-3.5 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Buka Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route("login")}
                                    className="px-8 py-3.5 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Masuk ke Sistem
                                </Link>
                            )}
                        </div>

                        {/* --- FEATURES GRID --- */}
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-left">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 transition-colors group">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {Icons.Calendar}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    Penjadwalan Otomatis
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Atur jadwal praktek dokter dan shift jaga
                                    dengan algoritma cerdas yang meminimalkan
                                    konflik.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 transition-colors group">
                                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {Icons.Shield}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    Manajemen Cuti
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Proses pengajuan dan persetujuan cuti yang
                                    transparan serta terupdate otomatis ke
                                    jadwal utama.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 transition-colors group">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    {Icons.Chart}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    Monitoring Real-time
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Dashboard interaktif untuk memantau
                                    ketersediaan tenaga medis secara real-time.
                                </p>
                            </div>
                        </div>
                    </main>

                    <footer className="py-12 mt-12 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-400">
                            &copy; {new Date().getFullYear()} Klinik Pratama
                            YRAP. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                            System Version 1.0.0
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
