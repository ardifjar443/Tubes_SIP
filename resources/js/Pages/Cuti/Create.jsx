import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        tanggal_mulai: "",
        tanggal_selesai: "",
        jenis_cuti: "cuti",
        keterangan: "", // Opsional: Jika Anda ingin menambah field alasan
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
                    Pengajuan Cuti Baru
                </h2>
            }
        >
            <Head title="Ajukan Cuti" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl">
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
                                        className="w-6 h-6 text-indigo-600"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                                        />
                                    </svg>
                                    Formulir Permohonan
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Silakan isi detail tanggal dan jenis izin
                                    yang Anda butuhkan.
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
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
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
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
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

                                {/* Jenis Cuti */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jenis Pengajuan
                                    </label>
                                    <select
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                        value={data.jenis_cuti}
                                        onChange={(e) =>
                                            setData(
                                                "jenis_cuti",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="cuti">
                                            Cuti Tahunan / Pribadi
                                        </option>
                                        <option value="sakit">Sakit</option>
                                        <option value="dinas">
                                            Dinas Luar
                                        </option>
                                        <option value="melahirkan">
                                            Melahirkan
                                        </option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        *Pilih kategori yang sesuai dengan
                                        alasan ketidakhadiran.
                                    </p>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-end gap-4 border-t pt-6 mt-4">
                                    <Link
                                        href={route("dashboard")}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
