import React from 'react';
import { Stack, Button, Flex, Image, Box } from '@chakra-ui/react';

import { useStaking } from '../hooks';

export function Header() {
	const { connect, disconnect, isConnected, account, balance } = useStaking();

	const shortenAccount = !account ? '' : account.toString().substr(0, 5) + '...' + account.toString().substr(account.toString().length - 4);

	return (
		<Flex justify="space-between" direction='row' width="100%">
			<Box>
				<Image
					src="https://explorer.gochain.io/assets/images/logo_fullcolor.svg"
					width={125}
					onClick={() => window.location.href = 'https://gochain.io'}
					cursor="pointer"
				/>
			</Box>
			<Stack spacing={2} direction='row' align='center'>
				<Button size="sm" hidden={!isConnected}>
					{balance.toFixed(3)} GO
				</Button>
				<Button colorScheme="blue" size="sm" onClick={disconnect} hidden={!isConnected}>
					{shortenAccount}
				</Button>
				<Button colorScheme="blue" onClick={connect} size="sm" hidden={isConnected}>
					CONNECT
				</Button>
			</Stack>
		</Flex>
	);
}