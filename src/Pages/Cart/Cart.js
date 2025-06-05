// import React, { useEffect, useState, useContext } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { Box, Spinner, Text } from "@chakra-ui/react";
// import { AuthContext } from "../../ContextApi/AuthContext";
// import { setCartItems } from "../../redux/CartPage/action";
// import CartItem from "./CartItem";

// const Cart = () => {
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();
//     const { user } = useContext(AuthContext);
    
//     useEffect(() => {
//         // Load cart items for the current user
//         const fetchCartItems = async () => {
//             // If no user is logged in, don't try to fetch cart
//             if (!user || !user._id) {
//                 setLoading(false);
//                 return;
//             }
            
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`http://localhost:5000/cart/${user._id}`);
                
//                 // Update the Redux store with the cart items from the database
//                 dispatch(setCartItems(response.data));
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching cart items:", error);
//                 setLoading(false);
//             }
//         };
        
//         fetchCartItems();
//     }, [user, dispatch]);
    
//     const cart = useSelector((state) => state.CartReducer.cart);
    
//     return (
//         <Box p={4}>
//             {loading ? (
//                 <Spinner size="xl" />
//             ) : cart.length === 0 ? (
//                 <Text fontSize="xl" textAlign="center" mt={10}>
//                     Your cart is empty
//                 </Text>
//             ) : (
//                 <CartItem />
//             )}
//         </Box>
//     );
// };

// export default Cart;

import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { AuthContext } from "../../ContextApi/AuthContext";
import { setCartItems } from "../../redux/CartPage/action";
import CartItem from "./CartItem";

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { user } = useContext(AuthContext);
    
    useEffect(() => {
        // Load cart items for the current user
        const fetchCartItems = async () => {
            // If no user is logged in, don't try to fetch cart
            if (!user || !user._id) {
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                // Remove the trailing slash in the URL
                const response = await axios.get(`http://localhost:5000/cart/${user._id}`);
                
                // Update the Redux store with the cart items from the database
                dispatch(setCartItems(response.data));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setLoading(false);
            }
        };
        
        fetchCartItems();
    }, [user, dispatch]);
    
    const cart = useSelector((state) => state.CartReducer.cart);
    
    return (
        <Box p={4}>
            {loading ? (
                <Spinner size="xl" />
            ) : cart.length === 0 ? (
                <Text fontSize="xl" textAlign="center" mt={10}>
                    Your cart is empty
                </Text>
            ) : (
                <CartItem />
            )}
        </Box>
    );
};

export default Cart;