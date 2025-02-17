import Button from "./Button.jsx";

import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Phonebook() {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        // Get phonebook records
        async function fetchRecords() {
            try {
                const response = await axios.get("http://localhost:3000/api/phonebook", {
                    withCredentials: true
                });
                return response.data;
            } catch (e) {
                alert("Failed to load phonebook. Refresh the page to try again!");
            }
        }
        fetchRecords().then((data) => setRecords(data));
    }, []);

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
                    <tr className="border" key={record.studentID}>
                        <td className="p-2">{record.studentID}</td>
                        <td className="p-2 text-nowrap">{record.fullName}</td>
                        <td className="p-2 text-nowrap">{record.phoneNumber}</td>
                        <td className="p-2">{record.major}</td>
                        <td className="p-2 text-pretty">{record.description}</td>
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