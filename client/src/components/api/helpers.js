import VegaProtocolService from '../vega/VegaProtocolService';

const intervals = {
	'1': 'I1M',
	'3': 'I3M',
	'5': 'I5M',
	'15': 'I15M',
	'30': 'I30M',
	'60': 'I1H',
	'120': 'I2H',
	'240': 'I4H',
	'360': 'I6H',
	'480': 'I8H',
	'720': 'I12H',
	'1D': 'I1D',
	'3D': 'I3D',
	'1W': 'I1W',
	'1M': 'I1M',
}

const markets = [
	{'id': "LBXRA65PN4FN5HBWRI2YBCOYDG2PBGYU", 'name': "GBPVUSD/OCT20"},
	{'id': "RTJVFCMFZZQQLLYVSXTWEN62P6AH6OCN", 'name': "ETHBTC/DEC20"},
	{'id': "VHSRA2G5MDFKREFJ5TOAGHZBBDGCYS67", 'name': "ETHVUSD/DEC20"}
]

export const checkInterval = (interval) => !!intervals[interval];

//returns name with prefix of exchange name
export function generateSymbol(exchange,symbolName) {
	const fullName = '${exchange}:${symbolName}';
	return fullName;
}

export async function getMarketDataforMarketName(symbol) {          //Gets market name for market ID
	console.log(symbol);
	let id = '';
	for (let i=0;i<markets.length;i++) {
		console.log(markets[i])
		if (symbol == markets[i].name) {
			id = markets[i].id;
		}
	}
	console.log(id);

	const data = await VegaProtocolService.get_market_by_id(id); 
	console.log(data);

	if (data.status == 200 ) {
		let _market = {};
		_market.id = data.data.market.id;
		_market.name = data.data.market.name;
		_market.instrument_name = data.data.market.tradableInstrument.instrument.name;          
		_market.baseName = data.data.market.tradableInstrument.instrument.baseName;
		_market.quoteName	= data.data.market.tradableInstrument.instrument.quoteName;   
		console.log(_market);       
		return _market;
	}
	else {
	  return 'undefined';
	}
}

export async function  getVegaTime() {
	const resp = await VegaProtocolService.get_time();
	console.log(resp);
	console.log(resp.data.timestamp)
	return resp.data.timestamp;
}

export const getSymbols = () => {
	symbols = [];
	for (let i=0;i<markets.length;i++ ) {
		symbols.push(markets[i].name);
	}
	console.log(symbols);
	return symbols;
}

function formatingCandles (time, open, high, low, close, volume, datetime, interval ) {
	return {
		time: Math.floor(time / 1000000000),
		open,
		high,
		low,
		close,
		volume,
	}
}

export async function getCandles(symbolID, interval, from, to) {
	interval = intervals[interval]; // set interval
	// id = '';
	// for (let i=0;i<markets.length;i++) {
	// 	if (symbol == markets[i].name) {
	// 		id = markets[i].id;
	// 	}
	// }
	console.log(symbolID + '   ' + interval);
	let candles = await VegaProtocolService.get_candles_by_market_id(symbolID,from,interval);
	
	let res = [];
	for (let i=0;i<candles.data.candles.length;i++) {
		res.push(formatingCandles(candles.data.candles[i].timestamp, candles.data.candles[i].open,candles.data.candles[i].high, candles.data.candles[i].low, candles.data.candles[i].close, candles.data.candles[i].volume ) )
	}
		// .then(res => {
		// 	console.log(res);
		// 	const arr = res.map(i => formatingCandles(i));
	console.log(res);
	return res;
		
}

// export const checkInterval = (interval) => !!intervals[interval]


// export const subscribeKline = ({ symbol, interval, uniqueID }, callback) => {
// 	interval = intervals[interval] // set interval
// 	return api.stream.kline({ symbol, interval, uniqueID }, res => {
// 		const candle = formatingKline(res.kline)
// 		callback(candle)
// 	})
// }

// export const unsubscribeKline = (uniqueID) => {
// 	return api.stream.close.kline({ uniqueID })
// }

