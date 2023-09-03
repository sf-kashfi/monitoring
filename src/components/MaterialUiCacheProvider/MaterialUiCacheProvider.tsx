import * as React from 'react';
import {  ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { theme } from './theme';
 import "../../assets/fonts/IRANSans/iransans.css"
export interface MaterialUiCacheProviderProps {
    children: ReactNode;
}

 

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


export const MaterialUiCacheProvider: React.FunctionComponent<MaterialUiCacheProviderProps> = (props) => {
    const { children } = props;
    return <CacheProvider value={cacheRtl}>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            {children}
         </ThemeProvider>
    </CacheProvider>;
}

