import React, { useEffect } from 'react';
import { useColorMode, Stack, Flex, Heading, Box, Spacer, Button } from '@chakra-ui/react';

import { Header, MyStake, AllStake } from './components';

import './App.css';

export default function App() {
	const { setColorMode } = useColorMode();

	useEffect(() => {
		setColorMode('light');
	}, []);

	return (
		<Stack spacing={{ base: 50, md: 100 }} direction='column' width={[900, 400, 900, 900]} margin="auto" paddingY={5}>
			<Stack paddingX={5}>
				<Header />
			</Stack>
			<Stack direction="row" justify="space-between" spacing={10} paddingX={5}>
				<Stack>
					<Heading as='h1' size='xl'>
						Staking
					</Heading>
					<Spacer />
					<Heading as='h3' size='l' fontWeight="normal">
						Stake GO token to earn
					</Heading>
					<Spacer />
					<Heading as='h5' size='s' fontWeight="normal">
						To get rewards, minimum of 50,000 is required
					</Heading>
				</Stack>
				<Stack alignSelf="center">
					<Button colorScheme="orange" onClick={() => window.open('https://gochain.io/go')}>BUY GO</Button>
				</Stack>
			</Stack>
			<Flex justify="space-between" wrap="wrap" width="100%">
				<Box width={{ base: '100%', md: '50%', sm: '100%' }}>
					<MyStake />
				</Box>
				<Box width={{ base: '100%', md: '50%', sm: '100%' }}>
					<AllStake />
				</Box>
			</Flex>
		</Stack>
	);
}
