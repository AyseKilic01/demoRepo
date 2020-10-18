import React, { Component } from 'react';
import Navi from "./Navi";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import { Container, Row, Col, Jumbotron, Button } from "reactstrap";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

export default class App extends Component {
  state = { currentCategory: "" , products: []};

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = category => {
    this.setState({currentCategory : category.categoryName});
    this.getProducts(category.id)
  };

  getProducts = (categoryId)=> { 
    let url = "http://localhost:3000/products"
    if(categoryId){
      url+= "?categoryId="+ categoryId;
    }
    fetch(categoryId)
    .then(response=>response.json())
    .then(data=>this.setState({products: data}))
  }



  render() {
    let productInfo = {title:"ProducList"}
    let categoryInfo ={title:"CategoryList"}
    return (
      /* containerlar olmadan içerik giremezsin mesela div olmadan h ları giremezsin */
       /* MAntık md ile aynı xs */
      <div>
        <Container>
          <Row>
          <Jumbotron>
          <h1 className="display-3">Hoşgeldiniz!</h1>
          <p className="lead">React ile proje yazmayı deneyeceğiz. Bu deneyimde benimle olmalısın.</p>
          <hr className="my-2" />
          <p>Bu alana oldukça uzun bir paragraf yazabilirim ama kodlama yapsak daha güzel olacak :) </p>
          <p className="lead">
            <Button color="primary">Hadi Bakalım</Button>
          </p>
        </Jumbotron>
          </Row>
          <Row> 
            <Col xs='5'>
              <CategoryList currentCategory={this.setState.changeCategory} changeCategory={this.changeCategory} info={categoryInfo}></CategoryList>
              </Col>
            <Col xs='7'>
              <ProductList  
              products={this.state.products}
              info={productInfo}></ProductList>
              </Col>
          </Row>
        </Container>
      </div>
    );

  }
}