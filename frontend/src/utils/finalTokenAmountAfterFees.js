export const finalTokenOutputAfterFees = (amount) => {
    let finalAmount =amount - amount / 100;
    return finalAmount<0?0:finalAmount;
};