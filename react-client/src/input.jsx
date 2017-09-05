import React from 'react';
import $ from 'jquery';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      history:[]
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkHandle = this.checkHandle.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  checkHandle() {
    let url = this.state.value;
    let context = this;
    console.log('enter',url);
    $.ajax({
      type: 'POST',
      url: '/addURL',
      contentType: 'application/JSON',
      data: JSON.stringify({
        url: url
      })
    })
    .done((data) => {
      context.setState({
        history: ['URL: ' + url, 'ID: ' +data._id]
      })

    })
    .fail(err => {
      console.log('err');
    });
  }

  render() {
    return (
      <div className="text-center align-self-center">
        <ul> Input a URL below to return an ID (format: www.google.com): </ul>
        <input className="primary-text" placeholder="Ex: www.google.com" type="text" name="value" style={{fontSize: '15px', maxWidth:'400px', 'color': 'black'}} value={this.state.value} onChange={this.handleChange}/>
        <a className="btn btn-primary btn-md" onClick={this.checkHandle}><i aria-hidden="true"></i>Enter</a>
        <ul className="text-left align-self-center">
          <li>{this.state.history[0]}</li>
          <li>{this.state.history[1]}</li>
        </ul>
      </div>
    )
  }
}


export default Input;
