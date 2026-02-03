import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, cuti }) {
    // Ambil role langsung dari auth user agar konsisten
    const role = auth.user.jenis_tenaga_medis?.toLowerCase();

    function updateStatus(id, status) {
        if (
            confirm(
                `Apakah Anda yakin ingin mengubah status menjadi ${status}?`,
            )
        ) {
            router.put(route("cuti.updateStatus", id), {
                status: status,
            });
        }
    }

    // Helper untuk warna status
    const getStatusBadge = (status) => {
        switch (status) {
            case "approved":
                return (
                    <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full border border-green-200">
                        Disetujui
                    </span>
                );
            case "rejected":
                return (
                    <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full border border-red-200">
                        Ditolak
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full border border-yellow-200">
                        Menunggu
                    </span>
                );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {role === "kepala klinik"
                            ? "Approval Cuti Pegawai"
                            : "Riwayat Pengajuan Cuti"}
                    </h2>

                    {role === "dokter" && (
                        <Link
                            href={route("cuti.create")}
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Ajukan Baru
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Data Cuti" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        {/* Jika Data Kosong */}
                        {cuti.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-16 h-16 mx-auto mb-4 text-gray-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                                <p className="text-lg font-medium">
                                    Belum ada data cuti.
                                </p>
                                <p className="text-sm mt-1">
                                    {role === "dokter"
                                        ? "Anda belum pernah mengajukan cuti."
                                        : "Belum ada pengajuan masuk."}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-4 font-medium">
                                                Nama Pegawai
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                Periode Cuti
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                Jenis
                                            </th>
                                            <th className="px-6 py-4 font-medium">
                                                Status
                                            </th>
                                            {role === "kepala klinik" && (
                                                <th className="px-6 py-4 font-medium text-center">
                                                    Aksi
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cuti.map((c) => (
                                            <tr
                                                key={c.id_cuti}
                                                className="bg-white border-b hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {
                                                        c.tenaga_medis
                                                            ?.nama_tenaga_medis
                                                    }
                                                    <div className="text-xs text-gray-400 font-normal mt-0.5 capitalize">
                                                        {
                                                            c.tenaga_medis
                                                                ?.jenis_tenaga_medis
                                                        }
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-700">
                                                            {c.tanggal_mulai}{" "}
                                                            <span className="text-gray-400 mx-1">
                                                                s/d
                                                            </span>{" "}
                                                            {c.tanggal_selesai}
                                                        </span>
                                                        {/* Opsional: Hitung durasi hari di sini jika mau */}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 capitalize">
                                                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-200">
                                                        {c.jenis_cuti}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(c.status)}
                                                </td>

                                                {/* Kolom Aksi (Hanya Kepala Klinik & Status Request) */}
                                                {role === "kepala klinik" && (
                                                    <td className="px-6 py-4 text-center">
                                                        {c.status ===
                                                        "request" ? (
                                                            <div className="flex justify-center gap-2">
                                                                <button
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            c.id_cuti,
                                                                            "approved",
                                                                        )
                                                                    }
                                                                    className="group relative flex items-center justify-center p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all border border-green-200 shadow-sm"
                                                                    title="Setujui"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M4.5 12.75l6 6 9-13.5"
                                                                        />
                                                                    </svg>
                                                                </button>

                                                                <button
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            c.id_cuti,
                                                                            "rejected",
                                                                        )
                                                                    }
                                                                    className="group relative flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-200 shadow-sm"
                                                                    title="Tolak"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        stroke="currentColor"
                                                                        className="w-5 h-5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">
                                                                Selesai
                                                            </span>
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
