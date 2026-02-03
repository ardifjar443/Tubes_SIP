export default function JadwalTable({ jadwal, showDokter = true }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {showDokter && (
                            <>
                                <th className="border p-2">Dokter</th>
                                <th className="border p-2">Spesialisasi</th>
                            </>
                        )}
                        <th className="border p-2">Tanggal</th>
                        <th className="border p-2">Shift</th>
                        <th className="border p-2">Jam</th>
                    </tr>
                </thead>
                <tbody>
                    {jadwal.length === 0 && (
                        <tr>
                            <td
                                colSpan={showDokter ? 5 : 3}
                                className="text-center p-4 text-gray-500"
                            >
                                Data jadwal belum tersedia
                            </td>
                        </tr>
                    )}

                    {jadwal.map((j, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            {showDokter && (
                                <>
                                    <td className="border p-2">
                                        {j.tenaga_medis.nama_tenaga_medis}
                                    </td>
                                    <td className="border p-2">
                                        {j.tenaga_medis.spesialisasi}
                                    </td>
                                </>
                            )}
                            <td className="border p-2">
                                {j.shift_harian.tanggal}
                            </td>
                            <td className="border p-2">
                                {j.shift_harian.shift.nama_shift}
                            </td>
                            <td className="border p-2">
                                {j.shift_harian.shift.jam_mulai}
                                {" - "}
                                {j.shift_harian.shift.jam_selesai}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
