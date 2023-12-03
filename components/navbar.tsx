import {
	Button,
	Kbd,
	Link,
	Input,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
	Image,
	Avatar,
  } from "@nextui-org/react";
  
  import { link as linkStyles } from "@nextui-org/theme";
  import { siteConfig } from "@/config/site";
  import NextLink from "next/link";
  import clsx from "clsx";
  import { ThemeSwitch } from "@/components/theme-switch";
  import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
  } from "@/components/icons";
  import { Logo } from "@/components/icons";
  
  export const Navbar = () => {
	const searchInput = (
	  <Input
		aria-label="Buscar pedido..."
		classNames={{
		  inputWrapper: "bg-white",
		  input: "text-9x1", // Ajustado a text-lg para un texto más grande
		}}
		endContent={<Kbd className="hidden lg:inline-block">K</Kbd>}
		labelPlacement="outside"
		placeholder="Buscar pedido..."
		startContent={
		  <SearchIcon className="text-base text-gray-700 pointer-events-none flex-shrink-0" />
		}
		type="search"
	  />
	);
  
	return (
	  <NextUINavbar
		maxWidth="xl"
		position="sticky"
		className="bg-gray-700 text-white"
	  >
		<NavbarContent className="basis-full" justify="start">
		  <NavbarBrand className="gap-1 max-w-fit">
			<NextLink className="flex justify-start items-center gap-1" href="/">

			  <p className="font-bold text-2xl">
				3S - ORDENES DE PEDIDOS
			  </p>
			  {/* Ajustado a text-2xl para un texto más grande */}
			</NextLink>
			
		  </NavbarBrand>
		  <div className="hidden lg:flex gap-4 justify-start ml-2">
			{siteConfig.navItems.map((item) => (
			  <NavbarItem key={item.href}>
				<NextLink
				  className={clsx(
					linkStyles({ color: "foreground" }),
					"data-[active=true]:text-primary data-[active=true]:font-medium text-xl" // Ajustado a text-xl para un texto más grande
				  )}
				  color="foreground"
				  href={item.href}
				>
				  {item.label}
				</NextLink>
			  </NavbarItem>
			))}
		  </div>
		</NavbarContent>
  
		<NavbarContent
		  className="hidden sm:flex basis-1/5 sm:basis-full"
		  justify="end"
		>
		  <NavbarItem className="hidden sm:flex gap-2">
			<Link isExternal href={siteConfig.links.twitter}>
			  <TwitterIcon className="text-white text-2xl" />
			</Link>
			<Link isExternal href={siteConfig.links.discord}>
			  <DiscordIcon className="text-white text-2xl" />
			</Link>
			<Link isExternal href={siteConfig.links.github}>
			  <GithubIcon className="text-white text-2xl" />
			</Link>
			<ThemeSwitch />
		  </NavbarItem>
		  <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
		  <NavbarItem className="hidden md:flex">
			<Avatar
			  isBordered
			  color="success"
			  src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
			/>
			
		  </NavbarItem>
		</NavbarContent>
  
		<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
		  <Link isExternal href={siteConfig.links.github}>
			<GithubIcon className="text-white text-2xl" />
		  </Link>
		  <ThemeSwitch />
		  <NavbarMenuToggle />
		</NavbarContent>
  
		<NavbarMenu>
		  {searchInput}
		  <div className="mx-4 mt-2 flex flex-col gap-2">
			{siteConfig.navMenuItems.map((item, index) => (
			  <NavbarMenuItem key={`${item}-${index}`}>
				<Link
				  color={
					index === 2
					  ? "primary"
					  : index === siteConfig.navMenuItems.length - 1
					  ? "danger"
					  : "foreground"
				  }
				  href="#"
				  size="lg" // Ajustado a 2xl para un texto más grande
				>
				  {item.label}
				</Link>
			  </NavbarMenuItem>
			))}
		  </div>
		</NavbarMenu>
	  </NextUINavbar>
	);
  };
  