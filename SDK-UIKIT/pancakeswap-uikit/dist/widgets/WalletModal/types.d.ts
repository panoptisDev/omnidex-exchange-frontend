import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";
export declare enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect",
    Anchor = "anchor"
}
export declare type Login = (connectorId: ConnectorNames) => Promise<any>;
export interface Config {
    title: string;
    icon: FC<SvgProps>;
    connectorId: ConnectorNames;
    priority: number;
}
