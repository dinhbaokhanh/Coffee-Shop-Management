"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (isDesktop) {
            setIsOpen(false); 
        }
    }, [isDesktop]);

    if (status === "loading" || !session) {
        return null;
    }

    if (session.user.role !== "manager") {
        return null;
    }

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {!isDesktop && (
                <button
                    className={styles.toggleButton}
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
            )}

            <div className={`${styles.sidebar} ${isOpen || isDesktop ? styles.open : ""}`}>
                <div className={styles.logo}>
                    <span className={styles.logoName}>Coffee Shop</span>
                </div>
                <div className={styles.sidebarContent}>
                    <ul className={styles.list}>
                        <li className={styles.navLink}>
                            <Link href="/menu" className={styles.link}>
                                Menu
                            </Link>
                        </li>
                        <li className={styles.navLink}>
                            <Link href="/staffs" className={styles.link}>
                                Staff Management
                            </Link>
                        </li>
                        <li className={styles.navLink}>
                            <Link href="/stock" className={styles.link}>
                                Stock Management
                            </Link>
                        </li>
                        <li className={styles.navLink}>
                            <Link href="/budget" className={styles.link}>
                                Budget
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {!isDesktop && (
                <div
                    className={`${styles.overlay} ${isOpen ? styles.visible : ""}`}
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;

