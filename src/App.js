import React, { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

import './App.css';

export default function App() {
	const { setColorMode } = useColorMode();

	useEffect(() => {
		setColorMode('light');
	}, []);

	return (
		<>GoChain Staking</>
	);
}
