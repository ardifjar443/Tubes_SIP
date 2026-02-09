import React, { useState, useMemo } from "react";
import { Link, router, usePage, Head } from "@inertiajs/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/id";

// Setup Moment
moment.locale("id");
const localizer = momentLocalizer(moment);

// --- KOMPONEN KARTU MENU ---
const MenuCard = ({
    title,
    description,
    href,
    icon,
    colorClass,
    hoverClass,
}) => (
    <Link
        href={href}
        className={`relative overflow-hidden p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group bg-white border border-gray-100 block w-full h-full`}
    >
        <div className="flex items-start gap-3">
            <div
                className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${colorClass} bg-opacity-10 text-current`}
            >
                <div className="w-4 h-4">{icon}</div>
            </div>
            <div>
                <h3
                    className={`text-sm font-bold text-gray-800 ${hoverClass || "group-hover:text-teal-600"} transition-colors`}
                >
                    {title}
                </h3>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                    {description}
                </p>
            </div>
        </div>
    </Link>
);

// --- KOMPONEN STATISTIK ---
const StatCard = ({ label, value, color }) => (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between h-full">
        <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                {label}
            </p>
            <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-1.5 h-6 ${color} rounded-full opacity-80`}></div>
    </div>
);

// --- KOMPONEN APPROVAL LIST ---
const ApprovalCard = ({ cuti }) => {
    const handleAction = (status) => {
        if (
            confirm(
                `Yakin ingin ${status === "approved" ? "menyetujui" : "menolak"} pengajuan ini?`,
            )
        ) {
            router.put(
                route("cuti.updateStatus", cuti.id_cuti),
                {
                    status: status,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => alert("Status berhasil diperbarui!"),
                },
            );
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="font-bold text-gray-800 text-sm">
                        {cuti.tenaga_medis?.nama_tenaga_medis}
                    </h4>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded capitalize">
                        {cuti.jenis_cuti}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-gray-400 block">
                        Mulai
                    </span>
                    <span className="text-xs font-semibold text-teal-600">
                        {moment(cuti.tanggal_mulai).format("DD MMM")}
                    </span>
                </div>
            </div>

            {cuti.keterangan && (
                <p className="text-xs text-gray-500 italic mb-3 border-l-2 border-gray-300 pl-2 line-clamp-2">
                    "{cuti.keterangan}"
                </p>
            )}

            <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                    onClick={() => handleAction("rejected")}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3"
                    >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                    </svg>
                    Tolak
                </button>
                <button
                    onClick={() => handleAction("approved")}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-teal-50 text-teal-600 text-xs font-bold rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Setujui
                </button>
            </div>
        </div>
    );
};

// --- KOMPONEN EVENT KALENDER ---
const CustomEventComponent = ({ event }) => {
    const spesialisasi = (event.spesialisasi || "").toLowerCase();
    const isGigi = spesialisasi.includes("gigi");

    return (
        <div className="flex flex-col justify-start px-1 py-0.5 leading-tight h-full overflow-hidden">
            <div className="flex justify-between items-center mb-0.5">
                <span className="text-[10px] font-bold text-white/90">
                    {moment(event.start).format("HH:mm")}
                </span>
                {isGigi ? (
                    <span className="bg-pink-500 text-white text-[8px] font-extrabold px-1 rounded-sm shadow-sm">
                        GIGI
                    </span>
                ) : (
                    <span className="bg-blue-500 text-white text-[8px] font-bold px-1 rounded-sm">
                        UMUM
                    </span>
                )}
            </div>
            <div className="text-[10px] font-medium truncate text-white">
                {event.title}
            </div>
        </div>
    );
};

// --- IKON SVG ---
const Icons = {
    Stethoscope: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A6.065 6.065 0 0 1 22.8 8.25a.75.75 0 0 1-1.5 0 4.565 4.565 0 0 0-8.823-.75H12V11a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V7.5h-.224A4.565 4.565 0 0 0 .95 8.25a.75.75 0 0 1-1.5 0 6.065 6.065 0 0 1 10.5-5.445Z" />
            <path
                d="M12 11V7.5H9V11a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1.5h1.5V11a3.5 3.5 0 0 1-7 0V9.5h1.5V11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5Z"
                opacity="0.5"
            />
        </svg>
    ),
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

export default function Dashboard({ jadwal = [], cutiPending = [] }) {
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

    const [viewMode, setViewMode] = useState(
        role === "kepala klinik" ? "all" : "mine",
    );

    // --- TRANSFORM DATA JADWAL ---
    const events = useMemo(() => {
        return jadwal
            .map((item) => {
                const tanggal = item.shift_harian?.tanggal;
                const shift = item.shift_harian?.shift;
                if (!tanggal || !shift) return null;
                return {
                    id: item.id,
                    title: `${item.tenaga_medis.nama_tenaga_medis}`,
                    start: new Date(`${tanggal}T${shift.jam_mulai}`),
                    end: new Date(`${tanggal}T${shift.jam_selesai}`),
                    resource: item,
                    ownerId: item.tenaga_medis.id_tenaga_medis,
                    status: item.shift_harian?.periode?.status || "aktif",
                    spesialisasi: item.tenaga_medis.spesialisasi,
                };
            })
            .filter(Boolean);
    }, [jadwal]);

    // --- LOGIKA HITUNG TOTAL JADWAL ---
    const totalJadwalBulanIni = useMemo(() => {
        const currentMonth = moment().month();
        const currentYear = moment().year();

        return events.filter((event) => {
            const eventDate = moment(event.start);
            const isCurrentMonth =
                eventDate.month() === currentMonth &&
                eventDate.year() === currentYear;

            if (role === "dokter") {
                const myId = auth.user.id_tenaga_medis || auth.user.id;
                return isCurrentMonth && event.ownerId == myId;
            }
            return isCurrentMonth;
        }).length;
    }, [events, role, auth.user]);

    // --- FILTER KALENDER ---
    const displayedEvents = events.filter((event) => {
        if (viewMode === "mine") {
            const myId = auth.user.id_tenaga_medis || auth.user.id;
            return event.ownerId == myId;
        }
        return true;
    });

    const eventStyleGetter = (event) => {
        const myId = auth.user.id_tenaga_medis || auth.user.id;
        const isMine = event.ownerId == myId;
        let bgColor = "#0d9488";

        switch (event.status) {
            case "aktif":
                bgColor = "#0d9488";
                break;
            case "draft":
                bgColor = "#d97706";
                break;
            default:
                bgColor = "#3b82f6";
        }

        return {
            style: {
                backgroundColor: bgColor,
                color: "#ffffff",
                borderRadius: "4px",
                border: isMine ? "2px solid #ffffff" : "0px",
                opacity: isMine ? 1 : 0.85,
                display: "block",
                boxShadow: isMine ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
            },
        };
    };

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Head title="Dashboard" />

            <style>{`
                .rbc-calendar { font-family: 'Figtree', sans-serif; }
                .rbc-header { padding: 8px 0; font-size: 0.75rem; font-weight: 700; background-color: #f0fdfa; color: #115e59; }
                .rbc-date-cell { font-size: 0.75rem; font-weight: 600; padding: 4px; color: #374151; }
                .rbc-event { min-height: auto !important; padding: 1px !important; }
                .rbc-month-row { overflow-y: visible !important; }
                .rbc-today { background-color: #ecfdf5; }
                .rbc-toolbar span { font-size: 0.8rem; }
                .rbc-toolbar button { font-size: 0.75rem; padding: 4px 8px; }
            `}</style>

            {/* ===== HEADER ===== */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-[95%] mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-teal-600 text-white p-2 rounded-lg shadow-sm">
                            {Icons.Stethoscope}
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-800 leading-tight">
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
                            <span className="inline-block bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full capitalize border border-teal-100">
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

            <main className="max-w-[95%] mx-auto py-6 space-y-6">
                {/* ===== SECTION 1: TOP SUMMARY ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* GREETING */}
                    <div className="lg:col-span-2 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-1">
                                Halo, {nama}! 👋
                            </h2>
                            <p className="text-teal-50 text-sm opacity-90">
                                {role === "dokter"
                                    ? "Berikut adalah ringkasan jadwal praktek Anda hari ini."
                                    : "Selamat datang di dashboard manajemen klinik."}
                            </p>
                        </div>
                        <div className="absolute right-0 top-0 h-full w-1/3 bg-white opacity-10 transform skew-x-12"></div>
                    </div>

                    {/* STATS SUMMARY */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                                Total Jadwal Bulan Ini
                            </p>
                            <p className="text-3xl font-bold text-teal-600 mt-2">
                                {totalJadwalBulanIni}
                                <span className="text-sm text-gray-400 font-normal ml-1">
                                    Sesi
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== SECTION 2: MAIN CONTENT (3 COLUMN LAYOUT) ===== */}
                {/* Grid 12 Kolom */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* --- KIRI: MENU SIDEBAR --- */}
                    {/* Jika Admin: Full Width (karena kalender hidden), Jika Lain: 25% */}
                    <div
                        className={`${role === "admin" ? "lg:col-span-12" : "lg:col-span-3"} space-y-4`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">
                                Menu Utama
                            </h3>
                        </div>

                        {/* Grid container untuk menu admin agar horizontal, vertical untuk yg lain */}
                        <div
                            className={`${role === "admin" ? "grid grid-cols-1 sm:grid-cols-3 gap-4" : "space-y-3"}`}
                        >
                            {role === "admin" && (
                                <MenuCard
                                    title="Data Tenaga Medis"
                                    description="Kelola data dokter & perawat."
                                    href={route("tenaga-medis.index")}
                                    icon={Icons.Users}
                                    colorClass="text-cyan-600 bg-cyan-50"
                                />
                            )}

                            {role === "dokter" && (
                                <>
                                    <MenuCard
                                        title="Pengajuan Cuti"
                                        description="Ajukan permohonan cuti."
                                        href={route("cuti.create")}
                                        icon={Icons.Briefcase}
                                        colorClass="text-emerald-600 bg-emerald-50"
                                    />
                                    <MenuCard
                                        title="Riwayat Cuti"
                                        description="Cek status pengajuan."
                                        href={route("cuti.index")}
                                        icon={Icons.Clipboard}
                                        colorClass="text-orange-500 bg-orange-50"
                                    />
                                </>
                            )}

                            {role === "kepala klinik" && (
                                <>
                                    <MenuCard
                                        title="Kelola Shift"
                                        description="Atur jam kerja shift."
                                        href={route("shift.index")}
                                        icon={Icons.Clock}
                                        colorClass="text-cyan-600 bg-cyan-50"
                                    />
                                    <MenuCard
                                        title="Approval Cuti"
                                        description="Validasi cuti staff."
                                        href={route("cuti.index")}
                                        icon={Icons.Briefcase}
                                        colorClass="text-emerald-600 bg-emerald-50"
                                    />
                                    <MenuCard
                                        title="Regulasi Klinik"
                                        description="Atur batasan aturan."
                                        href={route("regulasi.show")}
                                        icon={Icons.Book}
                                        colorClass="text-blue-600 bg-blue-50"
                                    />
                                    <div
                                        className="p-4 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:border-teal-500 hover:bg-teal-50 transition cursor-pointer group py-6 h-full"
                                        onClick={() =>
                                            router.post(
                                                route("jadwal.generate"),
                                            )
                                        }
                                    >
                                        <div className="text-teal-400 group-hover:text-teal-600 mb-1">
                                            {Icons.Sparkles}
                                        </div>
                                        <span className="font-bold text-sm text-gray-600 group-hover:text-teal-700">
                                            Generate Jadwal
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Statistik Bawah Menu (Untuk Admin & Kepala Klinik) */}
                        {/* Jika Admin, tampilkan Grid Horizontal */}
                        {(role === "admin" || role === "kepala klinik") && (
                            <div
                                className={`mt-6 pt-6 border-t border-gray-100 ${role === "admin" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "space-y-3"}`}
                            >
                                {role !== "admin" && (
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                        Statistik Klinik
                                    </h4>
                                )}

                                <StatCard
                                    label="Dokter"
                                    value={stats.dokter}
                                    color="bg-teal-500"
                                />
                                {/* <StatCard label="Perawat" value={stats.perawat} color="bg-emerald-500" /> */}
                            </div>
                        )}
                    </div>

                    {/* --- TENGAH: KALENDER (50%) - HIDDEN IF ADMIN --- */}
                    {role !== "admin" && (
                        <div className="lg:col-span-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                                    <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                        {Icons.Calendar}{" "}
                                        <span className="w-2"></span> Kalender
                                        Jadwal
                                    </h3>

                                    <div className="flex bg-gray-100 p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode("all")}
                                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${viewMode === "all" ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                        >
                                            Semua
                                        </button>
                                        <button
                                            onClick={() => setViewMode("mine")}
                                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${viewMode === "mine" ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                        >
                                            Saya
                                        </button>
                                    </div>
                                </div>

                                <div style={{ height: "600px" }}>
                                    <Calendar
                                        localizer={localizer}
                                        events={displayedEvents}
                                        startAccessor="start"
                                        endAccessor="end"
                                        style={{ height: "100%" }}
                                        eventPropGetter={eventStyleGetter}
                                        components={{
                                            event: CustomEventComponent,
                                        }}
                                        culture="id"
                                        messages={{
                                            next: ">",
                                            previous: "<",
                                            today: "Hari Ini",
                                            month: "Bln",
                                            week: "Mgg",
                                            day: "Hr",
                                            noEventsInRange: "Kosong",
                                            showMore: (total) => `+${total}`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- KANAN: APPROVAL LIST (25%) --- */}
                    {/* Hanya Tampil Untuk Kepala Klinik */}
                    {role === "kepala klinik" && (
                        <div className="lg:col-span-3 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold text-gray-800">
                                    Menunggu Approval
                                </h3>
                                {cutiPending.length > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {cutiPending.length}
                                    </span>
                                )}
                            </div>

                            {cutiPending.length === 0 ? (
                                <div className="bg-white p-8 rounded-xl border border-gray-100 text-center">
                                    <div className="text-gray-300 mb-2 flex justify-center">
                                        {Icons.Briefcase}
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Tidak ada pengajuan baru.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1 custom-scrollbar">
                                    {cutiPending.map((cuti) => (
                                        <ApprovalCard
                                            key={cuti.id_cuti}
                                            cuti={cuti}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
