import { addDays } from 'date-fns';

import { isIOS } from './isIOS';

export const getPlatformDate = (date: Date) => {
  if (isIOS()) {
    return addDays(date, 1);
  } else {
    return date;
  }
};
