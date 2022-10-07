import React from "react";
import { Login } from "./types";
interface Props {
    login: Login;
    logout: () => void;
    onDismiss?: () => void;
    handleConfirm?: () => void;
    handleReject?: () => void;
    displayCount?: number;
}
declare const ConnectModal: React.FC<Props>;
export default ConnectModal;
