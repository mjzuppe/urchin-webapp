import { useState } from 'react';

const useForceUpdate = () => {
  const [value, setValue] = useState(false);
  return () => setValue(!value);
};

export default useForceUpdate;
