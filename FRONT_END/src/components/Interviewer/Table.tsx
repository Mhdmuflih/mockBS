import React from "react";

interface TableProps {
    columns: { key: string; label: string }[];
    actions?: (row: any) => React.ReactNode;
    data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
    return (
        <div className="bg-[#30323A] ml-1 p-4 shadow-md mt-2 max-h-[80vh] overflow-auto">
            
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
        </div>
    );
};

export default Table;
