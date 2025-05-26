import { useAuth } from "@/context/AuthContext";

const ProfilePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p><strong>Username:</strong> {currentUser?.username}</p>
      <p><strong>Email:</strong> {currentUser?.email}</p>
      <p><strong>Role:</strong> {currentUser?.role}</p>

      {currentUser?.role === "administrator" && (
        <p className="mt-4 text-blue-500">Welcome, Admin! You have access to admin features.</p>
      )}
    </div>
  );
};

export default ProfilePage;
