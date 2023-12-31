import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState( JSON.parse(localStorage.getItem("cart")) || [] );

  const agregarAlCarrito = (newProduct) => {
    let exist = isInCart(newProduct.id);

    if (exist) {
      let newArray = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: newProduct.quantity
          };
        } else {
          return product;
        }
      });

      setCart(newArray);
      localStorage.setItem("cart", JSON.stringify(newArray));
    } else {
      setCart([...cart, newProduct]);
      localStorage.setItem("cart", JSON.stringify([...cart, newProduct]));
    }
  };
  const isInCart = (id) => {
    let exist = cart.some((prod) => prod.id === id);
    return exist;
  };

  const limpiarCarrito = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const eliminarById = (id) => {
    let newArray = cart.filter((product) => product.id !== id);
    setCart(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray));
  };

  const getTotalCantidadById = (id) => {
    let producto = cart.find(prod => prod.id === +id)
    return producto?.quantity
  };

  const getTotalItems = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.quantity;
    }, 0);
    return total;
  };
  const getTotalPrecio = () => {
    let total = cart.reduce((acc, elemento)=>{
      return acc + (elemento.quantity * elemento.price)
    }, 0);
    return total;
  };

  let data = {
    cart,
    agregarAlCarrito,
    limpiarCarrito,
    eliminarById,
    getTotalCantidadById,
    getTotalItems,
    getTotalPrecio,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
export default CartContextProvider;
