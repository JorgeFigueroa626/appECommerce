import { HttpHeaders } from '@angular/common/http';

export const endpoint = {
  //CLIENTE
  SIGN_UP: '/sign-up',
  AUTHENTICATION: '/authentication',

  ORDER_BY_TRACKING_ID : '/api/order/',


  //CATEGORIA
  CREATE_CATEGORY: '/api/admin/category',
  GET_ALL_CATEGORYS: '/api/admin/categorys',

  //PRODUCT
  CREATE_PRODUCT: '/api/admin/product',
  GET_ALL_PRODUCTS: '/api/admin/products',
  GET_BY_PRODUCT_NAME: '/api/admin/product/name/',
  GET_BY_PRODUCT_ID: '/api/admin/product/',

  //COUPON
  CREATE_COUPON: '/api/admin/coupons',
  GET_COUPON: '/api/admin/coupons',

  //ORDER
  GET_PLACE_ORDERS: '/api/admin/order/placedOrders',
  CHANGE_ORDER_STATUS: '/api/admin/order/',
  GET_ANALYTICS: '/api/admin/order/analytics',

  //FAQ
  CREATE_FAQ_BY_PRODUCT_ID: '/api/admin/product/faq/',

  //CUSTOMER
  GET_ALL_CUSTOMERS: '/api/customers',
  GET_ALL_CUSTOMER_BY_NAME: '/api/customers/',

  ADD_PRODUCT_TO_CART: '/api/customer/cart',
  GET_CART_BY_USER_ID: '/api/customer/cart/',

  APPLY_COUPON: '/api/customer/coupon/',

  INCREASE_PRODUCT_QUANTITY: '/api/customer/cart/addition',
  DECREASE_PRODUCT_QUANTITY: '/api/customer/cart/decrease',

  PLACE_ORDER: '/api/customer/placeOrder',
  GET_MY_ORDERS_BY_USER_ID: '/api/customer/myOrders',
  GET_MY_ORDERED_PRODUCTS: '/api/customer/ordered-products/',

  GIVE_REVIEW: '/api/customer/review',

  GET_PRODUCT: '/api/customers/product/',

  ADD_PRODUCT_TO_WISHLIST: '/api/customer/wishlist',
  GET_WISHLIST_BY_USER_ID: '/api/customer/wishlist/',

  

};

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
