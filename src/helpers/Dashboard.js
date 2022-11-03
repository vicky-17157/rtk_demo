import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from '../store/userSlice';
import * as Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const history = useNavigate();

  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
  }, []);

  const { username, password } = useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem('token');

    history.push('/login');
  };

  return (
    <div >
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <div >
            Welcome back <h3>{username}</h3>
          </div>

          <button
            onClick={onLogOut}
            
          >
            Log Out
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;