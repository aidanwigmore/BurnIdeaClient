import React from 'react';

import Text from '@materials/Text';

import customTheme from '../theme';
import { Size } from '../types/Size';

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <Text text={title} size={Size.large}/>
  );
};

export default Title;
