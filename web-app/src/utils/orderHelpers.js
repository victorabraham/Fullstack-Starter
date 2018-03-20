export function updateTotal(orders) {
  let orderList = [];
  for (let order of orders) {
    let total = 0;
    for(let item of order.orderItems) {
      total += item.price;
    }
    order.total = total;
    orderList.push(order);
  }
  return orderList;
} 
