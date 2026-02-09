import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

// --- IKON STETOSKOP (Sama seperti Dashboard) ---
const Icons = {
    Stethoscope: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
        >
            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A6.065 6.065 0 0 1 22.8 8.25a.75.75 0 0 1-1.5 0 4.565 4.565 0 0 0-8.823-.75H12V11a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V7.5h-.224A4.565 4.565 0 0 0 .95 8.25a.75.75 0 0 1-1.5 0 6.065 6.065 0 0 1 10.5-5.445Z" />
            <path
                d="M12 11V7.5H9V11a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1.5h1.5V11a3.5 3.5 0 0 1-7 0V9.5h1.5V11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5Z"
                opacity="0.5"
            />
        </svg>
    ),
};

export default function AuthenticatedLayout({ header, children }) {
    // Ambil data user & role dari props
    const { auth } = usePage().props;
    const user = auth.user;

    // Normalisasi role ke lowercase untuk pengecekan
    const role = user?.jenis_tenaga_medis?.toLowerCase();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="border-b border-gray-100 bg-white shadow-sm sticky top-0 z-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* LOGO */}
                            <div className="flex shrink-0 items-center">
                                <Link href={route("dashboard")}>
                                    <div className="flex items-center gap-3">
                                        {/* Ubah Background Logo jadi TEAL */}
                                        <div className="bg-teal-600 text-white p-2 rounded-lg w-10 h-10 flex items-center justify-center shadow-sm hover:bg-teal-700 transition">
                                            {Icons.Stethoscope}
                                        </div>
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-800 leading-tight hidden md:block">
                                                SIP Klinik
                                            </h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* NAVIGATION LINKS (DESKTOP) */}
                            {/* Pastikan komponen NavLink Anda juga mendukung active color yang sesuai, biasanya defaultnya gray/black */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {/* 1. SEMUA USER: Dashboard */}
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>

                                {/* 2. KHUSUS ADMIN: Tenaga Medis */}
                                {role === "admin" && (
                                    <NavLink
                                        href={route("tenaga-medis.index")}
                                        active={route().current(
                                            "tenaga-medis.*",
                                        )}
                                    >
                                        Tenaga Medis
                                    </NavLink>
                                )}

                                {/* 3. KHUSUS DOKTER: Jadwal & Cuti */}
                                {role === "dokter" && (
                                    <>
                                        <NavLink
                                            href={route("jadwal.index")}
                                            active={route().current("jadwal.*")}
                                        >
                                            Jadwal Saya
                                        </NavLink>
                                        <NavLink
                                            href={route("cuti.create")}
                                            active={route().current(
                                                "cuti.create",
                                            )}
                                        >
                                            Ajukan Cuti
                                        </NavLink>
                                        <NavLink
                                            href={route("cuti.index")}
                                            active={route().current(
                                                "cuti.index",
                                            )}
                                        >
                                            Riwayat Cuti
                                        </NavLink>
                                    </>
                                )}

                                {/* 4. KHUSUS KEPALA KLINIK: Manajemen Lengkap */}
                                {role === "kepala klinik" && (
                                    <>
                                        <NavLink
                                            href={route("jadwal.index")}
                                            active={route().current("jadwal.*")}
                                        >
                                            Jadwal
                                        </NavLink>
                                        <NavLink
                                            href={route("shift.index")}
                                            active={route().current("shift.*")}
                                        >
                                            Kelola Shift
                                        </NavLink>
                                        <NavLink
                                            href={route("cuti.index")}
                                            active={route().current("cuti.*")}
                                        >
                                            Approval Cuti
                                        </NavLink>
                                        <NavLink
                                            href={route("regulasi.show")}
                                            active={route().current(
                                                "regulasi.*",
                                            )}
                                        >
                                            Regulasi
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* USER DROPDOWN (KANAN ATAS) */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white pl-4 pr-2 py-1 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none shadow-sm"
                                            >
                                                <div className="text-right">
                                                    <div className="font-bold text-gray-700">
                                                        {user.name}
                                                    </div>
                                                    {/* Role Badge: Teal Light */}
                                                    <div className="text-[10px] uppercase tracking-wider font-bold text-teal-600">
                                                        {role}
                                                    </div>
                                                </div>

                                                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="text-red-600 hover:bg-red-50"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* HAMBURGER MENU (MOBILE) */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE MENU LIST */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden border-t border-gray-100"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>

                        {/* ADMIN MOBILE */}
                        {role === "admin" && (
                            <ResponsiveNavLink
                                href={route("tenaga-medis.index")}
                                active={route().current("tenaga-medis.*")}
                            >
                                Tenaga Medis
                            </ResponsiveNavLink>
                        )}

                        {/* DOKTER MOBILE */}
                        {role === "dokter" && (
                            <>
                                <ResponsiveNavLink
                                    href={route("jadwal.index")}
                                    active={route().current("jadwal.*")}
                                >
                                    Jadwal Saya
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("cuti.create")}
                                    active={route().current("cuti.create")}
                                >
                                    Ajukan Cuti
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("cuti.index")}
                                    active={route().current("cuti.index")}
                                >
                                    Riwayat Cuti
                                </ResponsiveNavLink>
                            </>
                        )}

                        {/* KEPALA KLINIK MOBILE */}
                        {role === "kepala klinik" && (
                            <>
                                <ResponsiveNavLink
                                    href={route("jadwal.index")}
                                    active={route().current("jadwal.*")}
                                >
                                    Manajemen Jadwal
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("shift.index")}
                                    active={route().current("shift.*")}
                                >
                                    Kelola Shift
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("cuti.index")}
                                    active={route().current("cuti.*")}
                                >
                                    Approval Cuti
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("regulasi.show")}
                                    active={route().current("regulasi.*")}
                                >
                                    Regulasi
                                </ResponsiveNavLink>
                            </>
                        )}
                    </div>

                    {/* MOBILE USER INFO */}
                    <div className="border-t border-gray-200 pb-1 pt-4 bg-gray-50">
                        <div className="px-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-base font-medium text-gray-800">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                                className="text-red-600"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* PAGE HEADER */}
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* PAGE CONTENT */}
            <main>{children}</main>
        </div>
    );
}
