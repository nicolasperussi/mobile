export default function getOrderStatus(
  status: "CANCELED" | "WAITING" | "IN_PRODUCTION" | "IN_TRANSIT" | "DELIVERED"
) {
  if (status === "CANCELED")
    return { status, color: "bg-red-400", display: "Cancelado", icon: "ban" };
  if (status === "DELIVERED")
    return {
      status,
      color: "bg-green-400",
      display: "Pedido finalizado",
      icon: "check",
    };
  if (status === "IN_PRODUCTION")
    return {
      status,
      color: "bg-amber-400",
      display: "Em preparo",
      icon: "fire-burner",
    };
  if (status === "IN_TRANSIT")
    return {
      status,
      color: "bg-lime-400",
      display: "Saiu para entrega",
      icon: "truck",
    };
  return { status, color: "bg-zinc-400", display: "Pendente", icon: "clock" };
}
