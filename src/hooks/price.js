import { useState, useEffect } from 'react';

export function usePrice(interval = 5000) {
	const [price, setPrice] = useState(null);

	const syncPrice = async () => {
		fetch('https://api.binance.com/api/v3/trades?symbol=GOBTC')
			.then((goPriceResponse) => goPriceResponse.json())
			.then(goPriceResponse => {
				const goPrice = goPriceResponse[goPriceResponse.length - 1].price;
				fetch('https://api.binance.com/api/v3/trades?symbol=BTCUSDT')
					.then((btcPriceResponse) => btcPriceResponse.json())
					.then(btcPriceResponse => {
						const btcPrice = btcPriceResponse[btcPriceResponse.length - 1].price;
						setPrice(Math.round(goPrice * btcPrice * 10e5) / 10e5);
					});
			});
	};

	useEffect(() => {
		setInterval(() => {
			syncPrice();
		}, interval);
	}, [interval]);

	return { price };
}