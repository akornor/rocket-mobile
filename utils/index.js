import Sentry from 'sentry-expo';

export const logErrorRemotely = (e, msg) => {
  Sentry.captureException(e);
  if (__DEV__) console.log(msg || '', e);
};
