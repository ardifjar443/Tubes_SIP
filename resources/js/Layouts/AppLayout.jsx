import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow px-6 py-4 flex justify-between">
                <div className="flex gap-4">
                    <Link
                        href="/jadwal"
                        className="font-semibold text-blue-600"
                    >
                        Semua Jadwal
                    </Link>

                    {auth.user?.jenis_tenaga_medis === "dokter" && (
                        <Link href="/jadwal/saya">Jadwal Saya</Link>
                    )}
                </div>

                <div className="text-sm text-gray-600">
                    {auth.user?.nama_tenaga_medis}
                </div>
            </nav>

            <main className="p-6">{children}</main>
        </div>
    );
}
