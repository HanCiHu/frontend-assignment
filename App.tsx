import React from 'react';
import {RecoilRoot} from 'recoil';

import Layout from '#/component';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  );
}

export default App;
