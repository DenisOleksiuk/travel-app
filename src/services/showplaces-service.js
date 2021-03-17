class ShowplaceService {
  apiCountryBase = '/api/countries';

  apiWeatherKey = 'c16994fc025240af68d42239b19a63b1'

  apiWeatherBase = (country = 'ukraine', lang = 'en') => `https://api.openweathermap.org/data/2.5/weather?q=${country}&lang=${lang}&appid=${this.apiWeatherKey}&units=metric`;

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Ooops, Could not fetch ${url}` +
        `, received ${res.status}`);
    }

    const data = await res.json();
    return data;
  };

  getAllCountries = async () => {
    const countries = await this.getResource(this.apiCountryBase);
    return countries;
  };

  getCountry = async (country) => {
    const data = await this.getResource(this.apiCountryBase);
    const res = data.find((item) => item.name === country);
    return res;
  };

  login = async (name, pass) => {
    const data = {
      name,
      pass
    }
    let result = 'error';
    const response = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      result = await response.text();
    }
    return result;
  }

  register = async (name, pass) => {
    const data = {
      name,
      pass
    }
    let result = 'error';
    const response = await fetch('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      result = await response.text();
    }
    return result;
  }

  rate = async (countryId, attractionIndex, user, rating) => {
    const data = {
      countryId,
      attractionIndex,
      user,
      rating
    }
    let result = 'error';
    const response = await fetch('api/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      result = await response.text();
    }
    return result;
  }

  getWeather = async (country, lang) => {
    const weather = await this.getResource(this.apiWeatherBase(country, lang));
    return this.transformWeather(weather);
  }

  getCurrency = async () => {
    const res = await this.getResource(`https://v6.exchangerate-api.com/v6/5b803095445cca81a5153074/latest/USD`);
    return res.conversion_rates;
  }

  getCurrencyTest = async () => {
    const res = {
      result: "success",
      documentation: "https://www.exchangerate-api.com/docs",
      terms_of_use: "https://www.exchangerate-api.com/terms",
      time_last_update_unix: 1615680001,
      time_last_update_utc: "Sun, 14 Mar 2021 00:00:01 +0000",
      time_next_update_unix: 1615766416,
      time_next_update_utc: "Mon, 15 Mar 2021 00:00:16 +0000",
      base_code: "USD",
      conversion_rates: {
        USD: 1,
        AED: 3.6725,
        AFN: 77.8252,
        ALL: 103.5842,
        AMD: 525.9403,
        ANG: 1.79,
        AOA: 616.6916,
        ARS: 90.6653,
        AUD: 1.2881,
        AWG: 1.79,
        AZN: 1.6961,
        BAM: 1.6356,
        BBD: 2,
        BDT: 84.6209,
        BGN: 1.6362,
        BHD: 0.376,
        BIF: 1942.6385,
        BMD: 1,
        BND: 1.3414,
        BOB: 6.8819,
        BRL: 5.5565,
        BSD: 1,
        BTN: 72.704,
        BWP: 11.0533,
        BYN: 2.593,
        BZD: 2,
        CAD: 1.2512,
        CDF: 1974.9575,
        CHF: 0.9288,
        CLP: 718.8474,
        CNY: 6.4969,
        COP: 3572.4441,
        CRC: 610.2403,
        CUC: 1,
        CUP: 25.75,
        CVE: 92.2084,
        CZK: 21.9324,
        DJF: 177.721,
        DKK: 6.2387,
        DOP: 57.5436,
        DZD: 133.2485,
        EGP: 15.6838,
        ERN: 15,
        ETB: 40.4158,
        EUR: 0.8363,
        FJD: 2.0299,
        FKP: 0.7176,
        FOK: 6.2387,
        GBP: 0.7176,
        GEL: 3.3142,
        GGP: 0.7176,
        GHS: 5.7223,
        GIP: 0.7176,
        GMD: 51.7759,
        GNF: 10109.2813,
        GTQ: 7.706,
        GYD: 210.9325,
        HKD: 7.7633,
        HNL: 24.034,
        HRK: 6.3007,
        HTG: 76.3605,
        HUF: 306.8558,
        IDR: 14387.3531,
        ILS: 3.3275,
        IMP: 0.7176,
        INR: 72.7044,
        IQD: 1454.6005,
        IRR: 41827.6499,
        ISK: 128.8626,
        JMD: 148.8259,
        JOD: 0.709,
        JPY: 108.945,
        KES: 109.4727,
        KGS: 84.6379,
        KHR: 4041.5798,
        KID: 1.2881,
        KMF: 411.405,
        KRW: 1134.8491,
        KWD: 0.2996,
        KYD: 0.8333,
        KZT: 418.7057,
        LAK: 9350.3161,
        LBP: 1507.5,
        LKR: 195.9828,
        LRD: 173.5887,
        LSL: 14.926,
        LYD: 4.4986,
        MAD: 8.9894,
        MDL: 17.6111,
        MGA: 3788.5605,
        MKD: 51.693,
        MMK: 1407.4081,
        MNT: 2844.408,
        MOP: 7.9961,
        MRU: 35.8411,
        MUR: 39.9695,
        MVR: 15.3567,
        MWK: 782.3209,
        MXN: 20.7606,
        MYR: 4.1089,
        MZN: 73.6909,
        NAD: 14.926,
        NGN: 391.428,
        NIO: 34.8513,
        NOK: 8.4422,
        NPR: 116.3263,
        NZD: 1.3918,
        OMR: 0.3845,
        PAB: 1,
        PEN: 3.694,
        PGK: 3.5197,
        PHP: 48.4625,
        PKR: 156.5683,
        PLN: 3.837,
        PYG: 6596.404,
        QAR: 3.64,
        RON: 4.0837,
        RSD: 98.3469,
        RUB: 73.427,
        RWF: 991.9733,
        SAR: 3.75,
        SBD: 7.9321,
        SCR: 21.1559,
        SDG: 379.3483,
        SEK: 8.486,
        SGD: 1.3414,
        SHP: 0.7176,
        SLL: 10162.9115,
        SOS: 576.7601,
        SRD: 14.112,
        SSP: 177.4789,
        STN: 20.488,
        SYP: 743.3669,
        SZL: 14.926,
        THB: 30.7047,
        TJS: 11.3304,
        TMT: 3.4903,
        TND: 2.7375,
        TOP: 2.2638,
        TRY: 7.5496,
        TTD: 6.7874,
        TVD: 1.2881,
        TWD: 28.1735,
        TZS: 2315.0401,
        UAH: 27.6831,
        UGX: 3659.2358,
        UYU: 44.4768,
        UZS: 10500.2127,
        VES: 1865593.3206,
        VND: 23054.2484,
        VUV: 108.2456,
        WST: 2.4972,
        XAF: 548.54,
        XCD: 2.7,
        XDR: 0.7002,
        XOF: 548.54,
        XPF: 99.7907,
        YER: 251.0113,
        ZAR: 14.9261,
        ZMW: 21.9045
      }
    }
    return res.conversion_rates;
  }

  transformWeather = (weather) => ({
    weather: weather.weather[0],
    name: weather.name,
    country: weather.sys.country,
    main: weather.main
  })
}



export {
  ShowplaceService
};
