import { useForm, Link } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        max_jam_harian: "",
        max_jam_mingguan: "",
        max_shift_harian: "",
        keterangan: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("regulasi.store"));
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
            <h1 className="text-xl font-bold mb-6">
                Tambah Regulasi Kesehatan
            </h1>

            <form onSubmit={submit} className="space-y-4">
                <Input
                    label="Max Jam Kerja Harian"
                    type="number"
                    value={data.max_jam_harian}
                    onChange={(e) => setData("max_jam_harian", e.target.value)}
                    error={errors.max_jam_harian}
                />

                <Input
                    label="Max Jam Kerja Mingguan"
                    type="number"
                    value={data.max_jam_mingguan}
                    onChange={(e) =>
                        setData("max_jam_mingguan", e.target.value)
                    }
                    error={errors.max_jam_mingguan}
                />

                <Input
                    label="Max Shift per Hari"
                    type="number"
                    value={data.max_shift_harian}
                    onChange={(e) =>
                        setData("max_shift_harian", e.target.value)
                    }
                    error={errors.max_shift_harian}
                />

                <div>
                    <label className="block text-sm font-medium">
                        Keterangan
                    </label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="3"
                        value={data.keterangan}
                        onChange={(e) => setData("keterangan", e.target.value)}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Simpan
                    </button>

                    <Link
                        href={route("regulasi.index")}
                        className="px-4 py-2 border rounded"
                    >
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}

function Input({ label, error, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium">{label}</label>
            <input {...props} className="w-full border rounded px-3 py-2" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
