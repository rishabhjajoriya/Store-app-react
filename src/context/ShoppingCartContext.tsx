import { useState } from 'react'
import React, { ReactNode, createContext, useContext } from 'react'
type ShoppingCartProviderProps = {
    children : ReactNode
}

type CartItem = {
    id:number
    quantity:number
}

type ShoppingCartContext = {
    openCart:() => void
    closeCart:() => void
    getItemQuantity : (id:number) => number
    increaseCartQuantity : (id:number)=> void
    decreaseCartQuantity : (id:number) => void
    removeFromCart : (id:number) => void
    cartQuantity:number
    cartItems: CartItem[]
    
}

 const ShoppingCartContext = createContext({} as ShoppingCartContext)

const useShoppingCart = () => {             
  return (
    useContext(ShoppingCartContext)
  )
}

export default useShoppingCart


export function ShoppingCartProvider({children} : ShoppingCartProviderProps){
    const [cartItems, setcartItems] = useState<CartItem[]>([])

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id) ?. quantity || 0
    }

    function increaseCartQuantity(id:number){
        setcartItems(currItems => {
            if(currItems.find(item => item.id === id) == null){
                return [...currItems,{id,quantity:1}]
            }else{
                return currItems.map(item => {
                    if(item.id === id){
                       return  {...item,quantity:item.quantity+1};
                    }else{
                        return item
                    }    
            })
            }
        })
    }

    function decreaseCartQuantity(id:number){
        setcartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item=>item.id !== id)
            }else{
                return currItems.map(item => {
                    if(item.id === id){
                       return  {...item,quantity:item.quantity-1};
                    }else{
                        return item
                    }    
            })
            }
        })
    }

    function removeFromCart(id:number){
       setcartItems(currItems => {
        return currItems.filter(item=>item.id !== id)
       })
    }

    return <ShoppingCartContext.Provider value={{getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart}} > 
        {children}
    </ShoppingCartContext.Provider>
}