import React from "react";
import useShoppingCart from "../context/ShoppingCartContext";
import storeitems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item=storeitems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <div>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                {quantity}x
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.price)}
          </div>
          <div className="text-muted ms-auto" style={{ fontSize: "1.5rem" }}>
            {formatCurrency(item.price * quantity)}
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              removeFromCart(item.id);
            }}
          >
            &times;
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default CartItem;
