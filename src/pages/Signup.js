import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const history = useNavigate();

    const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        userSelector
    );
    const onSubmit = (data) => {
        dispatch(signupUser(data));
    };

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            history.push('/');
        }

        if (isError) {
            toast.error(errorMessage);
            dispatch(clearState());
        }
    }, [isSuccess, isError]);

    return (
        <Fragment>
            <div >
                <div >
                    <h2 >
                        Sign Up to your account
          </h2>
                </div>
                <div >
                    <div >
                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                            method="POST"
                        >
                            <div>
                                <label
                                    for="name"

                                >
                                    Name
                </label>
                                <div >
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        ref={register({ required: true })}
                                        autocomplete="name"
                                        required

                                    />
                                </div>
                            </div>
                            <div>
                                {/* <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label> */}
                                {/* <div >
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autocomplete="email"
                                        required
                                        ref={register({
                                            pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                        })}

                                    />
                                </div> */}
                            </div>

                            <div>
                                <label
                                    for="password"

                                >
                                    Password
                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        ref={register({ required: true })}
                                        autocomplete="current-password"
                                        required

                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"

                                >
                                    {isFetching ? (
                                        <Fragment>
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

                                            <p>Signing up</p>
                                        </Fragment>
                                    ) : (
                                            <p> Sign up</p>
                                        )}
                                </button>
                            </div>
                        </form>
                        <div >
                            <div >
                                <div >
                                    <span >
                                        Or <Link to="login"> Login</Link>
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

export default Signup;