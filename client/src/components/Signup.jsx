import { useState } from "react";
import axios from 'axios'
		
function Signup() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const handleSignUp = (event, firstName, lastName, username, password) => {
    axios.post('http://localhost:9000/createUser', { firstName, lastName, username, password })
        .then((res) => setMessage(res.data.message))
        .catch((err) => setMessage(err.response?.data?.message || 'Error in Signing Up'))
};

//The React frontend sends the entered information to the backend.
async function handleSubmit(event) {
    event.preventDefault();
    //Send Data to the Backend
    try{
    const response = await fetch(
    "<http://localhost:9000/createUser>",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // data to send
            firstName,
            lastName,
            username,
            password,
        })
    
    });

const data = await response.json();

if (response.ok) {
    // success
    setMessage(data.message);
} else {
    // server returned an error
    setMessage(data.message);
}
} catch(error){ //React cannot reach the server

    setMessage("Could not connect to the server");
}
}
  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="button" onClick={(event) => handleSignUp(event, firstName, lastName, username, password)}>
        Signup
      </button>
      {message && <p>{message}</p>}
    </div>
  ); 
}

export default Signup