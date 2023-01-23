import { useAppSelector } from 'store';
import PrivateSaved from './PrivateSaved';
import PublicSaved from './PublicSaved';

const Saved = () => {
  const authUser = useAppSelector(state => state.auth.user);

  return <>{authUser ? <PrivateSaved /> : <PublicSaved />}</>;
};

export default Saved;
