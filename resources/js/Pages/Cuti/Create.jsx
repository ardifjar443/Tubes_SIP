import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        tanggal_mulai: "",
        tanggal_selesai: "",
        jenis_cuti: "izin", // Default value
        keterangan: "", // Field baru
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("cuti.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengajuan Cuti / Izin Baru
                </h2>
            }
        >
            <Head title="Ajukan Cuti" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            {/* Header Form */}
                            <div className="mb-6 border-b pb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-teal-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                        />
                                    </svg>
                                    Formulir Permohonan
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Silakan lengkapi detail tanggal, jenis izin,
                                    dan keterangan.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Grid untuk Tanggal */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Tanggal Mulai */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 transition duration-150 py-2.5"
                                            value={data.tanggal_mulai}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_mulai",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.tanggal_mulai && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.tanggal_mulai}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tanggal Selesai */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Selesai
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 transition duration-150 py-2.5"
                                            value={data.tanggal_selesai}
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_selesai",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.tanggal_selesai && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.tanggal_selesai}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Jenis Cuti (Diubah Opsinya) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jenis Pengajuan
                                    </label>
                                    <select
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 transition duration-150 py-2.5"
                                        value={data.jenis_cuti}
                                        onChange={(e) =>
                                            setData(
                                                "jenis_cuti",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="izin">Izin</option>
                                        <option value="sakit">Sakit</option>
                                        <option value="dinas">Dinas</option>
                                        <option value="cuti">Cuti</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        *Pilih kategori yang sesuai dengan
                                        alasan ketidakhadiran.
                                    </p>
                                    {errors.jenis_cuti && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.jenis_cuti}
                                        </p>
                                    )}
                                </div>

                                {/* Keterangan (Field Baru) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Keterangan / Alasan
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-teal-500 focus:ring-teal-500 transition duration-150"
                                        placeholder="Contoh: Sakit demam, atau Menghadiri seminar medis..."
                                        value={data.keterangan}
                                        onChange={(e) =>
                                            setData(
                                                "keterangan",
                                                e.target.value,
                                            )
                                        }
                                    ></textarea>
                                    {errors.keterangan && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.keterangan}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-end gap-4 border-t pt-6 mt-4">
                                    <Link
                                        href={route("dashboard")}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                                    >
                                        Batal
                                    </Link>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-6 py-2 text-sm font-bold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md transition-all ${
                                            processing
                                                ? "opacity-75 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        {processing
                                            ? "Sedang Mengirim..."
                                            : "Kirim Pengajuan"}
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
