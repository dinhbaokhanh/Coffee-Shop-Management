"use client"

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Sidebar from "../Layout/Sidebar/Sidebar.js";
import { useState } from "react";
import products from "../../data/menu.js";
import styles from "./Menu.module.css"

export default function Menu() {

    const [searchInput, setSearchInput] = useState('');
    const [sortBy, setSortBy] = useState({column: 'name', order: 'asc'});
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const filteredProducts = products.filter(
        product => product.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (a[sortBy.column] < b[sortBy.column]) return sortBy.order === 'asc' ? -1 : 1;
        if (a[sortBy.column] > b[sortBy.column]) return sortBy.order === 'asc' ? 1 : -1;
        return 0;
    });

    const pageProducts = sortedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const handleSort = (column) => {
        setSortBy(prevState => {
            const newOrder = prevState.order === 'asc' ? 'desc' : 'asc';
            return { column, order: newOrder };
        });
    };

    return (
        <div className={styles.menuContainer}>
            <Sidebar />
            <div className={styles.menuContent}>
                <h1 className={styles.menuTitle}>Menu</h1>

                <div style={{ marginBottom: "10px" }}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search..."
                        className={styles.searchInput}
                    />
                </div>

                <table className={styles.menuTable}>
                    <thead>
                        <tr>
                            <th className={styles.th} onClick={() => handleSort('name')}>Product Name {sortBy.column === 'name' && (sortBy.order === 'asc' ? '🔼' : '🔽')}</th>
                            <th className={styles.th} onClick={() => handleSort('category')}>Category {sortBy.column === 'category' && (sortBy.order === 'asc' ? '🔼' : '🔽')}</th>
                            <th className={styles.th} onClick={() => handleSort('price')}>Price {sortBy.column === 'price' && (sortBy.order === 'asc' ? '🔼' : '🔽')}</th>
                            <th className={styles.th} onClick={() => handleSort('stock')}>Stock {sortBy.column === 'stock' && (sortBy.order === 'asc' ? '🔼' : '🔽')}</th>
                            <th className={styles.th} onClick={() => handleSort('status')}>Status {sortBy.column === 'status' && (sortBy.order === 'asc' ? '🔼' : '🔽')}</th>
                            <th className={styles.th}>Ingredients</th> {/* Cột Ingredients */}
                            <th className={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageProducts.map((product) => (
                            <tr key={product.id}>
                                <td className={styles.td}>{product.name}</td>
                                <td className={styles.td}>{product.category}</td>
                                <td className={styles.td}>{product.price.toLocaleString()} đ</td>
                                <td className={styles.td}>{product.stock}</td>
                                <td className={product.status === "Còn hàng" ? styles.inStock : styles.outOfStock}>
                                    {product.status}
                                </td>
                                <td className={styles.td}>
                                    <ul className={styles.ingredientsList}>
                                        {product.ingredients.map((ingredient, index) => (
                                            <li key={index}>
                                                {ingredient.name}: {ingredient.amount}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className={styles.td}>
                                    <button className={styles.editIcon}>
                                        <FaEdit />
                                    </button>
                                    <button className={styles.deleteIcon}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.pagination}>
                    <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>{"<<"}</button>
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0}>{"<"}</button>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>{">"}</button>
                    <button onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage === totalPages - 1}>{">>"}</button>
                    <span>Page {currentPage + 1} / {totalPages}</span>
                </div>
            </div>
        </div>
    );
}
  