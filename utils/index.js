import Sentry from 'sentry-expo';

export const logErrorRemotely = e => Sentry.captureException(e);
