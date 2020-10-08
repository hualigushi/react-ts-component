
import "../src/styles/index.scss"
import {addDecorator} from '@storybook/react'
import React from 'react'
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const styles: React.CSSProperties = {
  textAlign: 'center'
}

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
addDecorator(CenterDecorator)