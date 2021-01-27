import React from 'react';
import { Provider } from './src/context/PostContext';

export default ({ element }) => {
  return <Provider>{element}</Provider>;
};
