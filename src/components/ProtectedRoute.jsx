import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // 로그인 성공 시 저장했던 accessToken이 있는지 확인
  const token = localStorage.getItem('accessToken');

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있으면 원래 보여주려던 페이지(home)를 렌더링
  return children;
}

export default ProtectedRoute;
