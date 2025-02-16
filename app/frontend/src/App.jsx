import LoginForm from './components/LoginForm.jsx';
import Phonebook from './components/Phonebook.jsx';

import { useState } from "react";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Logs the user in if the credentials are valid
    function login(e) {
        e.preventDefault();
        setIsLoggedIn(true);
    }

    return (
        <main className="w-screen h-screen grid place-items-center bg-background font-electrolize text-lg">
            <div className="w-[55vw]">
                <h1 className="text-2xl mb-2 font-extrabold">WPI Phonebook</h1>
                <p className="mb-2 text-md leading-[normal]">WPI phonebook is a directory of phone numbers for WPI students. Unlike traditional phonebooks, the directory automatically generates a playful description of each student based on their major. <span className="font-bold"> Only common majors, such as BME, CS, DS, ME, and RBE are supported.</span> These descriptions are meant to keep the project lighthearted and fun.</p>
                <hr className="border-[#999999] mb-2"/>
                { isLoggedIn ? <Phonebook/> : <LoginForm submitHandler={login}/> }
            </div>
        </main>
    )
}

export default App
