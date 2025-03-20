import { Pagination } from "@mui/material";
import React from "react";

interface TableProps {
    columns: { key: string; label: string }[];
    actions?: (row: any) => React.ReactNode;
    data: any[];
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    totalPages?: number
    currentPage?: number
    handleChange?: any
}

const Table: React.FC<TableProps> = ({ columns, searchQuery, setSearchQuery, data, actions, totalPages, currentPage, handleChange }) => {
    return (
        <div className="bg-[#30323A] ml-1 p-2 shadow-md max-h-[80vh] overflow-auto">

            {/* Search Bar */}
            <div className="mb-1 flex justify-end">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded-md bg-black text-white w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)} // Ensure setSearchQuery is used
                />

            </div>

            {/* Table Header */}
            <div
                className="bg-[#4B4F60] text-white p-2 rounded-md font-semibold"
                style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length + (actions ? 1 : 0)}, minmax(0, 1fr))` }}
            >
                {columns.map((col) => (
                    <div key={col.key} className="text-sm font-medium text-center">
                        {col.label}
                    </div>
                ))}
                {actions && <div className="text-center">Actions</div>}
            </div>

            {/* Table Body */}
            <div className="mt-4 space-y-3">
                {data.length > 0 ? (
                    data.map((row, index) => (
                        <div
                            key={index}
                            className="bg-black text-gray-300 p-2 rounded-md hover:bg-[#60646F]"
                            style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length + (actions ? 1 : 0)}, minmax(0, 1fr))` }}
                        >
                            {columns.map((col) => (
                                <div key={col.key} className="text-sm text-center">
                                    {row[col.key] || "N/A"}
                                </div>
                            ))}
                            {actions && <div className="text-center">{actions(row)}</div>}
                        </div>
                    ))
                ) : (
                    <div className="text-white text-center p-3">No data available</div>
                )}
            </div>


            {/* pagination */}
            <div className="flex justify-center items-center mt-4 pb-2">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#FFCC00",  // Text color
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: "#FFCC00", // Selected page background color
                            color: "#000",  // Selected page text color
                        },
                        "& .MuiPaginationItem-root:hover": {
                            backgroundColor: "#FFD633", // Lighter yellow on hover
                            color: "#000"
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Table;
