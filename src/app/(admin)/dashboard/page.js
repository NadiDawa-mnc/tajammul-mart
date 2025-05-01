import AddProduct from '@/app/components/addProduct/addproduct'
import Card from '@/app/components/card/card'
import ProductList from '@/app/components/productList/productList'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard </h1>
      <AddProduct />
      <ProductList />
      <Card />
    </div>
  )
}
