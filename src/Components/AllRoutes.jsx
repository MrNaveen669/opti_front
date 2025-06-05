import React, { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Product from "../Pages/Product/Product";
// import SingleProduct from "../Pages/SingleProduct/SingleProduct";
import ProductDetails from "../Pages/Product/ProductDetails";
import { Privateroutes } from "../ContextApi/Privateroute";
import Cart from "../Pages/Cart/index";
import Shipping from "../Pages/Shipping/Shipping";
import Checkout from "../Pages/Checkout/Checkout";
import Payment from "../Pages/Payment/Payment";
import Confirm from "../Pages/Confirm/Confirm";
import OrderHistory from "../Pages/OrderHistory/OrderHistory";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Productlist from "../Pages/Admin/Productlist";
import ProductPost from "../Pages/Admin/ProductPost";
import Enquiry from "../Pages/Enquiry/Enquiry";
import EditProduct from "../Pages/Admin/EditProduct";
import Lenses from "../Pages/Lenses/Lenses";
import AppointmentBooking from "../Pages/Booking/AppointmentBooking";
import NotFound from "../Pages/NotFound";
import TermsAndConditions from "../Pages/StaticPages/TermsAndConditions";
import CancellationsAndRefunds from "../Pages/StaticPages/CancellationsAndRefunds";
import PrivacyPolicy from "../Pages/StaticPages/PrivacyPolicy";
import ContactUs from "../Pages/StaticPages/ContactUs";
import ShippingPolicy from "../Pages/StaticPages/ShippingPolicy";

const AllRoutes = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/sampleproduct" element={<Product />} />
      <Route path="/sampleproduct/:id" element={<ProductDetails />} />
      <Route path ="/lenses" element={<Lenses />} />
    

      {/* <Route path="/products/:id" element={<SingleProduct />} /> */}
      <Route
        path="/cart"
        element={
          <Privateroutes>
            <Cart />
          </Privateroutes>
        }
      />
      <Route
        path="/shipping"
        element={
          <Privateroutes>
            <Shipping />
          </Privateroutes>
        }
      />
      <Route
        path="/checkout"
        element={
          <Privateroutes>
            <Checkout />
          </Privateroutes>
        }
      />
      <Route
        path="/payment"
        element={
          <Privateroutes>
            <Payment />
          </Privateroutes>
        }
      />
      <Route
        path="/confirm"
        element={
          <Privateroutes>
            <Confirm />
          </Privateroutes>
        }
      />
      <Route
        path="/orderhistory"
        element={
          <Privateroutes>
            <OrderHistory />
          </Privateroutes>
        }
      />
      <Route
        path="/wishlist"
        element={
          <Privateroutes>
            <Wishlist />
          </Privateroutes>
        }
      />
      <Route
        path="/wishlist"
        element={
          <Privateroutes>
            <Wishlist />
          </Privateroutes>
        }
      />
      <Route
        path="/enquiry"
        element={
          <Privateroutes>
            <Enquiry />
          </Privateroutes>
        }
      />
      <Route
        path="/productpost"
        element={
          <Privateroutes>
            <ProductPost />
          </Privateroutes>
        }
      />
      <Route
        path="/editproduct/:id"
        element={
          <Privateroutes>
            <EditProduct />
          </Privateroutes>
        }
      />
      <Route path="/book-appointment" element={<AppointmentBooking />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/cancellations-and-refunds" element={<CancellationsAndRefunds />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/shipping-policy" element={<ShippingPolicy />} />
    </Routes>
  );
};

export default AllRoutes;
