import { useState } from "react";
import axios from 'axios'
//For this assignment, successful Login only needs to 
//return a successful acknowledgement to the frontend.

//Receive username and password
//Check required fields
//Search for username
//Was the user found?
//Compare password
//Return success or failure

//When the user submits the form:
//The React frontend must send the credentials to the backend.
//The backend must search MongoDB for the specified username.
//The supplied password must be compared with the stored password.
//If the credentials match, the application must display a successful login message.
//If the credentials do not match, the application must display an appropriate login failure message.

function Login(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event, username, password) => {
    //The React frontend sends the credentials to the backend
    axios.get('http://localhost:9000/getUser', { params: { username, password}})
        .then((res) => {
            if (res.data) {
                //credentials match, the application displays a successful login message
                alert('Login Successful')
            }
            else {
                //if the credentials do not match the application displays an appropriate login failure message
                alert('Wrong Credentials')
            }
        })
        .catch((err) => {
    if (err.response) {
        alert(err.response.data)
    } else {
        //server not running
        alert('Error in Login')
    }
})
}

return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={(event) => {
          handleLogin(event, username, password)
      }}>Login</button>
    </div>
  );
}

export default Login