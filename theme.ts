interface Theme {
    colors: {
        pastel: {
            [key: string]: string
        }
        black: string
        white: string
        blue: string
        darkBlue: string
        gray: {
            [key: string]: string
        }
    },
    borderRadius: {
        small: '2px',
        medium: '4px',
        large: '8px'
    }
}

const theme = {
    colors: {
        pastel: {
            red: '#FF8787',
            orange: '#FFB379',
            yellow: '#FFDA00',
            green: '#68D393',
            teal: '#3BB7B0'
        },
        black: '#000',
        white: '#fff',
        blue: '#0070f3',
        darkBlue: '#19345D',
        gray: {
            light: '#f5f5f5',
            medium: '#e5e5e5',
            dark: '#c5c5c5'
        },
    },
    borderRadius: {
        small: '2px',
        medium: '4px',
        large: '8px'
    },
}

export default theme