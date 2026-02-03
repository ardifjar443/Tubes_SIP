import AppLayout from "@/Layouts/AppLayout";
import JadwalTable from "@/Components/JadwalTable";

export default function Saya({ jadwal }) {
    return (
        <AppLayout>
            <h1 className="text-2xl font-bold mb-4">Jadwal Saya</h1>

            <JadwalTable jadwal={jadwal} showDokter={false} />
        </AppLayout>
    );
}
