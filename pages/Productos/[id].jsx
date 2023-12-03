import DefaultLayout from "@/layouts/default";
import { useRouter } from "next/router";

const ProductDetail = () => {

  const router = useRouter();
  const { id } = router.query;
  
  return (
    <DefaultLayout>
        product {id}
    </DefaultLayout>
  )
}

export default ProductDetail