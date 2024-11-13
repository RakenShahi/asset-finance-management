import { Navigate } from 'react-router-dom';

// ProtectedRoute component: Ensures only authenticated users can access certain routes.
// If a token is found in localStorage, it renders the child components (protected content).
// Otherwise, it redirects the user to the login page.
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  }

export default ProtectedRoute;
