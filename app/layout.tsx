import "./globals.css";
import {poppins} from "@/app/ui/fonts";
import Navbar from "@/app/ui/Navbar";
import React from "react";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${poppins.className} antialiased`}>
        <Navbar/>
        {children}
        </body>
        </html>
    );
}
