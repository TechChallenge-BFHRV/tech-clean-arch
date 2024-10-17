export const Step: {
    START: 'START';
    MEAL: 'MEAL';
    DRINK: 'DRINK';
    SIDE_DISH: 'SIDE_DISH';
    DESERT: 'DESERT';
    CHECKOUT: 'CHECKOUT';
    PAYMENT_REQUEST: 'PAYMENT_REQUEST';
    COMPLETED: 'COMPLETED';
  } = {
    START: 'START',
    MEAL: 'MEAL',
    DRINK: 'DRINK',
    SIDE_DISH: 'SIDE_DISH',
    DESERT: 'DESERT',
    CHECKOUT: 'CHECKOUT',
    PAYMENT_REQUEST: 'PAYMENT_REQUEST',
    COMPLETED: 'COMPLETED',
  };
  
  export type Step = (typeof Step)[keyof typeof Step];
  