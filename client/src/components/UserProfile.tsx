// components/UserProfile.tsx
import { useUser } from '../context/UserContext';

const UserProfile = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
