import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className="content">
        <h1>Add Invoice</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          const date = this.productDate.value.toString()
          const tokenURI = this.productTokenURI.value
          this.props.createProduct(name, price, date, tokenURI)
        }}>
        <div className="form-group mr-sm-2">
            <label className="left" id="productName">Electricity place ID</label>
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Place ID"
              required />
        </div>
        <div className="form-group mr-sm-2">
            <label className="left" id="productPrice">Electricity Price (ETH)</label>
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Invoice Price"
              required />
        </div>
        <div className="form-group mr-sm-2">
            <label className="left" id="productDate">Expire Date (ex.20200901)</label>
            <input
              id="productDate"
              type="text"
              ref={(input) => { this.productDate = input }}
              className="form-control"
              placeholder="Expire Date"
              required />
        </div>
        <div className="form-group mr-sm-2">
            <label className="left" id="productTokenURI"> Invoice Image URL</label>
            <input
              id="productTokenURI"
              type="text"
              ref={(input) => { this.productTokenURI = input }}
              className="form-control"
              placeholder="Image hash"
              required />
        </div>
        <button type="submit" className="btn btn-primary">Add Invoice</button>
      </form>

      <p>&nbsp;</p>

      <h1>List Invoice</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Place(ID)</th>
            <th scope="col">Price</th>
            <th scope="col">Expire Date</th>
            <th scope="col">Issuer/Paid address</th>
            <th scope="col">Image</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList" className="contents">
          { this.props.products.map((product, key) => {
            return (
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <td>{product.name}</td>
                <td>{window.web3.utils.fromWei(product.price.toString(),'Ether')} Eth</td>
                <td>{product.date.toString()}</td>
                <td>{product.owner}</td>
                <td><a href="{product.tokenURI}">{product.tokenURI}</a></td>
                <td>
                { !product.purchased
                   ? <button
                       name={product.id}
                       value={product.price}
                       onClick={(event) => {
                         this.props.purchaseProduct(
                           event.target.name,
                           event.target.value
                         )
                       }}
                     >
                       Pay
                     </button>
                   : null
                 }
                  </td>
              </tr>
            )
          }
        )}
        </tbody>
      </table>
      </div>
    );
  }
}

export default Main;
