
import React from 'react'
import {addDecorator, addParameters, configure} from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import "../src/styles/index.scss"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (storyFn: any) => <div style={wrapperStyle}>
  <h3>组件演示</h3>
  {storyFn()}
</div>
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info:{inline: true, header: false}})
const loaderFn = () => {
  const allExports = [require('../src/welcome.stories.tsx')];
  const req = require.context('../src/components', true, /\.stories\.tsx$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};


// automatically import all files ending in *.stories.js
configure(loaderFn, module);
