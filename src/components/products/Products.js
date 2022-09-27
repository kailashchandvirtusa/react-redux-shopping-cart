import React, { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../../features/apiSlice'
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  calculateTax,
  getTotalAmount,
} from '../../features/useCartSlice'
import { useDispatch } from 'react-redux'

function Products() {
  const dispatch = useDispatch()
   // the search result
   const [initialProduct, setInitialProduct] = useState(useGetProductsQuery({ refetchOnMountOrArgChange: true }).data);
   const [searchField, setSearchField] = useState("");

  let productObj = {
    id: '',
    title: '',
    price: '',
    image: '',
  }

  const addToCart = (item) => {
    productObj = {
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
    }
    dispatch(addCartProduct(productObj))
    dispatch(getCartCount())
    dispatch(getSubTotal())
    dispatch(calculateTax())
    dispatch(getTotalAmount())
  }

  const {
    data: products,
    isLoading: isProductLoading,
    isSuccess: isProductSuccess,
    isError: isProductError,
    error: prouctError,
  } = useGetProductsQuery({ refetchOnMountOrArgChange: true })

  useEffect(() => {}, [dispatch])
  useEffect(() => {
    setInitialProduct(products)
  }, [products])

  const handleChange = e => {
    setSearchField(e.target.value);
  };
  console.log("initialProduct", initialProduct)
  //const filteredPersons = []
  const filteredPersons = initialProduct.filter(
    product => {
      return (
        product.description.toLowerCase().includes(searchField.toLowerCase())
      );
    }
  );

  console.log("products", products)
  let initialProducts = !!filteredPersons && filteredPersons.length > 0 ? filteredPersons : products

  let getData

  if (isProductLoading) {
    getData = (
      <div className="d-flex justify-content-center w-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isProductSuccess) {
      getData = initialProducts.map((item) => {
        return (
          <div className="col" key={item.id}>
            <div className="card h-100 product-card box-shadow">
              <div className="img-grid mb-3">
                <img src={item.image} className="card-img-top" alt={item.title} />
              </div>
              <div className="card-body">
                <h5 className="card-title">${item.price}</h5>
                <p className="card-text">
                  {item.description.substring(0, 50)}...
                </p>
                <button className="btn btn-outline-danger me-2">Buy now</button>
                <button
                  onClick={() => {
                    addToCart(item)
                  }}
                  className="btn btn-outline-primary"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )
      })
   
  } else if (isProductError) {
    getData = (
      <div className="alert alert-danger w-100 text-center" role="alert">
        {prouctError.status} {JSON.stringify(prouctError)}
      </div>
    )
  }

  return (
    <div>
      <div className="row row-cols-12 row-cols-md-12 row-cols-sm-12 g-4">
      <div className="col">
        <input
          className="search-input"
          type = "search" 
          placeholder = "Search Product" 
          onChange = {handleChange}
        />
      </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 g-4">
        {getData}
      </div>
    </div>
  )
}

export default Products
