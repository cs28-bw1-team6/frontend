import React, { useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const LoginForm = (props) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        axiosWithAuth().post('/login/', credentials)
            .then(res => {
                localStorage.setItem('token', res.data.key);
                props.history.push('/start')
            })
            .catch(err => {setIsLoading(false); console.log(err.response)})
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            {isLoading && <div>Hang tight...</div>}
            <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
            <button type="submit">Log in</button>
        </form>
    )
}

export default LoginForm;