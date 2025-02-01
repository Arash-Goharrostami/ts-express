import use from './use';

type iRouter = {
  use: typeof use;
}

const router: iRouter = {
  use,
}

export default router;
