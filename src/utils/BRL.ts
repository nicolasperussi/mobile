export default function BRL(value: number) {
  let BRLvalue = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return BRLvalue.format(value);
}
