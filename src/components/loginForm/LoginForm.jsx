import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API } from '../../shared/services/api';
import { useContext } from 'react';
import { JwtContext } from '../../shared/context/JWTContext';

const Loginform = () => {
    let navigate = useNavigate();
    const {setJwt} = useContext(JwtContext);
    const { register, handleSubmit } = useForm();

    const onSubmit = (formData) => {
        API.post('users/login', formData).then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data);
            setJwt(response.data);
            navigate('/home');
        })
    }
    return (
        <div className='pages'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className='pages__element'>Email</label>
                <input className='pages__element' type='text' name='email' {...register('email', {required: true, pattern: /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
                <label className='pages__element'>Password</label>
                <input className='pages__element' type='password' name='password' {...register('password' , {required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/})} />
                <button>Login</button>
            </form>
        </div>
    );
}

export default Loginform;
