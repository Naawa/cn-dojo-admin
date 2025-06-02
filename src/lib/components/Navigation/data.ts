export interface NavItem {
    url: string,
    text: string,
    icon: string
}

export const navItems: NavItem[] = [
    {
        url: "/dashboard",
        text: "Overview",
        icon: "/svgs/home.svg"
    },
    {
        url: "/dashboard/attendance",
        text: "Attendance",
        icon: "/svgs/attendance.svg"
    },
    {
        url: "/dashboard/shop",
        text: "Shop",
        icon: "/svgs/shop.svg"
    },
    {
        url: "/dashboard/students",
        text: "Students",
        icon: "/svgs/students.svg"
    },



]