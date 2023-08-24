import { ConnectWallet} from "@thirdweb-dev/react";

const Header = () => {
  return (
    <div className='flex justify-between items-center  py-5 px-10 bg-black'>
        <img src='/assets/logo.png' alt='logo' />
         <ConnectWallet
        accentColor="#f213a4"
        colorMode="dark"
        width={{ base: "150px", md: "unset" }}
        style={{ background: "#3FDD78", color: "white" }}
      />
    </div>
  )
}

export default Header