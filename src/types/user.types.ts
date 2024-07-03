interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  phoneNumber: string;
  isVerified: boolean;
  accessToken: string;
}

export default User;
