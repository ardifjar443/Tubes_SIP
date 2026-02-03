import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_shift: "",
        jam_mulai: "",
        jam_selesai: "",
        durasi_jam: "",
        service_tipe: "umum",
    });

    // --- FITUR AUTO CALCULATE DURASI ---
    // Menghitung selisih jam secara otomatis
    useEffect(() => {
        if (data.jam_mulai && data.jam_selesai) {
            const start = new Date(`1970-01-01T${data.jam_mulai}:00`);
            const end = new Date(`1970-01-01T${data.jam_selesai}:00`);

            // Hitung selisih dalam milidetik
            let diff = end - start;

            // Jika waktu selesai lebih kecil dari mulai (misal shift malam: 20:00 - 04:00), tambah 24 jam
            if (diff < 0) {
                diff += 24 * 60 * 60 * 1000;
            }

            // Konversi ke jam (desimal 2 angka di belakang koma)
            const hours = (diff / (1000 * 60 * 60)).toFixed(1);

            // Update state durasi
            setData((prev) => ({ ...prev, durasi_jam: hours }));
        }
    }, [data.jam_mulai, data.jam_selesai]);

    const submit = (e) => {
        e.preventDefault();
        post(route("shift.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Buat Jadwal Shift Baru
                </h2>
            }
        >
            <Head title="Tambah Shift" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            {/* Header Form */}
                            <div className="mb-8 border-b pb-4 flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
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
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Detail Shift Kerja
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Tentukan jam operasional untuk poli Umum
                                        atau Gigi.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Nama Shift */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Shift
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                        placeholder="Contoh: Pagi (Poli Gigi), Malam (UGD)"
                                        value={data.nama_shift}
                                        onChange={(e) =>
                                            setData(
                                                "nama_shift",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.nama_shift && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.nama_shift}
                                        </p>
                                    )}
                                </div>

                                {/* Grid Waktu */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Jam Mulai */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jam Mulai
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                            value={data.jam_mulai}
                                            onChange={(e) =>
                                                setData(
                                                    "jam_mulai",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.jam_mulai && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.jam_mulai}
                                            </p>
                                        )}
                                    </div>

                                    {/* Jam Selesai */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jam Selesai
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                            value={data.jam_selesai}
                                            onChange={(e) =>
                                                setData(
                                                    "jam_selesai",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.jam_selesai && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.jam_selesai}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Grid Durasi & Layanan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Durasi (Auto Calculate) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Durasi (Jam)
                                            <span className="text-xs text-gray-400 font-normal ml-1 italic">
                                                (Otomatis)
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 bg-gray-50"
                                                value={data.durasi_jam}
                                                onChange={(e) =>
                                                    setData(
                                                        "durasi_jam",
                                                        e.target.value,
                                                    )
                                                }
                                                readOnly={false} // Tetap bisa diedit manual jika perlu
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">
                                                    Jam
                                                </span>
                                            </div>
                                        </div>
                                        {errors.durasi_jam && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.durasi_jam}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tipe Layanan */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Target Layanan
                                        </label>
                                        <select
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                            value={data.service_tipe}
                                            onChange={(e) =>
                                                setData(
                                                    "service_tipe",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="umum">
                                                Poli Umum
                                            </option>
                                            <option value="gigi">
                                                Poli Gigi
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route("shift.index")}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                                    >
                                        Batal
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all ${
                                            processing
                                                ? "opacity-75 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Shift"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
