import React, { useEffect } from 'react';
import { useColorMode, Stack, Flex, Heading, Box } from '@chakra-ui/react';

import { Header, Footer, MyStake, AllStake } from './components';

import './App.css';

export default function App() {
	const { setColorMode } = useColorMode();

	useEffect(() => {
		setColorMode('light');
	}, []);

	return (
		<Stack spacing={75} direction='column' width={{ base: 400, md: 900, sm: 400 }} margin="auto" paddingY={5}>
			<Header />
			<Stack>
				<Heading as='h1' size='xl'>
					Staking
				</Heading>
				<Heading as='h3' size='l' fontWeight="normal">
					Stake GO token to earn
				</Heading>
				<Heading as='h5' size='s' fontWeight="normal">
					To get rewards, minimum of 50,000 is required
				</Heading>
			</Stack>
			<Flex justify="space-between" wrap="wrap" width="100%">
				<Box width={{ base: '100%', md: '50%', sm: '100%' }}>
					<MyStake />
				</Box>
				<Box width={{ base: '100%', md: '50%', sm: '100%' }}>
					<AllStake />
				</Box>
			</Flex>
			<Footer />
		</Stack>
	);
}
