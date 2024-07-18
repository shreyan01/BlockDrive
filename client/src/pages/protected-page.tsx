// pages/protected-page.tsx
import ProtectedRoute from '../components/ProtectedRoute';

const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Protected Page</h1>
        <p>This content is protected</p>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedPage;
