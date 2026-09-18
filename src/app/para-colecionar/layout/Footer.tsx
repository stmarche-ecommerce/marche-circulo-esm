import Link from "next/link"
import { Fragment } from "react"
import Image from "next/image";
import styles from "../para-colecionar.module.css";

export const Footer = () => {
  return (
    <Fragment>
      <div className={styles.partner}>
        <p>Parceria:</p>
        <Image
          src="/images/para-colecionar/logo-loyaltycom.png"
          alt="Loyaltycom"
          width={690}
          height={106}
          sizes="(min-width: 690px) 690px, 90vw"
          style={{ width: "min(690px, 90%)", height: "auto" }}
        />
      </div>

      <section className={styles.footerInner}>
        <p className={styles.legal}>
          Período para acumular selos de desconto: 21/09/2026 a 13/12/2026 (ou enquanto durarem os estoques dos
          produtos, o que ocorrer primeiro na loja Santa Maria Empório). De 14/12/2026 a 20/12/2026 não haverá a
          distribuição de selos de desconto, mas o cliente do Círculo Santa Maria poderá comprar as caçarolas,
          frigideira e wok de ferro da marca Le Cordon Bleu® participantes, fabricados na China, com ou sem
          desconto, conforme disponibilidade de estoque. A cada R$ 40,00 em compras na loja física Empório Santa
          Maria, bem como no site{" "}
          <Link href="https://www.emporiosantamaria.com.br" target="_blank" rel="noopener noreferrer">
            emporiosantamaria.com.br
          </Link>
          , em um único cupom fiscal, o cliente do Círculo Santa Maria terá direito a 01 (um) selo de desconto,
          para acumular e comprar as caçarolas, frigideira e wok de ferro da marca Le Cordon Bleu® participantes,
          com o desconto que fizer jus. Quantidade máxima de 500 selos entregue por transação/compra,
          independentemente do valor total pago pelo cliente do Círculo Santa Maria. Os valores residuais dos
          comprovantes fiscais serão desconsiderados para obtenção de novos selos de desconto. Estão excluídos
          para fins de entrega de selos de desconto os valores referentes à: devolução ou troca de produtos,
          tabaco, fumo e seus derivados, bebidas alcoólicas com graduação acima de 13%, medicamentos, fórmulas
          infantis para lactentes e de seguimento para lactentes (0-12 meses de idade), serviços, compras
          realizadas por aplicativos de entrega como iFood, Rappi ou sites que venham a comercializar produtos da
          loja Santa Maria Empório, que não o próprio Santa Maria Empório, e a compra com desconto das caçarolas,
          frigideira e wok de ferro da marca Le Cordon Bleu®. Nenhuma oferta de voucher ou desconto,
          independentemente da sua forma ou origem, será considerada elegível para a geração de selos nesta
          campanha. É permitida a compra com desconto de apenas 01 (um) produto por cada cartela. Os
          participantes concordam em ceder, de forma gratuita, os direitos de uso de imagem e som de voz, sem
          qualquer ônus para a realizadora, para uso exclusivo na divulgação desta ação, pelo período de doze
          meses após seu término. Os participantes autorizam a realizadora a proceder com o tratamento de seus
          dados pessoais fornecidos para cadastro e gozo dos benefícios da campanha para finalidade de controle,
          segurança e promoção da campanha. Não utilizar material abrasivo na limpeza das caçarolas, frigideira e
          wok de ferro da marca Le Cordon Bleu®. É recomendado o uso de uma esponja macia. Após lavar, seque
          imediatamente por completo. Não utilizar utensílios de metal ou pontiagudos. Consulte todas as regras
          de participação no site{" "}
          <Link
            href="https://emporiosantamaria.com.br"
            target="_blank" rel="noopener noreferrer"
            className="underline hover:text-emerald-700"
          >
            emporiosantamaria.com.br
          </Link>
          <br />
          <br />
          <strong>© 2026 – Empório Santa Maria - Todos os direitos reservados</strong>
        </p>
      </section>

    </Fragment>
  )
}