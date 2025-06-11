import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

export interface MetaMaskProfile {
  id: string;
  address: string;
  chainId: string;
  networkName: string;
}

export default function MetaMaskProvider<P extends MetaMaskProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "metamask",
    name: "MetaMask",
    type: "oauth",
    authorization: {
      url: "https://metamask.io/connect",
      params: {
        scope: "wallet",
        response_type: "code",
      },
    },
    token: {
      url: "https://metamask.io/api/oauth/token",
    },
    userinfo: {
      url: "https://metamask.io/api/user",
    },
    profile(profile: any) {
      return {
        id: profile.address,
        name: `MetaMask (${profile.address.slice(0, 6)}...${profile.address.slice(-4)})`,
        email: null,
        image: `https://api.dicebear.com/7.x/identicon/svg?seed=${profile.address}`,
        address: profile.address,
        chainId: profile.chainId,
        networkName: profile.networkName || 'Ethereum'
      };
    },
    style: {
      logo: "/metamask-logo.svg",
      bg: "#f6851b",
      text: "#fff"
    },
    options,
  };
} 