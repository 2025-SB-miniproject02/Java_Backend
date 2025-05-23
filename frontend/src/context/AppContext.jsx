import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    // Fetch All Products
    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    // Add Product to Cart (Only 1 Allowed Per Product)
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            toast.info("이미 장바구니에 있습니다");
        } else {
            cartData[itemId] = 1;
            setCartItems(cartData);
            toast.success("장바구니에 추가되었습니다");
        }
    };

    // Remove Product from Cart (Always Removes Entirely)
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            delete cartData[itemId];
            toast.success("장바구니에서 제거되었습니다.");
            setCartItems(cartData);
        }
    };

    // Update Cart Item Quantity
    const updateCartitem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart updated")
    }
    

    // Get Cart Item Count
    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    // Get Cart Total Amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if(cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    const logout = () => {
        setUser(null); // user 상태 초기화
        localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 제거
        toast.success("로그아웃 되었습니다."); // 로그아웃 알림
        // 추가적으로 필요한 정리 작업 (예: 카트 비우기 등)
        setCartItems({}); // 장바구니도 비워주는 것이 일반적입니다.
        navigate('/'); // 로그아웃 후 메인 페이지로 이동 (선택 사항)
    };


    useEffect(() =>{
        fetchProducts()
    }, [])

    useEffect(() =>{
        fetchProducts()
    }, [])

    const value = {navigate, user, setUser,
        showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartitem, removeFromCart, cartItems,
        searchQuery, setSearchQuery, getCartAmount, getCartCount, logout
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}