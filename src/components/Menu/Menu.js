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
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: "",
        status: "Còn hàng",
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.category || !newProduct.price) {
            alert("Please fill in all fields");
            return;
        }
        addProduct(newProduct); 
        setNewProduct({
            name: "",
            category: "",
            price: "",
            status: "Còn hàng",
        });
    };

    return (
        <div className={styles.menuContainer}>
            <Sidebar />
            <div className={styles.menuContent}>
                <h1 className={styles.menuTitle}>Menu</h1>

                <div className={styles.inputContent}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search..."
                        className={styles.searchInput}
                    />

                    <button 
                        className={styles.addMenuBtn} 
                        onClick={() => setIsFormVisible(true)}
                    >
                        Add
                    </button>
                </div>

                {isFormVisible && (
                    <div className={styles.overlay}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddProduct(newProduct);
                            }}
                            className={styles.addFormContainer}
                        >
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                Category:
                                <select
                                    value={newProduct.category}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            category: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">-- Select Category --</option>
                                    <option value="Đồ ăn vặt">Đồ ăn vặt</option>
                                    <option value="Đồ uống">Đồ uống</option>
                                </select>
                            </label>
                            <label>
                                Price:
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            price: e.target.value,
                                        })
                                    }
                                />
                            </label>
                            <label>
                                Status:
                                <select
                                    value={newProduct.status}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option value="Còn hàng">Còn hàng</option>
                                    <option value="Hết hàng">Hết hàng</option>
                                </select>
                            </label>

                            <button type="submit">Add Product</button>
                            <button
                                type="button"
                                onClick={() => setIsFormVisible(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                )}


                <table className={styles.menuTable}>
                    <thead>
                        <tr>
                            <th className={styles.th} onClick={() => handleSort('name')}>
                                Product Name {sortBy.column === 'name' && (sortBy.order === 'asc' ? '🔼' : '🔽')}
                            </th>
                            <th className={styles.th} onClick={() => handleSort('category')}>
                                Category {sortBy.column === 'category' && (sortBy.order === 'asc' ? '🔼' : '🔽')}
                            </th>
                            <th className={styles.th} onClick={() => handleSort('price')}>
                                Price {sortBy.column === 'price' && (sortBy.order === 'asc' ? '🔼' : '🔽')}
                            </th>
                            <th className={styles.th} onClick={() => handleSort('status')}>
                                Status {sortBy.column === 'status' && (sortBy.order === 'asc' ? '🔼' : '🔽')}
                            </th>
                            <th className={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageProducts.map((product) => (
                            <tr key={product.id}>
                                <td className={styles.td}>{product.name}</td>
                                <td className={styles.td}>{product.category}</td>
                                <td className={styles.td}>{product.price.toLocaleString()} đ</td>
                                <td className={product.status === "Còn hàng" ? styles.inStock : styles.outOfStock}>
                                    {product.status}
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
  