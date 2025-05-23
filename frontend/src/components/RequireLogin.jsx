import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const RequireLogin = ({ children }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  if (user) return children;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={() => navigate('/')} // 모달 바깥 클릭 시 홈으로 이동
    >
      <div
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 중단
      >
        <Login />
      </div>
    </div>
  );
};

export default RequireLogin;
