import { useSnackbar } from "notistack";

export function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  return {
    sucesso: (msg: string) => enqueueSnackbar(msg, { variant: "success" }),
    erro: (msg: string) => enqueueSnackbar(msg, { variant: "error" }),
    aviso: (msg: string) => enqueueSnackbar(msg, { variant: "warning" }),
    info: (msg: string) => enqueueSnackbar(msg, { variant: "info" }),
  };
}
