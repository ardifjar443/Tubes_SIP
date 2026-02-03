import { Link, useForm } from "@inertiajs/react";

export default function Index({ regulasi }) {
    const { delete: destroy } = useForm();

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold">Regulasi Kesehatan</h1>
                <Link
                    href={route("regulasi.create")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Tambah Regulasi
                </Link>
            </div>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">Max Jam Harian</th>
                        <th className="border p-2">Max Jam Mingguan</th>
                        <th className="border p-2">Max Shift Harian</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {regulasi.map((item) => (
                        <tr key={item.id_regulasi}>
                            <td className="border p-2">
                                {item.max_jam_harian}
                            </td>
                            <td className="border p-2">
                                {item.max_jam_mingguan}
                            </td>
                            <td className="border p-2">
                                {item.max_shift_harian}
                            </td>
                            <td className="border p-2">
                                {item.status_aktif ? "Aktif" : "Tidak Aktif"}
                            </td>
                            <td className="border p-2 space-x-2">
                                <Link
                                    href={route(
                                        "regulasi.edit",
                                        item.id_regulasi,
                                    )}
                                    className="text-blue-600"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() =>
                                        destroy(
                                            route(
                                                "regulasi.destroy",
                                                item.id_regulasi,
                                            ),
                                        )
                                    }
                                    className="text-red-600"
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
