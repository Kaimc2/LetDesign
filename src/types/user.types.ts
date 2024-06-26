interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role: string;
  phoneNumber: string;
  accessToken: string;
}

export default User;
