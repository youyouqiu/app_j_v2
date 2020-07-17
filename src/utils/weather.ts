// 映射天气icon
export const getWeatherIcon = (weather: any) => {
  if (weather && weather.now && weather.now.cond_code) {
    const code = parseInt(weather.now.cond_code)
    if (code === 100) {
      return require('../images/weather/1.png')
    }
    else if (code === 101 || code === 104) {
      return require('../images/weather/2.png')
    }
    else if (code === 102 || code === 103) {
      return require('../images/weather/3.png')
    }
    else if (code >= 200 && code <= 299) {
      return require('../images/weather/4.png')
    }
    else if (code >= 300 && code <= 399) {
      if (code >= 301 && code <= 304) {
        return require('../images/weather/6.png')
      } else {
        return require('../images/weather/5.png')
      }
    }
    else if (code >= 400 && code <= 499) {
      return require('../images/weather/7.png')
    }
    else if (code >= 500 && code <= 599) {
      return require('../images/weather/8.png')
    }
  }
  return require(`../images/weather/9.png`)
}
