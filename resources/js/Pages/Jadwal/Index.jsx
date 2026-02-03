import React, { useState, useMemo } from "react";
import { Head, usePage, router } from "@inertiajs/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import "moment/locale/id";
moment.locale("id");
const localizer = momentLocalizer(moment);

// --- KOMPONEN KOTAK JADWAL (DIPERBARUI DENGAN BADGE SPESIALISASI) ---
const CustomEventComponent = ({ event }) => {
    // Cek spesialisasi (convert ke lowercase untuk jaga-jaga)
    const spesialisasi = (event.spesialisasi || "").toLowerCase();
    const isGigi = spesialisasi.includes("gigi");

    return (
        <div className="flex flex-col justify-start px-1.5 py-1 leading-tight h-full">
            {/* Baris Atas: Jam & Badge Spesialisasi */}
            <div className="flex justify-between items-center border-b border-white/20 pb-1 mb-1">
                <span className="text-xs font-bold text-white/90">
                    {moment(event.start).format("HH:mm")}
                </span>

                {/* --- BADGE PEMBEDA --- */}
                {isGigi ? (
                    <span className="bg-pink-500 text-white text-[9px] font-extrabold px-1 rounded-sm tracking-wide shadow-sm">
                        GIGI
                    </span>
                ) : (
                    <span className="bg-blue-400/50 text-white text-[9px] font-bold px-1 rounded-sm tracking-wide">
                        UMUM
                    </span>
                )}
            </div>

            {/* Nama Dokter */}
            <div className="text-xs font-semibold whitespace-normal break-words leading-snug text-white">
                {event.title}
            </div>
        </div>
    );
};

