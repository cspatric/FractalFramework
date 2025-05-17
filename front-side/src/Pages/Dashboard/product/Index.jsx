import Layout from '../../../Layouts/AuthLayout';

export default function Index({ products }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Produtos</h1>

      <ul className="space-y-2">
        {products?.map((product) => (
          <li key={product.id} className="p-4 bg-white rounded shadow">
            <p className="font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">Preço: R$ {product.price}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
