import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/use-auth";
import { Redirect } from "react-router";

const LoginWindow = () => {
  const [isActive, setIsActive] = useState('login');
  const auth = useAuth();

  const handleSwitch = () => {
    if (isActive === 'login') {
      setIsActive('signUp');
    }
    else {
      setIsActive('login');
    }
  };
  return (
    <>
      {auth.user && <Redirect to='/dashboard' />}
      {isActive === "login" && <Login />}
      {isActive === "signUp" && <SignUp />}
      <button onClick={() => handleSwitch()}>
        {isActive === 'login' ? 'switch to sign up' : 'switch to login '}
      </button>
    </>
  );
}

const Login = () => {
  const { handleSubmit, register, errors} = useForm();
  const auth = useAuth();
  const onSubmit = (data) => {
    auth.login(data.username, data.password);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Login</h5>

        <label>
          Username:
          <input
            name="username"
            type="text"
            ref={register({ required: true, maxLength: 30 })}
          />
        </label><br />
        {errors.username && errors.username.type === "required" && (
          <span>· Username is required</span>
        )}
        {errors.username && errors.username.type === "maxLength" && (
          <span>· Username is over 30 letters</span>
        )}
        {auth.error && auth.error.status === 400 &&
          <span>{`· ${auth.error.data}`}</span>
        }
        <br />
        <br />

        <label>
          Password:
          <input
            name="password"
            type="password"
            ref={register({ required: true })}
          />
        </label>
        <br />
        {errors.password && errors.password.type === "required" && (
          <span>· Password is required.</span>
        )}
        {auth.error && auth.error.status === 403 &&
          <span>{`· ${auth.error.data}`}</span>
        }

        <br />
        <br />
        <button>Login</button>
      </form>
      <p>Doesn't have an account yet?</p>
    </>
  );
}

const SignUp = () => {
  const { handleSubmit, register, errors, watch } = useForm();
  const auth = useAuth();
  const onSubmit = (data) => {
    auth.signUp(data.username1, data.password1, data.gender);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Sign up</h5>

        <label>
          Username:
          <input
            name="username1"
            type="text"
            ref={register({ required: true, maxLength: 30 })}
          />
        </label>
        <br />
        {errors.username && errors.username.type === "required" && (
          <span>· Name is required</span>
        )}
        {auth.error && auth.error.status === 400 &&
          <span>{`· ${auth.error.data}`}</span>
        }
        <br />

        <label>
          Password:
          <input
            name="password1"
            type="password"
            ref={register({ required: true, minLength: 10 })}
          />
        </label>
        <br />
        {errors.password1 && errors.password1.type === "required" && (
          <span>· Password is required!</span>
        )}
        {errors.password1 && errors.password1.type === "minLength" && (
          <span>· Password is too short!</span>
        )}
        <br />

        <label>
          Re-enter:
          <input
            name="password2"
            type="password"
            ref={register({ required: true,
              validate: (value) => {
                return value === watch('password1'); // value is from password2 and watch will return value from password1
              }})}
          />
        </label>
        <br />
        {errors.password2 && errors.password2.type === "required" && (
          <span>· Please re-enter your password.</span>
        )}
        {errors.password2 && errors.password2.type === "validate" && (
          <span>· Password doesn't match.</span>
        )}
        <br />

        <label>
          Gender:
          <select name="gender" ref={register({ required: true })}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        {errors.gender && errors.gender.type === "required" && (
          <span>· Gender is required</span>
        )}
        <br />
        <button>Sign up</button>
      </form>
      <p>Already has an account?</p>
    </>
  );
}

export default LoginWindow;
