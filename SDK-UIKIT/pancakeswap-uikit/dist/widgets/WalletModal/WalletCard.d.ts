import React from "react";
import { ButtonProps } from "../../components/Button";
import { Login, Config } from "./types";
interface Props {
    walletConfig: Config;
    login: Login;
    logout: () => void;
    onDismiss: () => void;
    handleConfirm?: () => void;
    handleReject?: () => void;
}
export declare const MoreWalletCard: React.FC<ButtonProps>;
declare const WalletCard: React.FC<Props>;
export default WalletCard;
