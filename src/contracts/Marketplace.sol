pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    address payable  _seller;

    mapping(uint => Product) public products;

    struct Product {
      uint id;
      string name;
      uint price;
      uint date; 
      string tokenURI;
      address payable owner;
      bool purchased;
    }

    event ProductCreated(
      uint id, string name, uint price, uint date, string tokenURI, address payable owner, bool purchased);

    event ProductPurchased(
      uint id, string name, uint price,uint date, string tokenURI, address payable owner, bool purchased);


    constructor() public {
      name = "Zofuku Marketplace";
    }

    function createProduct(string memory _name, uint _price, uint _date, string memory _tokenURI) public {
      // make su re parameters are correct
      // require a valid _name
      require(bytes(_name).length > 0);
      // require a valid _price
      require(_price > 0);
      //require valid tokrnURI
     require(bytes(_tokenURI).length > 0);
      //date is not past
      require(_date >= block.timestamp / 1 days);
      // increment product count
      productCount ++;
      // create the products
      products[productCount] = Product(productCount, _name, _price, _date, _tokenURI, msg.sender, false);
      // trigger an event
      emit ProductCreated(productCount, _name, _price, _date, _tokenURI, msg.sender, false);
    }


    function purchaseProduct(uint _id) public payable {
      // fetch the products
      Product memory _product = products[_id];
      // fetch the owner
      _seller = _product.owner;
      // make sure the product is valid id
      require(_product.id > 0 && _product.id <= productCount);
      // requre there is enough ETH to transatction
      require(msg.value >= _product.price);
      // require product has not beed purchased already
      require(!_product.purchased);
      // require the buyer is not _seller
      require(_seller != msg.sender);
      // transfer owenship
      _product.owner = msg.sender;
      // _purchase it
      _product.purchased = true;
      // Update the products
      products[_id] = _product;
      // pay the seller
      _seller.transfer(msg.value);
      // event
      emit ProductPurchased(productCount, _product.name, _product.price, _product.date, _product.tokenURI, msg.sender, true);
    }

}
