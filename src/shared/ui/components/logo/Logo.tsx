import { Link } from 'react-router-dom';
import { Img } from 'shared/ui/index';
import './Logo.scss';

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link to="/" className="Logo">
      <Img name="uefa-logo" className={className} />
    </Link>
  );
};

export default Logo;
