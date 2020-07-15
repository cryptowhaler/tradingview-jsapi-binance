import axios from 'axios';

class VegaProtocolService {

  constructor() {
    this.main_api = 'https://lb.n.vega.xyz';
    this.unspecified = 'unspecified';
  }
    
    
  //    Preparesponsethe submit order. Returns blob which is decoded and used for signing transaction
  // {
  //     "blob": "string",
  //     "submitID": "string"
  //     }

 
  // GETS THE DATA OF ALL THE MARKETS
  //     {
  //   'markets': [
  //     {           # Example of 1 market, a list of these objects is returned
  //       'id': 'LBXRA65PN4FN5HBWRI2YBCOYDG2PBGYU',
  //       'name': 'GBPVUSD/OCT20',
  //       'tradableInstrument': {
  //         'instrument': {
  //           'id': 'Crypto/GBPVUSD/Futures/Oct20',
  //           'code': 'CRYPTO:GBPVUSD/OCT20',
  //           'name': 'October 2020 GBP vs VUSD future',
  //           'baseName': 'GBP',
  //           'quoteName': 'VUSD',
  //           'responsebody': {
  //             'tags': [
  //               'asset_class:fx/crypto',
  //               'product:futures'
  //             ]
  //           },
  //           'initialMarkPrice': '130000',
  //           'future': {
  //             'maturity': '2020-10-30T22:59:59Z',
  //             'asset': 'VUSD',
  //             'ethereumEvent': {
  //               'contractID': '0x0B484706fdAF3A4F24b2266446B1cb6d648E3cC1',
  //               'event': 'price_changed',
  //               'value': '126000'
  //             }
  //           }
  //         },                  #instrument bracket close
  //         'marginCalculator': {
  //           'scalingFactors': {
  //             'searchLevel': 1.1,
  //             'initialMargin': 1.2,
  //             'collateralRelease': 1.4
  //           }
  //         },
  //         'logNormalRiskModel': {
  //           'riskAversionParameter': 0.01,
  //           'tau': 0.00011407711613050422,
  //           'params': {
  //             'mu': 0,
  //             'r': 0.016,
  //             'sigma': 0.09
  //             }
  //         }
  //       },                #tradable instrument bracket close
  //       'decimalPlaces': '5',
  //       'continuous': {
  //         'tickSize': '0'
  //       }
  //     },
  //     }
  async get_markets() {
    try {
      let response = await axios.get(this.main_api + '/markets');
      console.log(response);
      return {status: response.status,data: response.data,};
    }
    catch {
      console.log('Get Markets Failed.');
      return {status: 404,data: 'Get Markets Failed',};
    }
  }    


  // Gets List of markets Data
  //     {'marketsData': [{'markPrice': '23135052', 'bestBidPrice': '23101998', 'bestBidVolume': '183', 'bestOfferPrice': '23135052', 'bestOfferVolume': '125', 'midPrice': '23118525', 'market': 'VHSRA2G5MDFKREFJ5TOAGHZBBDGCYS67', 'timestamp': '1593645095537541796'},
  //                     {'markPrice': '123826', 'bestBidPrice': '123825', 'bestBidVolume': '18716', 'bestOfferPrice': '123826', 'bestOfferVolume': '6901', 'midPrice': '123825', 'market': 'LBXRA65PN4FN5HBWRI2YBCOYDG2PBGYU', 'timestamp': '1593645095537541796'},
  //                     {'markPrice': '2500', 'bestBidPrice': '2500', 'bestBidVolume': '515', 'bestOfferPrice': '2501', 'bestOfferVolume': '28', 'midPrice': '2500', 'market': 'RTJVFCMFZZQQLLYVSXTWEN62P6AH6OCN', 'timestamp': '1593645095537541796'}]}
  async get_list_of_markets() {
    try {
      let response = await axios.get(this.main_api + '/markets-data');
      return {status: response.status,data: response.data,};
    }
    catch {
      console.log('Get list of Markets Failed.');
    }
  }    
    
  //     {'marketData': {'markPrice': '23138017', 'bestBidPrice': '23101998', 'bestBidVolume': '183', 'bestOfferPrice': '23138017', 'bestOfferVolume': '488', 'midPrice': '23120007', 'market': 'VHSRA2G5MDFKREFJ5TOAGHZBBDGCYS67', 'timestamp': '1593645237475712568'}}
  async get_market_data_by_id(id) {
    try {
      let response = await axios.get(this.main_api + '/markets-data/' + id);
      return {status: response.status,data: response.data,};
    }
    catch {
      console.log('Get Market Data by ID Failed.');
    }
  }    
    
  //     {'market':
  //         {'id': 'VHSRA2G5MDFKREFJ5TOAGHZBBDGCYS67',
  //         'name': 'ETHVUSD/DEC20',
  //         'tradableInstrument': {
  //             'instrument': {
  //                     'id': 'Crypto/ETHVUSD/Futures/Dec20',
  //                     'code': 'CRYPTO:ETHVUSD/DEC20',
  //                     'name': 'December 2020 ETH vs VUSD future',
  //                     'baseName': 'ETH',
  //                     'quoteName': 'VUSD',
  //                     'responsebody': {'tags': ['asset_class:fx/crypto', 'product:futures']},
  //                     'initialMarkPrice': '1410000',
  //                     'future': {
  //                         'maturity': '2020-12-31T23:59:59Z',
  //                         'asset': 'VUSD',
  //                         'ethereumEvent': {'contractID': '0x0B484706fdAF3A4F24b2266446B1cb6d648E3cC1', 'event': 'price_changed', 'value': '1500000'}
  //                     }
  //             },
  //             'marginCalculator': {'scalingFactors': {'searchLevel': 1.1, 'initialMargin': 1.2, 'collateralRelease': 1.4}},
  //             'logNormalRiskModel': {'riskAversionParameter': 0.001, 'tau': 0.00011407711613050422, 'params': {'mu': 0, 'r': 0.016, 'sigma': 1.5}}
  //         },
  //         'decimalPlaces': '5',
  //         'continuous': {'tickSize': '0'}
  //         }
  //     }    WORKS
  async get_market_by_id(id) {
    let url = this.main_api + '/markets/' + id;
    try {
      let response = await axios.get(url);
      return {status: response.status,data: response.data,};
    }
    catch {
    return {status: 404 ,data: 'Could\'t get market',};
      console.log('Get market by id Failed.');
    }
  }    

  // #NOT WORKING
    async get_candles_by_market_id(id,timestamp,intervals) {
      let async_url = '/markets/' + id + '/candles';
      let responsebody = {'sinceTimestamp':timestamp,'interval':intervals,};
      console.log(async_url + '   ' + responsebody);
      try {
        let response= await axios.get(this.main_api + async_url,  { params: responsebody, } );
        console.log(response);
        return {status: response.status,data:  response.data,};
      }
      catch {
        console.log('Get candles by market Failed.');
        return {status: 404, data: 'API call failed' };
      }
    }    

  async get_market_depth(id,depth) {
    let responsebody = {'maxDepth':depth,};
    try {
      let response= await axios.get(this.main_api + '/markets/'+id+'/depth',responsebody);
      return {status: response.status,data: response.data,};
    }
    catch {
      console.log('Get market depth Failed.');
    }
  }

  async get_time() {
      let resp = await axios.get(this.main_api + '/time');
      return resp;
  }  
}   
    

export default new VegaProtocolService();

