import { imageAssets } from './lib';

interface Props {
  name: string;
  className?: string;
}

const Img = ({ name, className }: Props) => {
  if (imageAssets[name]) {
    return (
      <img src={imageAssets[name]} alt="" className={className} />
    );
  }
  console.error('Missing image', name);
  return null;
};

export default Img;
