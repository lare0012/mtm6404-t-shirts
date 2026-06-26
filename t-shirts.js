const initialTshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'grey-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

function TShirtCard(props) {
  const tshirt = props.tshirt
  const index = props.index
  const onBuy = props.onBuy
  const onQuantityChange = props.onQuantityChange

  const stockOptions = []
  for (let i = 1; i <= tshirt.stock; i++) {
    stockOptions.push(i)
  }

  return React.createElement('div', { className: 'card' },
    React.createElement('img', { src: 'images/' + tshirt.image, alt: tshirt.title }),
    React.createElement('h2', null, tshirt.title),
    React.createElement('p', { className: 'price' }, '$ ' + tshirt.price.toFixed(2)),
    tshirt.stock === 0
      ? React.createElement('p', { className: 'stock out-of-stock' }, 'Out of Stock')
      : React.createElement('p', { className: 'stock' }, tshirt.stock + ' left!'),
    tshirt.stock > 0
      ? React.createElement('div', null,
          React.createElement('select', {
            value: tshirt.quantity,
            onChange: function(e) { onQuantityChange(index, Number(e.target.value)) }
          }, stockOptions.map(function(num) {
            return React.createElement('option', { key: num, value: num }, num)
          })),
          React.createElement('button', { onClick: function() { onBuy(index) } }, 'Buy')
        )
      : null
  )
}

function App() {
  const [tshirts, setTshirts] = React.useState(initialTshirts)

  function handleQuantityChange(index, newQuantity) {
    const updated = tshirts.map(function(shirt, i) {
      if (i === index) {
        return Object.assign({}, shirt, { quantity: newQuantity })
      }
      return shirt
    })
    setTshirts(updated)
  }

  function handleBuy(index) {
    const updated = tshirts.map(function(shirt, i) {
      if (i === index) {
        return Object.assign({}, shirt, {
          stock: shirt.stock - shirt.quantity,
          quantity: 1
        })
      }
      return shirt
    })
    setTshirts(updated)
  }

  return React.createElement('div', null,
    React.createElement('h1', null, 'T-Shirts'),
    React.createElement('div', { className: 'store' },
      tshirts.map(function(shirt, index) {
        return React.createElement(TShirtCard, {
          key: index,
          tshirt: shirt,
          index: index,
          onBuy: handleBuy,
          onQuantityChange: handleQuantityChange
        })
      })
    )
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(React.createElement(App, null))
