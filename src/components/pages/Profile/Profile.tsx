import { IUser } from 'types';
import { useAppSelector } from 'store';
import PrivateProfile from './PrivateProfile';
import PublicProfile from './PublicProfile';

interface IProps {
  user?: IUser;
}
const Profile: React.FC<IProps> = ({ user }) => {
  const authUser = useAppSelector(state => state.auth.user);

  return (
    <>
      {authUser ? (
        <PrivateProfile user={user} />
      ) : (
        <PublicProfile user={user} />
      )}
    </>
  );
};

export default Profile;