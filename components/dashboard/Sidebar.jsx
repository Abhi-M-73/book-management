"use client";

import Link from "next/link";
import { adminMenu, userMenu } from "@/constants/sidebarContent";

export default function Sidebar(role = "user") {
    const menuItems = role === "admin" ? adminMenu : userMenu;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white">
            <div className="flex h-16 items-center border-b px-6">
                <h1 className="text-xl font-bold">
                    Book<span className="text-blue-600">Hub</span>
                </h1>
            </div>

            <nav className="space-y-2 p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Icon size={20} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}