import React , {Component} from 'react';
import './App.css';
import $ from "jquery";

class App extends Component {
  constructor() {
    super();
    this.state = {
      weatherData : {}
    }
  }
  componentDidMount() {
    fetch("/api/weather")
    .then(results => {
      return results.json();
    }).then(data => {
       this.setState({weatherData: data});
    }).catch((error) => {
      console.log("error in fetching weather data");
    });
  }
  cityClick(e) {
    $(e.target).parents('.cityDetails').find('.temperatureDetails').slideToggle();
  }
  render() {
    var data = this.state.weatherData;
    var html = [];
    if(data && data.list) {      
      for(var i = 0; i < data.list.length; i++) {
        html.push(
        <div className="cityDetails">
          <div className="header"  onClick={this.cityClick}>
            <div className="cityName">{data.list[i].name}</div>
            <div className="weatherDesc">{data.list[i].weather && data.list[i].weather[0] && data.list[i].weather[0].description}</div>
          </div>
          <div className="temperatureDetails">
            <div className="maxTemp">Max: {data.list[i].main && data.list[i].main.temp_max}</div>
            <div className="minTemp">Min: {data.list[i].main && data.list[i].main.temp_min}</div>
            <div className="pressure">Pressure: {data.list[i].main && data.list[i].main.pressure}</div>
          </div>
        </div>) 
      }
    }
    return (
      <div className="weatherTable">
      {html}
      </div>
    )
  }
}
export default App;