export default function JadwalIndex({ jadwal, canGenerate }) {
    const { auth } = usePage().props;
    const [viewMode, setViewMode] = useState(
        auth.user.jenis_tenaga_medis === "kepala klinik" ? "all" : "mine",
    );

    // --- 1. TRANSFORMASI DATA ---
    const events = useMemo(() => {
        return jadwal
            .map((item) => {
                const tanggal = item.shift_harian?.tanggal;
                const shift = item.shift_harian?.shift;
                const statusPeriode =
                    item.shift_harian?.periode?.status || "aktif";

                if (!tanggal || !shift) return null;

                const startDateTime = new Date(`${tanggal}T${shift.jam_mulai}`);
                const endDateTime = new Date(`${tanggal}T${shift.jam_selesai}`);

                return {
                    id: item.id,
                    title: `${item.tenaga_medis.nama_tenaga_medis}`,
                    start: startDateTime,
                    end: endDateTime,
                    resource: item,
                    ownerId: item.tenaga_medis.id_tenaga_medis,
                    status: statusPeriode,
                    // --- TAMBAHAN: AMBIL DATA SPESIALISASI ---
                    spesialisasi: item.tenaga_medis.spesialisasi,
                };
            })
            .filter(Boolean);
    }, [jadwal]);

    // --- 2. FILTERING DATA ---
    const displayedEvents = events.filter((event) => {
        if (viewMode === "mine") {
            const myId = auth.user.id_tenaga_medis || auth.user.id;
            return event.ownerId == myId;
        }
        return true;
    });

    // --- 3. STYLING ---
    const eventStyleGetter = (event) => {
        const myId = auth.user.id_tenaga_medis || auth.user.id;
        const isMine = event.ownerId == myId;

        // Warna Background (Status Periode)
        let bgColor = "#16a34a";
        switch (event.status) {
            case "aktif":
                bgColor = "#16a34a";
                break; // Hijau
            case "draft":
                bgColor = "#d97706";
                break; // Orange
            case "plan":
                bgColor = "#4b5563";
                break; // Abu Tua
            case "close":
                bgColor = "#9ca3af";
                break; // Abu Muda
            default:
                bgColor = "#2563eb"; // Biru
        }

        return {
            style: {
                backgroundColor: bgColor,
                color: "#ffffff",
                borderRadius: "6px",
                border: isMine ? "2px solid #ffffff" : "0px",
                opacity: isMine ? 1 : 0.85, // Sedikit lebih solid agar badge terbaca
                display: "block",
                marginBottom: "2px",
                zIndex: isMine ? 50 : 1,
                boxShadow: isMine
                    ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
                    : "none",
            },
        };
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Kalender Jadwal Klinik
                    </h2>
                    {canGenerate && (
                        <button
                            onClick={() => router.post("/jadwal/generate")}
                            className="bg-indigo-600 text-white px-5 py-2.5 text-sm font-bold rounded shadow hover:bg-indigo-700 transition"
                        >
                            + Generate Jadwal
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Jadwal Klinik" />

            <style>{`
                .rbc-calendar { font-family: 'Figtree', sans-serif; }
                .rbc-header { padding: 12px 0; font-size: 1rem; font-weight: 800; background-color: #f3f4f6; color: #1f2937; text-transform: capitalize; }
                .rbc-date-cell { font-size: 1rem; font-weight: 700; padding: 8px; color: #374151; }
                .rbc-event { min-height: auto !important; padding: 2px !important; }
                .rbc-month-row { overflow-y: visible !important; }
                .rbc-today { background-color: #eff6ff; }
            `}</style>

            <div className="py-6 h-screen flex flex-col">
                <div className="w-[98%] mx-auto flex-1 flex flex-col">
                    <div className="bg-white shadow-xl sm:rounded-xl p-6 flex flex-col flex-1">
                        {/* CONTROLS */}
                        <div className="flex flex-col xl:flex-row justify-between items-center mb-4 gap-4 flex-shrink-0">
                            {/* Toggle View */}
                            <div className="bg-gray-100 p-1 rounded-lg flex shadow-inner">
                                <button
                                    onClick={() => setViewMode("all")}
                                    className={`px-6 py-2 text-sm font-bold rounded-md transition-all ${
                                        viewMode === "all"
                                            ? "bg-white text-gray-800 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Semua Jadwal
                                </button>
                                <button
                                    onClick={() => setViewMode("mine")}
                                    className={`px-6 py-2 text-sm font-bold rounded-md transition-all ${
                                        viewMode === "mine"
                                            ? "bg-white text-green-700 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    Jadwal Saya
                                </button>
                            </div>

                            {/* LEGENDA LENGKAP */}
                            <div className="flex flex-wrap justify-center gap-2 text-[10px] md:text-xs font-medium text-gray-600">
                                {/* Status */}
                                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded border border-green-200">
                                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>{" "}
                                    Aktif
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded border border-yellow-200">
                                    <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>{" "}
                                    Draft
                                </div>

                                {/* Spesialisasi */}
                                <div className="flex items-center gap-1 bg-pink-50 px-2 py-1 rounded border border-pink-200 ml-2">
                                    <span className="px-1 bg-pink-500 text-white text-[8px] rounded">
                                        GIGI
                                    </span>{" "}
                                    Dokter Gigi
                                </div>
                                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                    <span className="px-1 bg-blue-400 text-white text-[8px] rounded">
                                        UMUM
                                    </span>{" "}
                                    Dokter Umum
                                </div>

                                {/* Kepemilikan */}
                                <div className="flex items-center gap-1 px-2 py-1 ml-2">
                                    <div className="w-3 h-3 border-2 border-gray-400 bg-transparent rounded-sm"></div>
                                    <span className="italic">
                                        Border Putih = Saya
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* --- KALENDER --- */}
                        <div className="flex-1 min-h-0 relative overflow-y-auto">
                            <div style={{ height: "1200px" }}>
                                <Calendar
                                    localizer={localizer}
                                    events={displayedEvents}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: "100%" }}
                                    eventPropGetter={eventStyleGetter}
                                    components={{ event: CustomEventComponent }}
                                    culture="id"
                                    messages={{
                                        next: "Berikutnya >",
                                        previous: "< Sebelumnya",
                                        today: "Hari Ini",
                                        month: "Bulan",
                                        week: "Minggu",
                                        day: "Hari",
                                        noEventsInRange: "Tidak ada jadwal.",
                                        showMore: (total) =>
                                            `+${total} lainnya`,
                                    }}
                                    defaultView="month"
                                    popup={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
