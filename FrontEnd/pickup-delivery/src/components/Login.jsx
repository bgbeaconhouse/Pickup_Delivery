import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = ({setToken}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            const result = await response.json()
            
            setToken(result);
            localStorage.setItem("token", result);
            
            
                navigate("/home")
               
        } catch (error) {
            console.error(error)
        }
        setEmail('')
        setPassword('')
    }

    return ( 
        <>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <label className="formLabelSize">
                <br />
                Email:
                <br /><br /><input
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                }} />
            </label>
            <br /> <br />
            <label className="formLabelSize">
                Password:
                <br /><br />
                <input
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                }} />
            </label>
            <br /><br />
            <button className="formButton" type="submit">Log In</button>
            
        </form>


        </>
     );
}
 
export default Login;