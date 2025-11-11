import { create } from 'zustand';

const useCart = create((set, get) => ({
  cart: [],
  openModal: false,
  paymentIntent: '',
  onOpenModal: () => set((state) => ({ openModal: true })),
  onCloseModal: () => set((state) => ({ openModal: false })),
  setPaymentIntent: (val) => set((set) => ({ paymentIntent: val })),
  addProduct: (data) => {
    const { cart } = get();
    const cartItem = cart.find((item) => item.id === data.id);

    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === data.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      set((state) => ({ cart: newCart }));
    } else {
      set((state) => ({ cart: [...cart, { ...data, quantity: 1 }] }));
    }
  },
  removeProduct: (data) => {
    const { cart } = get();
    set((state) => ({
      cart: cart.filter((item) => item.id !== data.id),
    }));
  },
  setProduct: (product) => {
    const { cart } = get();
    const found = cart.find((item) => item.id === product.newProduct.id);
    if (found) {
      set((state) => ({
        cart: cart.map((item) =>
          item.id === product.newProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      set((state) => ({
        cart: [...cart, { ...product.newProduct, quantity: 1 }],
      }));
    }
  },
  increaseQuantity: (data) => {
    const { cart } = get();
    set((state) => ({
      cart: cart.map((item) =>
        item.id === data.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },
  decreaseQuantity: (data) => {
    const { cart } = get();
    set((state) => ({
      cart: cart.map((item) =>
        item.id === data.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  },
}));

export default useCart;
