"use client";

import Link from "next/link";
import {
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { adminMenu, userMenu } from "@/constants/sidebarContent";
import Axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ role = "user" }) {
    const [loggingOut, setLoggingOut] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = role === "admin" ? adminMenu : userMenu;

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isOpen) return;
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [isOpen]);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            const res = await Axios.post("/auth/logout");
            if (res?.data?.success) {
                toast.success(res?.data?.message || "Logout successful");
                router.replace("/login");
                router.refresh();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ||
                "Unable to logout. Please try again."
            );
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">
                    Book<span className="text-blue-600">Hub</span>
                </h1>
                <button
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                    aria-controls="dashboard-sidebar"
                    className="inline-flex size-10 items-center justify-center rounded-md text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    {isOpen ? <X size={21} /> : <Menu size={21} />}
                </button>
            </header>

            {isOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
                />
            )}

            <aside
                id="dashboard-sidebar"
                className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-200 md:z-20 md:w-64 md:max-w-none md:translate-x-0 md:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">
                        Book<span className="text-blue-600">Hub</span>
                    </h1>
                </div>

                <nav aria-label="Dashboard navigation" className="flex-1 space-y-1 p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                aria-current={isActive ? "page" : undefined}
                                className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                            >
                                <Icon size={19} strokeWidth={1.9} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-slate-200 p-4">
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <LogOut size={19} />
                        <span>{loggingOut ? "Logging out..." : "Logout"}</span>
                    </button>
                </div>
            </aside>
        </>
    );
}