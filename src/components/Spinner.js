import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
        // <div class="d-flex justify-content-center">
        <div className="position-absolute top-50 start-50 translate-middle" >

  <div className="spinner-border" role="status">
    <span className="visually-hidden"></span>
  </div>
</div>

    )
  }
}

export default Spinner