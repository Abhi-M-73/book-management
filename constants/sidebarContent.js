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
        href: "/user",
        icon: LayoutDashboard,
    },
    {
        label: "My Books",
        href: "/user/my-books",
        icon: BookOpen,
    },
    {
        label: "Borrowed Books",
        href: "/user/borrowed-books",
        icon: BookMarked,
    },
    {
        label: "Profile",
        href: "/user/profile",
        icon: User,
    },
];

export const adminMenu = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Books",
        href: "/admin/books",
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
