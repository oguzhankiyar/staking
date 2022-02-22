import React from 'react';
import { Box, Divider, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

import { useStaking } from '../hooks';
import { calculateRates } from '../utils';

export function AllStake() {
	const { supply, rate } = useStaking();

	const rates = calculateRates(rate);

	return (
		<Box margin={5} backgroundColor="white" borderWidth={1} boxShadow="0 0 10px #ccc" borderRadius={10}>
			<Box paddingX={5} paddingY={6}>
				<Stat>
					<StatLabel color="gray">TOTAL STAKED</StatLabel>
					<StatNumber>{supply.toLocaleString()} GO</StatNumber>
				</Stat>
			</Box>
			<Divider />
			<Box paddingX={5} paddingY={6}>
				<Stat>
					<StatLabel color="gray">STAKING APR</StatLabel>
					<StatNumber>{rates.daily.toFixed(2)}%</StatNumber>
				</Stat>
			</Box>
			<Divider />
			<Box paddingX={5} paddingY={6}>
				<Stat>
					<StatLabel color="gray">STAKING APY</StatLabel>
					<StatNumber>{rates.yearly.toFixed(2)}%</StatNumber>
				</Stat>
			</Box>
		</Box>
	);
}
