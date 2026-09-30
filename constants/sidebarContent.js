import {
    LayoutDashboard,
    BookOpen,
    BookMarked,
    Users,
    User,
} from "lucide-react";

export const userMenu = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Books",
        href: "/dashboard/my-books",
        icon: BookOpen,
    },
    {
        label: "Borrowed Books",
        href: "/dashboard/borrowed-books",
        icon: BookMarked,
    },
    {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export const adminMenu = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Books",
        href: "/dashboard/books",
        icon: BookOpen,
    },
    //   {
    //     label: "Users",
    //     href: "/dashboard/users",
    //     icon: Users,
    //   },
    //   {
    //     label: "Profile",
    //     href: "/dashboard/profile",
    //     icon: User,
    //   },
];
