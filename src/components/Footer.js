import React from 'react';
import { Flex, Link } from '@chakra-ui/react';

export function Footer() {
	return (
		<Flex direction="row" justifyContent="space-around">
			<Link href="https://gochain.io">HOME</Link>
			<Link href="https://explorer.gochain.io">EXPLORER</Link>
			<Link href="https://gochain.io/go">BUY GO</Link>
		</Flex>
	);
}
