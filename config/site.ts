export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "SAFETY SUPPLY SERVICES 3S",
	description: "Aplicación para registrar órdenes de pedidos de ventas.",
	navItems: [
		
    {
      label: "Ingresar",
      href: "/ingresar",
    },
    {
      label: "Modificar",
      href: "/modificar",
    },
    {
      label: "Eliminar",
      href: "/eliminar",
    },
    {
      label: "Configuración",
      href: "/configuracion",
    }
	],
	navMenuItems: [
		{
			label: "Ingresar",
			href: "/ingresar",
		},
		{
			label: "Modificar",
			href: "/modificar",
		},
		{
			label: "Eliminar",
			href: "/eliminar",
		},
		{
			label: "Buscar",
			href: "/buscar",
		},
		{
			label: "Desconectar",
			href: "/desconectar",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui-docs-v2.vercel.app",
		discord: "https://discord.gg/9b6yyZKmH4",
    },
};
