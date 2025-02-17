import Button from "./Button.jsx";
import TableInput from "./TableInput.jsx";
import TableSelect from "./TableSelect.jsx";

import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";

export default function Phonebook() {
    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editableRecord, setEditableRecord] = useState({});

    useEffect(() => {
        // Fetches phonebook records
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

    // Adds a record to the phonebook
    async function addRecord(e) {
        e.preventDefault();

        // Retrieve form data
        const formData = new FormData(e.target);

        // Convert FormData to JS object
        const body = Object.fromEntries(formData.entries());

        try {
            // Make HTTP request to server
            const response = await axios.post("http://localhost:3000/api/phonebook", body, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            setRecords([...records, response.data]);
            setShowForm(false);
        } catch (e) {
            alert("Failed to add record. Please try again!");
        }
    }

    // Updates a record from the phonebook
    async function updateRecord(e) {
        console.log("updating...");
        e.preventDefault();

        // Retrieve form data
        const formData = new FormData(e.target);

        // Convert FormData to JS object
        const body = Object.fromEntries(formData.entries());

        try {
            // Updates record on server
            const response = await axios.put(
                "http://localhost:3000/api/phonebook",
                body,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            const updatedRecord = response.data;

            // Update records collection on client
            setRecords(records.map(record => {
                if (record.studentID === updatedRecord.studentID) return updatedRecord;
                else return record;
            }));
            setEditableRecord("");
        } catch (e) {
            console.log(e);
            alert("Failed to update record. Please try again!");
        }
    }

    // Deletes a record from the phonebook
    async function deleteRecord(recordToDelete)  {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/phonebook/${recordToDelete.studentID}`,
                { withCredentials: true }
            );
            setRecords(records.filter(record => record.studentID !== recordToDelete.studentID));
        } catch (e) {
            alert("Failed to delete record. Please try again!");
        }
    }


    return (
        <>
            {showForm && <form id="add-record-form" onSubmit={addRecord}/>}
            {editableRecord.studentID && <form id="edit-record-form" onSubmit={updateRecord}/>}
            <table className="table-fixed border border-solid border-separate border-[#A8A8A8] rounded-sm shadow-lg w-full text-left">
                <thead className="bg-[#e6e6e6]">
                <tr>
                    <th className="p-2 w-[14%]">ID</th>
                    <th className="p-2 w-[14%]">Full Name</th>
                    <th className="p-2 w-[15%]">Phone Number</th>
                    <th className="p-2 w-[25%]">Major</th>
                    <th className="p-2 w-[25%]">Description</th>
                    <th className="p-2 w-[8%]">Actions</th>
                </tr>
                </thead>
                <tbody>
                {records.map((record) => {
                    console.log(record.studentID === editableRecord.studentID);
                    if (record.studentID === editableRecord.studentID) {
                        return (
                            <tr className="border" key={record.studentID}>
                                <td className="p-1 text-nowrap"><TableInput type="text" name="studentID" form="edit-record-form" defaultValue={record.studentID}/></td>
                                <td className="p-1 text-pretty"><TableInput type="text" name="fullName" form="edit-record-form" defaultValue={record.fullName}/></td>
                                <td className="p-1 text-pretty"><TableInput type="text" name="phoneNumber" form="edit-record-form" defaultValue={record.phoneNumber}/></td>
                                <td className="p-1 text-pretty"><TableSelect form="edit-record-form"/></td>
                                <td className="p-1 text-pretty"><TableInput type="text" placeholder="We'll update this one c:" name="description" disabled={true}/></td>
                                <td className="text-center">
                                    <div className="inline mx-1">
                                        <button className="size-fit cursor-pointer" type="submit" form="edit-record-form">
                                            <FaRegSave/>
                                        </button>
                                    </div>
                                    <div className="inline mx-1">
                                        <Button variant="icon" clickHandler={() => setEditableRecord({})}>
                                            <MdCancel/>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    }
                    else {
                        return (
                            <tr className="border" key={record.studentID}>
                                <td className="p-2 text-nowrap">{record.studentID}</td>
                                <td className="p-2 text-pretty">{record.fullName}</td>
                                <td className="p-2 text-pretty">{record.phoneNumber}</td>
                                <td className="p-2 text-pretty">{record.major}</td>
                                <td className="p-2 text-pretty">{record.description}</td>
                                <td className="text-center">
                                    <div className="inline mx-1">
                                        <Button variant="icon" type="button" clickHandler={() => setEditableRecord(record)}>
                                            <FaRegEdit/>
                                        </Button>
                                    </div>
                                    <div className="inline mx-1">
                                        <Button variant="icon" clickHandler={() => deleteRecord(record)}>
                                            <MdDelete/>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    }
                })}
                {showForm &&
                    <tr className="border">
                        <td className="text"><TableInput type="text" placeholder="123456789" name="studentID" form="add-record-form"/></td>
                        <td className="text-nowrap"><TableInput type="text" placeholder="John Doe" name="fullName" form="add-record-form"/></td>
                        <td className="text-nowrap"><TableInput type="text" placeholder="123-456-7891" name="phoneNumber" form="add-record-form"/></td>
                        <td className="text-nowrap"><TableSelect form="add-record-form"/></td>
                        <td className="text-pretty"><TableInput type="text" placeholder="We'll write this c:" disabled={true}/></td>
                        <td className="text-center">
                            <div className="inline mx-1">
                                <Button variant="icon" type="submit" form="add-record-form">
                                    <FaRegSave/>
                                </Button>
                            </div>
                            <div className="inline mx-1">
                                <Button variant="icon" clickHandler={() => setShowForm(false)}>
                                    <MdCancel/>
                                </Button>
                            </div>
                        </td>
                    </tr>
                }
                </tbody>
            </table>
            <div className="mt-2">
                <Button type="button" variant="text" clickHandler={() => setShowForm(true)}>Add New Entry</Button>
            </div>
        </>
    );
}