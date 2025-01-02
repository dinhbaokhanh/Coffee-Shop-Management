import Sidebar from "../Layout/Sidebar/Sidebar.js";
import styles from "./General.module.css";

export default function General() {
    return (
        <div className={styles.generalContainer}>
            <Sidebar />
            <div className={styles.content}>
                <h1>Coffee Management System</h1>
            </div>
        </div>
    );
}
