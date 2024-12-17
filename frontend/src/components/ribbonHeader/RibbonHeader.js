import { useTheme } from '@emotion/react';
import React from 'react';
import theme from '../../theme';

const RibbonHeader = ({ text }) => {
    const theme = useTheme();
    return (
        <div style={ribbonStyle}>
        {text}
        </div>
    );
    };

    const ribbonStyle = {
    '--r': '.5em',
    '--c': theme.palette.beige[0],
    paddingInline: 'calc(.5em + var(--r))',
    textAlign: 'center',
    lineHeight: 2,
    color: theme.palette.primary.dark,
    backgroundImage: `
        linear-gradient(var(--c) 70%, #0000 0),
        linear-gradient(to bottom left, #0000 50%, color-mix(in srgb, var(--c), #000 40%) 51% 84%, #0000 85%)
    `,
    backgroundPosition: '0 .15lh',
    backgroundSize: '100% 1lh',
    clipPath: `polygon(
        0 .15lh, 
        100% .15lh, 
        calc(100% - var(--r)) .5lh, 
        100% .85lh, 
        100% calc(100% - .15lh), 
        0 calc(100% - .15lh), 
        var(--r) calc(100% - .5lh), 
        0 calc(100% - .85lh)
    )`,
    outline: 'none',
    '@supports not (height:1lh)': {
        backgroundPosition: '0 .3em',
        backgroundSize: '100% 2em',
        clipPath: `polygon(
        0 .3em,
        100% .3em,
        calc(100% - var(--r)) 1em,
        100% 1.7em,
        100% calc(100% - .3em),
        0 calc(100% - .3em),
        var(--r) calc(100% - 1em),
        0 calc(100% - 1.7em)
        )`,
    },
    textTransform: 'uppercase',
    textShadow: '-1px 1px 2px rgba(0,0,0,0.4)',
    fontSize: '34px',
    margin: 0,
};


export default RibbonHeader;
