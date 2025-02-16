import Button from "./Button.jsx";

import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Phonebook() {
    const [records, setRecords] = useState([{
        id: 252935546,
        fullName: "Andy Truong",
        phoneNumber: "774-578-8319",
        major: "Computer Science",
        description: "Coding their way to unemployment"
    }, {
        id: 252935546,
        fullName: "Helena Young",
        phoneNumber: "133-323-2323",
        major: "Mechanical Engineering",
        description: "Mechanic without the hands on work"
    }]);

    return (
        <>
            <table className="border border-solid border-separate border-[#A8A8A8] rounded-sm shadow-lg w-full text-left text-lg">
                <thead className="bg-[#e6e6e6]">
                <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Full Name</th>
                    <th className="p-2">Phone Number</th>
                    <th className="p-2">Major</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {records.map((record) =>
                    <tr className="border" key={record.id}>
                        <td className="p-2">{record.id}</td>
                        <td className="p-2">{record.fullName}</td>
                        <td className="p-2">{record.phoneNumber}</td>
                        <td className="p-2">{record.major}</td>
                        <td className="p-2">{record.description}</td>
                        <td className="text-center">
                            <div className="inline mx-1">
                                <Button type="button" variant="icon">
                                    <FaRegEdit/>
                                </Button>
                            </div>
                            <div className="inline mx-1">
                                <Button type="button" variant="icon">
                                    <MdDelete/>
                                </Button>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="mt-2">
                <Button type="button" variant="text">Add New Entry</Button>
            </div>
        </>
    );
}