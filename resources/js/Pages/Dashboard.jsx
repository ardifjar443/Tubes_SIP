import { Link, router, usePage } from "@inertiajs/react";

// --- KOMPONEN KARTU MENU ---
const MenuCard = ({ title, description, href, icon, colorClass }) => (
    <Link
        href={href}
        className={`relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group bg-white border border-gray-100`}
    >
        <div
            className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}
        >
            {icon}
        </div>
        <div className="relative z-10">
            <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClass} bg-opacity-10 text-current`}
            >
                <div className="w-6 h-6">{icon}</div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {title}
            </h3>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {description}
            </p>
        </div>
    </Link>
);

// --- KOMPONEN STATISTIK ---
const StatCard = ({ label, value, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                {label}
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-3 h-full ${color} rounded-full`}></div>
    </div>
);

// --- IKON SVG ---
const Icons = {
    Users: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
        </svg>
    ),
    Clock: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    ),
    Briefcase: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.111 48.111 0 00-3.413-.387m4.5 2.622V6.75a3 3 0 00-3-3H9a3 3 0 00-3 3v2.25m3 0h3m-3 0a2.25 2.25 0 00-2.25 2.25v5.25m0 0h15m-15 0a2.25 2.25 0 00-2.25-2.25v-5.25m15 0a2.25 2.25 0 00-2.25-2.25v5.25"
            />
        </svg>
    ),
    Sparkles: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
        </svg>
    ),
    Clipboard: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
        </svg>
    ),
    // --- ICON BARU: BOOK (Untuk Regulasi) ---
    Book: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
        </svg>
    ),
};

export default function Dashboard() {
    const { props } = usePage();
    const auth = props.auth || {};
    const user = auth.user || {};
    const stats = props.stats || {
        totalTenagaMedis: 0,
        dokter: 0,
        perawat: 0,
        aktif: 0,
    };

    const role = user?.jenis_tenaga_medis?.toLowerCase();
    const nama = user?.nama_tenaga_medis || user?.name || "User";

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* ===== HEADER ===== */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg">
                            {Icons.Sparkles}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 leading-tight">
                                SIP Klinik
                            </h1>
                            <p className="text-xs text-gray-500">
                                Sistem Penjadwalan
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-semibold text-gray-700">
                                {nama}
                            </p>
                            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full capitalize">
                                {role || "Guest"}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 space-y-8">
                {/* ===== SECTION 1: STATS ===== */}
                {(role === "admin" || role === "kepala klinik") && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard
                            label="Total Staff"
                            value={stats.totalTenagaMedis}
                            color="bg-blue-500"
                        />
                        <StatCard
                            label="Dokter"
                            value={stats.dokter}
                            color="bg-teal-500"
                        />
                        <StatCard
                            label="Perawat"
                            value={stats.perawat}
                            color="bg-purple-500"
                        />
                        <StatCard
                            label="Staff Aktif"
                            value={stats.aktif}
                            color="bg-green-500"
                        />
                    </div>
                )}

                {/* ===== SECTION 2: GREETING ===== */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2">
                            Halo, {nama}! 👋
                        </h2>
                        <p className="text-indigo-100 max-w-xl">
                            {role === "dokter"
                                ? "Selamat bertugas. Silakan cek jadwal praktek atau ajukan cuti melalui menu di bawah."
                                : "Selamat datang di dashboard manajemen klinik."}
                        </p>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-5 transform skew-x-12"></div>
                </div>

                {/* ===== SECTION 3: MENU GRID ===== */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span>Menu Utama</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 1. ROLE: ADMIN (Hanya Tenaga Medis) */}
                        {role === "admin" && (
                            <>
                                <MenuCard
                                    title="Data Tenaga Medis"
                                    description="Tambah, edit, dan kelola data dokter & perawat."
                                    href={route("tenaga-medis.index")}
                                    icon={Icons.Users}
                                    colorClass="text-blue-600 bg-blue-50"
                                />
                            </>
                        )}

                        {/* 2. ROLE: DOKTER (Jadwal, Pengajuan Cuti, Riwayat Cuti) */}
                        {role === "dokter" && (
                            <>
                                <MenuCard
                                    title="Jadwal Saya"
                                    description="Lihat kalender jadwal praktek pribadi Anda."
                                    href={route("jadwal.index")}
                                    icon={Icons.Calendar}
                                    colorClass="text-green-600 bg-green-50"
                                />
                                <MenuCard
                                    title="Pengajuan Cuti"
                                    description="Ajukan permohonan cuti baru."
                                    href={route("cuti.create")}
                                    icon={Icons.Briefcase}
                                    colorClass="text-teal-600 bg-teal-50"
                                />
                                <MenuCard
                                    title="Riwayat Cuti"
                                    description="Lihat status pengajuan cuti Anda."
                                    href={route("cuti.index")}
                                    icon={Icons.Clipboard}
                                    colorClass="text-orange-600 bg-orange-50"
                                />
                            </>
                        )}

                        {/* 3. ROLE: KEPALA KLINIK */}
                        {role === "kepala klinik" && (
                            <>
                                {/* Manajemen Jadwal */}
                                <MenuCard
                                    title="Jadwal Dokter"
                                    description="Lihat seluruh jadwal klinik dan detailnya."
                                    href={route("jadwal.index")}
                                    icon={Icons.Calendar}
                                    colorClass="text-indigo-600 bg-indigo-50"
                                />
                                {/* Kelola Shift */}
                                <MenuCard
                                    title="Kelola Shift"
                                    description="Atur jam kerja dan pembagian shift."
                                    href={route("shift.index")}
                                    icon={Icons.Clock}
                                    colorClass="text-pink-600 bg-pink-50"
                                />
                                {/* Approval Cuti */}
                                <MenuCard
                                    title="Approval Cuti"
                                    description="Setujui atau tolak pengajuan cuti staff."
                                    href={route("cuti.index")}
                                    icon={Icons.Briefcase}
                                    colorClass="text-purple-600 bg-purple-50"
                                />
                                {/* --- MENU BARU: REGULASI --- */}
                                <MenuCard
                                    title="Regulasi Klinik"
                                    description="Atur batasan jam kerja dan aturan penjadwalan."
                                    href={route("regulasi.show")}
                                    icon={Icons.Book}
                                    colorClass="text-cyan-600 bg-cyan-50"
                                />

                                {/* Generate Jadwal */}
                                <div
                                    className="p-6 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:border-indigo-500 hover:bg-indigo-50 transition cursor-pointer group"
                                    onClick={() =>
                                        router.post(route("jadwal.generate"))
                                    }
                                >
                                    <div className="text-indigo-400 group-hover:text-indigo-600 mb-2">
                                        {Icons.Sparkles}
                                    </div>
                                    <span className="font-bold text-gray-600 group-hover:text-indigo-700">
                                        Generate Otomatis
                                    </span>
                                    <span className="text-xs text-gray-400 mt-1">
                                        Buat jadwal bulan depan
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
