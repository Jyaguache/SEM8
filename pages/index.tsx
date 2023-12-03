import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Card } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { CardBody } from "@nextui-org/react";
import {Image} from "@nextui-org/react";

export default function IndexPage() {
    const productData = [
        {
          id: 1,
		  color: "#707070",
          name: "Cascos MSA",
          imageUrl:
            "https://www.atproteccion.com/10926/casco-msa-v-gard-fas-trac-ruleta.jpg",
        },
        {
          id: 2,
		  color: "#707070",
          name: "Mascaras MSA",
          imageUrl:
            "https://flashover.com.ar/wp-content/uploads/2020/10/Mascara-completa-full-face-MSA-Advantage-3200.jpg",
        },
        {
          id: 3,
		  color: "#707070",
          name: "Zapatos Seg.",
          imageUrl:
            "https://agroplanet.cl/wp-content/uploads/2020/03/7806215012622_7806215012622_1.jpg",
        },
        // Agrega más productos según sea necesario
      ];
    
      const categoryData = [
        {
          id: 1,
          name: "Protección para cabeza",
          imageUrl:
            "https://tienda.savisafety.com/wp-content/uploads/2023/02/BANNER-LARGO-5.jpg",
        },
        {
          id: 2,
          name: "Protección respiratoria",
          imageUrl:
            "https://assets.fishersci.com/TFS-Assets/CCG/product-images/F16890~p.eps-650.jpg",
        },
        {
          id: 3,
          name: "Protección para pies",
          imageUrl:
            "https://ae01.alicdn.com/kf/Hf831c45170be4d05bc9dfa4fb0ab93a4I/Zapatos-de-seguridad-c-modos-para-hombre-antigolpes-botas-de-trabajo-botas-protectoras-con-punta-de.jpg",
        },
        // Agrega más categorías según sea necesario
      ];
    
    return (
        <DefaultLayout>
	<div className="flex flex-col items-center space-y-8 mt-8">
        <h1 className="text-6xl font-extrabold text-center text-gray-700">
          ¡Registra tus Pedidos!
        </h1>
        <p className="text-lg text-center">
		 Puedes tomar un atajo y escoger los artículos más vendidos.
        </p>

        <h2 className="text-3xl font-bold">Productos destacados</h2>
        <div className="grid grid-cols-3 gap-6">
          {productData.map((product) => (
			<Link href={`/producto/${product.id}`} >
			
            <Card
              key={product.id}
              isBlurred
              style={{ backgroundColor: product.color }}
            >
              <CardBody className="flex flex-col items-center">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={150}
                  height={150}
                />
                <p className="text-center font-bold">{product.name}</p>
              </CardBody>
            </Card>
			</Link>
          ))}
        </div>

        <h2 className="text-3xl font-bold">Categorías de búsqueda</h2>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-3">
          {categoryData.map((category) => (
            <Card key={category.id} style={{ backgroundColor: '#707070' }}>
              <CardBody className="flex flex-col items-center justify-center">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={150}
                  height={150}
                  
                />
                <p className="text-center">{category.name}</p>
              </CardBody>
            </Card>
          ))}
        </div>
        <Link href="/registros">
          <Button color="warning" size="lg">
            Ingresa tu pedido!
          </Button>
        </Link>
      </div>
    </DefaultLayout>
  );
}