import { Pagination } from "@mui/material";
import React from "react";

interface TableProps {
    columns: { key: string; label: string }[];
    data: any[];
    actions?: (row: any) => React.ReactNode;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    totalPages?:any
    currentPage?:any
    handleChange?:any
}

const Table: React.FC<TableProps> = ({ columns, data, actions, searchQuery, setSearchQuery, totalPages, currentPage, handleChange }) => {
    return (
        <div className="bg-[#30323A] ml-1 p-2 shadow-md mt-2 max-h-[80vh] overflow-auto">

            {/* Search Bar */}
            <div className="mb-1 flex justify-end">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 rounded-md bg-black text-white w-64"
                    value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {/* Table Header */}
            <div className={`grid grid-cols-${columns.length} gap-4 bg-black text-white p-3 rounded-md`}>
                {columns.map((col) => (
                    <div key={col.key} className="text-sm font-thin">
                        {col.label}
                    </div>
                ))}
            </div>

            {/* Table Body */}
            <div className="mt-1 space-y-2">
                {data.length > 0 ? (
                    data.map((row, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 gap-4 bg-black text-gray-300 p-2 rounded-md"
                        >
                            {columns.map((col) => (
                                <div key={col.key} className="text-sm ">
                                    {row[col.key] || "N/A"}
                                </div>
                            ))}
                            {actions && <div>{actions(row)}</div>}
                        </div>
                    ))
                ) : (
                    <div className="text-white text-center">No data available</div>
                )}
            </div>
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
