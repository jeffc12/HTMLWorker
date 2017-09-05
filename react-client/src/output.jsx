import React from 'react';

class Output extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   value: '',
   html:'',
   status:'',
   url:''
  };
  this.handleChange = this.handleChange.bind(this);
  this.checkHandle = this.checkHandle.bind(this);
 }

 handleChange(e) {
  this.setState({
   value: e.target.value
  });
 }

 checkHandle() {
  let id = this.state.value;
  let context = this;
  $.ajax({
   type: 'POST',
   url: '/IdStatus',
   contentType: 'application/JSON',
   data: JSON.stringify({
    id: id
   })
  })
   .done((data) => {
    console.log(data);
    if(data.status === 'true'){
     context.setState({
      html: 'HTML: '+ data.html,
      status: 'Status: Completed',
      url: 'URL: ' + data.url
     });
    }
    else {
     context.setState({
      status: 'Status: Not Completed',
      url: 'URL: ' + data.url,
      html: ''
     });
    }
   })
   .fail((err) => {
    console.log('err');
   });
 }

 render() {
  return (
   <div className="text-center align-self-center">
    <ul> Input a ID below to check the status of your job: </ul>
    <input className="primary-text" placeholder="Ex: 59aeee9aa01a7d16a57bc840" type="text" name="value" style={{fontSize: '15px', maxWidth:'400px', color: 'black'}} value={this.state.value} onChange={this.handleChange}/>
    <a className="btn btn-primary btn-md" onClick={this.checkHandle}><i aria-hidden="true"></i>Enter</a>
    <ul className="text-left align-self-center">
     <li>{this.state.status}</li>
     <li>{this.state.url}</li>
     <li>{this.state.html}</li>
    </ul>
   </div>
  );
 }
}

export default Output;
