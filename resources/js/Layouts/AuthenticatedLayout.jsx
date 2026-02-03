import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

const Icons = {
    Sparkles: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
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
                                        <div className="bg-indigo-600 text-white p-2 rounded-lg w-9 h-9 flex items-center justify-center">
                                            {Icons.Sparkles}
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
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                {/* 1. SEMUA USER: Dashboard */}
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLink>

                                {/* 2. KHUSUS ADMIN: Tenaga Medis Saja (Shift dipindah) */}
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

                                {/* 4. KHUSUS KEPALA KLINIK: Jadwal, Shift, Cuti, Regulasi */}
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
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                <div className="text-right mr-2">
                                                    <div className="font-bold">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-xs font-normal text-gray-400 capitalize">
                                                        {role}
                                                    </div>
                                                </div>

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
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
                        " sm:hidden"
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
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
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
