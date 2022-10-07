import { Login } from "./types";
interface ReturnType {
    onPresentConnectModal: () => void;
    onPresentAccountModal: () => void;
}
declare const useWalletModal: (login: Login, logout: () => void, handleConfirm: () => void | undefined, handleReject: () => void | undefined, account?: string | undefined) => ReturnType;
export default useWalletModal;
