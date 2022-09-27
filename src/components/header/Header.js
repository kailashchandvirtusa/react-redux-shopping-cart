import React from 'react'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'

function Header() {
  const { totalCount } = useSelector((state) => state.cart)
  return (
    <header>
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-3 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center text-dark text-decoration-none"
        >
          <img className="brand-logo" alt="shopping cart" src="https://static.vecteezy.com/system/resources/previews/000/425/526/original/shopping-cart-icon-vector-illustration.jpg"/>
        <span className="fs-4">Shopping Cart</span>
        </Link>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <span className="cart py-2 text-dark text-decoration-none position-relative">
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart4"
                viewBox="0 0 16 16"
              >
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
              </svg>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalCount}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
          </span>
        </nav>
      </div>
    </header>
  )
}

export default Header
