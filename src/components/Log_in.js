import React, { Component } from 'react';

class Log_in extends Component {
  
  render() {
    return (
      <div className="container">
      
        <form >
          <div class="form-group row align-items-center">
    <label for="inputEmail3" class="col-3 col-form-label text-align-right">Email</label>
    <div class="col-7">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email" />
    </div>
    </div>
        </form>
      </div>
    );
  }
}

export default Log_in;