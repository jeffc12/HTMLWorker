import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab } from 'react-bootstrap';
import Input from './input.jsx';
import Output from './output.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container">
            <div className="col-md-12">
              <ul className="nav nav-tabs nav-justified">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#panel1" role="tab">Input</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#panel2" role="tab">ID Search</a>
                </li>
            </ul>

            <div className="tab-content card">
              <div className="tab-pane fade in show active" id="panel1" role="tabpanel">
                <br/>
                <Input />
              </div>

              <div className="tab-pane fade in" id="panel2" role="tabpanel">
                <br/>
                <Output />
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}



ReactDOM.render(<App/>, document.getElementById('app'));
