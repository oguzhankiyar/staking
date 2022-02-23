import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	config: {
		initialColorMode: 'light',
		useSystemColorMode: false,
	},
	styles: {
		global: {
			body: {
				backgroundColor: '#f5f5f5'
			}
		}
	},
	components: {
		Button: {
			baseStyle: {
				_focus: {
					boxShadow: 'none'
				}
			}
		},
		CloseButton: {
			baseStyle: {
				_focus: {
					boxShadow: 'none'
				}
			}
		}
	}
});

export { theme };
