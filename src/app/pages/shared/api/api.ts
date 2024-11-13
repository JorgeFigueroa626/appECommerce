import { HttpHeaders } from '@angular/common/http';

export const endpoint = {

  //AUTH
  SIGN_UP: '/sign-up',
  AUTHENTICATION: '/authentication',

  ORDER_BY_TRACKING_ID : '/order/',

  //CATEGORY
  CREATE_CATEGORY: '/api/category',
  GET_CATEGORY_ID: '/api/category/',
  GET_ALL_CATEGORIES: '/api/categories',

  //PRODUCT
  CREATE_PRODUCT: '/api/product',
  GET_ALL_PRODUCTS: '/api/products',
  GET_BY_PRODUCT_NAME: '/api/product/name/',
  GET_BY_PRODUCT_ID: '/api/product/',

  GET_DETAIL_BY_PRODUCT_ID: '/api/product/detail/',

  //FAQ
  CREATE_FAQ_BY_PRODUCT_ID: '/api/product/faq/',

  //COUPON
  CREATE_COUPON: '/api/coupon',
  GET_COUPON: '/api/coupon',
  GET_BY_COUPON_ID: '/api/coupon/',

  //ORDER
  GET_PLACE_ORDERS: '/api/order/placedOrders',
  CHANGE_ORDER_STATUS: '/api/order/',
  GET_ANALYTICS: '/api/order/analytics',

  


  //CUSTOMER
  GET_ALL_CUSTOMERS: '/api/customers',
  GET_ALL_CUSTOMER_BY_NAME: '/api/customers/',

  ADD_PRODUCT_TO_CART: '/api/customer/cart',
  GET_CART_BY_USER_ID: '/api/customer/cart/',

  APPLY_COUPON: '/api/customer/coupon/',

  INCREASE_PRODUCT_QUANTITY: '/api/customer/cart/addition',
  DECREASE_PRODUCT_QUANTITY: '/api/customer/cart/decrease',

  PLACE_ORDER: '/api/customer/cart/placeOrder',
  GET_MY_ORDERS_BY_USER_ID: '/api/customer/myOrders/',

  //REVIEW
  GET_MY_ORDERED_PRODUCTS: '/api/ordered-products/',
  GIVE_REVIEW: '/api/review',

  //XX
  GET_PRODUCT: '/api/customers/product/',

  //WISHLIST
  ADD_PRODUCT_TO_WISHLIST: '/api/wishlist',
  GET_WISHLIST_BY_USER_ID: '/api/wishlist/',

  

};

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
