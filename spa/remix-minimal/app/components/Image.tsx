import type { FC } from 'react';

import { getEnv } from '~/utils';

type ImageProps = {
  image: any;
};

const Image: FC<ImageProps> = ({ image }) => (
  <img
    className="Image"
    src={getEnv('MGNL_HOST') + '/dam/' + image['@id'] + image['@path']}
    alt="Etiam Purus"
  />
);

export default Image;
