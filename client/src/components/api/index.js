/**
 * Creating a mock of the datafeed
 * Tutorial: https://github.com/tradingview/charting-library-tutorial/blob/master/documentation/integration.md
 * Full implementation: https://github.com/tradingview/charting_library/wiki/JS-Api#how-to-start
 * Tutorial implementation: https://github.com/tradingview/charting-library-tutorial/blob/master/documentation/datafeed-implementation.md
 * Stream implementation: https://github.com/tradingview/charting-library-tutorial/blob/master/documentation/streaming-implementation.md
 */

import { getVegaTime, getSymbols, getCandles, checkInterval, getMarketDataforMarketName } from './helpers'

const configurationData = {
	supports_marks: false,
	supports_timescale_marks: false,
	supports_time: true,
	supported_resolutions: ['1','5', '15','60','360','1D']
};

export default {
	// get a configuration of your datafeed (e.g. supported resolutions, exchanges and so on)
	onReady: (callback) => {
		console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData)) // callback must be called asynchronously.
	},
	/*
	 // NO need if not using search
	searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
		console.log('[searchSymbols]: Method call');
	},
	 */
	// retrieve information about a specific symbol (exchange, price scale, full symbol etc.)
	resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
		console.log('[resolveSymbol]: Method call', symbolName);

		// const comps = symbolName.split(':')
		// symbolName = (comps.length > 1 ? comps[1] : symbolName).toUpperCase()

		const symbolInfo = (market) => ({
            id: market.id,
            name: market.name,
			description: market.instrument_name,
            ticker: market.name,
            baseName: market.baseName,
            quoteName: market.quoteName,
			//exchange: 'Binance',
			//listed_exchange: 'Binance',
			//type: 'crypto',
			session: '24x7',
			minmov: 1,
			pricescale: 100,
			timezone: 'UTC',
			has_intraday: true,
			has_daily: true,
			has_weekly_and_monthly: true,
			currency_code: market.baseName
        })

		const market = await getMarketDataforMarketName(symbolName);
		console.log(market);
		return market ? onSymbolResolvedCallback(symbolInfo(market)) : onResolveErrorCallback('[resolveSymbol]: symbol not found');
	},

	// get historical data for the symbol
	getBars: async (symbolInfo, interval, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) => {
		console.log('[getBars] Method call', symbolInfo, interval)
		console.log('[getBars] First request', firstDataRequest)

		if (!checkInterval(interval)) {
            console.log(interval + ' not found');
			return onErrorCallback('[getBars] Invalid interval');
		}

		if (Number(from) < 0 ) {
			from = Number(from)*(-1);
		}

        let id = symbolInfo.id;
        console.log(id + '  ' + interval + '  ' + from + '  ' + to );
        const candles = await getCandles( id, interval, Number(from)*1000000000 );
        console.log(candles);
		if (candles.length > 0) {
			return onHistoryCallback(candles);
		}
		onErrorCallback('Klines data error');
	},

	// subscription to real-time updates
	// subscribeBars: (symbolInfo, interval, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
	// 	console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);

	// 	subscribeKline( { symbol: symbolInfo.id, interval, uniqueID: subscribeUID, }, cb => onRealtimeCallback(cb) )
	// },

	// subscription to real-time updates
	// unsubscribeBars: (subscriberUID) => {
	// 	console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
	// 	unsubscribeKline(subscriberUID)
	// },

	getServerTime: (callback) => {
		getVegaTime().then(time => {
			console.log(time);
			callback(Math.floor(time / 1000000000))
		}).catch(err => {
			console.error(err)
		})
	}
};
