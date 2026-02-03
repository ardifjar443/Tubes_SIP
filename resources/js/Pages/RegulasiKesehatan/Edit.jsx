import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";

export default function Edit({ auth }) {
    // Ambil data regulasi dari props
    const { regulasi } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        max_jam_harian: regulasi.max_jam_harian,
        max_jam_mingguan: regulasi.max_jam_mingguan,
        max_shift_harian: regulasi.max_shift_harian,
        keterangan: regulasi.keterangan ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("regulasi.update"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Regulasi Klinik
                </h2>
            }
        >
            <Head title="Edit Regulasi" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            {/* Header Form */}
                            <div className="mb-8 border-b pb-4 flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
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
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Aturan & Batasan Kerja
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Parameter ini akan membatasi sistem saat
                                        generate jadwal otomatis.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Grid untuk Input Angka */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Max Jam Harian */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Max Jam / Hari
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                                value={data.max_jam_harian}
                                                onChange={(e) =>
                                                    setData(
                                                        "max_jam_harian",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">
                                                    Jam
                                                </span>
                                            </div>
                                        </div>
                                        {errors.max_jam_harian && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.max_jam_harian}
                                            </p>
                                        )}
                                    </div>

                                    {/* Max Jam Mingguan */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Max Jam / Minggu
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                                value={data.max_jam_mingguan}
                                                onChange={(e) =>
                                                    setData(
                                                        "max_jam_mingguan",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">
                                                    Jam
                                                </span>
                                            </div>
                                        </div>
                                        {errors.max_jam_mingguan && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.max_jam_mingguan}
                                            </p>
                                        )}
                                    </div>

                                    {/* Max Shift Harian */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Max Shift / Hari
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                                value={data.max_shift_harian}
                                                onChange={(e) =>
                                                    setData(
                                                        "max_shift_harian",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">
                                                    Shift
                                                </span>
                                            </div>
                                        </div>
                                        {errors.max_shift_harian && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.max_shift_harian}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Keterangan */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Keterangan Tambahan
                                    </label>
                                    <textarea
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                        rows="4"
                                        placeholder="Tambahkan catatan khusus mengenai regulasi ini..."
                                        value={data.keterangan}
                                        onChange={(e) =>
                                            setData(
                                                "keterangan",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.keterangan && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.keterangan}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route("regulasi.show")}
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
                                            : "Simpan Perubahan"}
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
