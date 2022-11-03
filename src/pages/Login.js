import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, userSelector, clearState } from '../store/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = ({}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { register, errors, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }
  }, [isError, isSuccess]);

  return (
    <Fragment>
      <div >
        <div >
          <h2 >
            Sign in to your account
          </h2>
        </div>
        <div >
          <div >
            <form
              
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
            >
              <div>
                <label
                  for="username"
                  
                >
                  User-Name
                </label>
                <div >
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    
                    required
                    
                  />
                </div>
              </div>

              <div>
                <label
                  for="password"
                  
                >
                  Password
                </label>
                <div >
                  <input
                    id="password"
                    name="password"
                    type="password"
                    ref={register({ required: true })}
                    autoComplete="current-password"
                    required
                     
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  
                >
                  {isFetching ? (
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Sign in
                </button>
              </div>
            </form>
            <div >
              <div >
                <div >
                  <span >
                    Or <Link to="signup"> Signup</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;