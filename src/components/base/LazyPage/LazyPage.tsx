import React from 'react';
import { Loading } from 'components';

export interface Props {
  page: string;
}

function Lazy({ page }: Props) {
  const Component = React.useMemo(() => {
    return React.lazy(() => import(`pages/${page}`));
  }, [page]);

  return (
    <React.Suspense fallback={<Loading />}>
      <Component />
    </React.Suspense>
  );
}

export default Lazy;
