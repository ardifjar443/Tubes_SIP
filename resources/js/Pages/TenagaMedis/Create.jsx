import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_tenaga_medis: "",
        email: "",
        password: "",
        jenis_tenaga_medis: "dokter",
        spesialisasi: "",
    });

    // Cek apakah role yang dipilih tidak butuh spesialisasi
    const isNoneSpesialisasi =
        data.jenis_tenaga_medis === "admin" ||
        data.jenis_tenaga_medis === "kepala klinik";

    const handleJenisChange = (value) => {
        // Update jenis dulu
        setData((data) => ({
            ...data,
            jenis_tenaga_medis: value,
            // Jika admin/ka.klinik, otomatis set spesialisasi ke 'none'
            spesialisasi:
                value === "admin" || value === "kepala klinik" ? "none" : "",
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("tenaga-medis.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Staff Baru
                </h2>
            }
        >
            <Head title="Tambah Tenaga Medis" />

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
                                            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Biodata Tenaga Medis
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Lengkapi form di bawah untuk
                                        mendaftarkan akun staff baru.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Grid 2 Kolom untuk Nama & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Nama */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                            placeholder="Nama lengkap beserta gelar"
                                            value={data.nama_tenaga_medis}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_tenaga_medis",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.nama_tenaga_medis && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.nama_tenaga_medis}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                            placeholder="email@klinik.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password Akun
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                        placeholder="Minimal 8 karakter"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="border-t pt-4"></div>

                                {/* Grid 2 Kolom untuk Role & Spesialisasi */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Jenis Tenaga Medis */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Posisi / Jabatan
                                        </label>
                                        <select
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                                            value={data.jenis_tenaga_medis}
                                            onChange={(e) =>
                                                handleJenisChange(
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="dokter">
                                                Dokter
                                            </option>
                                            <option value="perawat">
                                                Perawat
                                            </option>
                                            <option value="admin">Admin</option>
                                            <option value="kepala klinik">
                                                Kepala Klinik
                                            </option>
                                        </select>
                                        {errors.jenis_tenaga_medis && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.jenis_tenaga_medis}
                                            </p>
                                        )}
                                    </div>

                                    {/* Spesialisasi */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Spesialisasi
                                            {isNoneSpesialisasi && (
                                                <span className="text-gray-400 font-normal ml-1">
                                                    (Tidak diperlukan)
                                                </span>
                                            )}
                                        </label>
                                        <select
                                            className={`w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ${
                                                isNoneSpesialisasi
                                                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                                    : "bg-white"
                                            }`}
                                            disabled={isNoneSpesialisasi}
                                            value={data.spesialisasi}
                                            onChange={(e) =>
                                                setData(
                                                    "spesialisasi",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            {isNoneSpesialisasi ? (
                                                <option value="none">
                                                    None
                                                </option>
                                            ) : (
                                                <>
                                                    <option value="">
                                                        -- Pilih Spesialisasi --
                                                    </option>
                                                    <option value="umum">
                                                        Umum
                                                    </option>
                                                    <option value="gigi">
                                                        Gigi
                                                    </option>
                                                    <option value="anak">
                                                        Anak
                                                    </option>
                                                    <option value="bedah">
                                                        Bedah
                                                    </option>
                                                    <option value="kandungan">
                                                        Kandungan
                                                    </option>
                                                    <option value="penyakit dalam">
                                                        Penyakit Dalam
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                        {errors.spesialisasi && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.spesialisasi}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route("tenaga-medis.index")}
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
                                            : "Simpan Data"}
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
