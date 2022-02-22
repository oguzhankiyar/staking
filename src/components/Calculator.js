import React from 'react';
import { Table, TableCaption, Thead, Tbody, Th, Tr, Td } from '@chakra-ui/react';

import { useStaking } from '../hooks';
import { calculateRates, calculateRewards } from '../utils';

export function Calculator() {
	const { rate } = useStaking();

	const amount = 100000;
	const rates = calculateRates(rate);
	const rewards = calculateRewards(rate, amount);

	return (
		<Table variant='striped' colorScheme='gray'>
			<TableCaption>Rates are estimated and not guaranteed.</TableCaption>
			<Thead>
				<Tr>
					<Th>Day</Th>
					<Th>APY</Th>
					<Th isNumeric>Amount</Th>
					<Th isNumeric>Reward</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td>1</Td>
					<Td>{rates.daily.toFixed(2)}%</Td>
					<Td isNumeric>{(amount).toLocaleString()} GO</Td>
					<Td isNumeric>{(rewards.daily).toLocaleString()} GO</Td>
				</Tr>
				<Tr>
					<Td>7</Td>
					<Td>{rates.weekly.toFixed(2)}%</Td>
					<Td isNumeric>{(amount).toLocaleString()} GO</Td>
					<Td isNumeric>{(rewards.weekly).toLocaleString()} GO</Td>
				</Tr>
				<Tr>
					<Td>30</Td>
					<Td>{rates.monthly.toFixed(2)}%</Td>
					<Td isNumeric>{(amount).toLocaleString()} GO</Td>
					<Td isNumeric>{(rewards.monthly).toLocaleString()} GO</Td>
				</Tr>
				<Tr>
					<Td>365</Td>
					<Td>{rates.yearly.toFixed(2)}%</Td>
					<Td isNumeric>{(amount).toLocaleString()} GO</Td>
					<Td isNumeric>{(rewards.yearly).toLocaleString()} GO</Td>
				</Tr>
			</Tbody>
		</Table>
	);
}
