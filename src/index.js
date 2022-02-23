import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react';

import { StakingProvider } from './hooks';
import App from './App'

ReactDOM.render(
	<React.StrictMode>
		<StakingProvider>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</StakingProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
