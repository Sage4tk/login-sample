import React, { useState } from "react";

//import css
import "./formStyle.scss";

//import images/icons
import user from "../../img/person.svg";


interface SignupProps {
    setToaster: React.Dispatch<React.SetStateAction<any>>
}

const Signup:React.FC<SignupProps> = ({ setToaster }) => {
    //change mode to login or register
    const [mode, setMode] = useState<boolean>(true);

    //form handler and listener
    const [formHandler, setFormHandler] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const formListener = (e:any) => {
        setFormHandler({
            ...formHandler,
            [e.target.name]: e.target.value
        });
    }

    //submit to server
    const submitToServer = async (e:any) => {
        e.preventDefault();

        //check if passwords match if in register mode
        if (!mode && (formHandler.password !== formHandler.confirmPassword)) {
            setToaster({
                Message: "Password doesn't match",
                Status: 400
            });

            //return out to make sure it doesn't get to the server
            return;
        }

        //validate input then post
        if (!/^\s*$/.test(formHandler.email) && !/^\s*$/.test(formHandler.password) ) {
            //fetch post to server
            const res = await fetch(mode ? "http://localhost/auth.php":"http://localhost/signup.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: formHandler.email,
                password: formHandler.password
            })
        });
        
        const data = await res.json();

        //set toaster to display data
        setToaster(data);

        //move user to sign in component if register is successful
        if(!mode && (data?.Status === 201))
            setMode(true);
        }
    }

    return (
        <>
        <form onSubmit={submitToServer} className="form-login">
            <div className="icon">
                <img src={user} alt="user icon" />
            </div>
            <h1>{mode ? "Login":"Signup"}</h1>
            <div className="form-ctrl">
                <input type="email" name="email" value={formHandler.email} onChange={formListener} placeholder="Email" />
            </div>
            <div className="form-ctrl">
                <input type="password" name="password" value={formHandler.password} onChange={formListener} placeholder="Password" />
            </div>
            
            {!mode && <div className="form-ctrl">
                <input type="password" name="confirmPassword" value={formHandler.confirmPassword} onChange={formListener} placeholder="Confirm password" />
            </div>}
            <div className="btn" >
                <input type="submit" value={mode ? "Login":"Signup"} />
                {mode ? <p>Need an account? <span onClick={() => {setMode(!mode)}}>Sign up here.</span></p>:<p>Have an account? <span onClick={() => {setMode(!mode)}}>Login here.</span></p>}
            </div>
        </form>
        </>
    );
}

export default Signup;