import React from "react";

interface TableProps {
    columns: { key: string; label: string }[];
    data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
    return (
        // <div className="bg-[#30323A] ml-1 p-3 rounded-b-lg shadow-md ">

            <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 max-h-[80vh] overflow-auto">

                {/* Table Header */}
                <div className={`grid grid-cols-${columns.length}  bg-[#4B4F60] text-white p-2 rounded-md`}>
                    {columns.map((col) => (
                        <div key={col.key} className="text-sm font-medium">
                            {col.label}
                        </div>
                    ))}
                </div>

                {/* Table Body */}
                <div className="mt-4 space-y-3">
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-8 bg-black text-gray-300 p-2 rounded-md hover:bg-[#60646F]"
                            >
                                {columns.map((col) => (
                                    <div key={col.key} className="text-sm">
                                        {row[col.key] || "N/A"}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-white text-center">No data available</div>
                    )}
                </div>

            </div>

            
        // </div>
    );
};

export default Table;
