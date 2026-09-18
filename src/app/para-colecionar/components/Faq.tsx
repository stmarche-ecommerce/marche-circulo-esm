'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PT_Sans } from 'next/font/google'
import Link from 'next/link'

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

// -----------------------------------------------------------------------
// Conteúdo da FAQ
// Edite os textos aqui — o componente cuida do layout e do comportamento.
// -----------------------------------------------------------------------

type FaqItem = {
  question: string
  answer: React.ReactNode
}

function ExemplosTable({
  rows,
}: {
  rows: { valor: string; selos: string }[]
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-stone-300">
      <div className="bg-[#494542] py-2 text-center text-sm font-bold uppercase tracking-wide text-white">
        Exemplos
      </div>
      <table className="w-full border-collapse text-left">
        <tbody>
          {rows.map((row) => (
            <tr key={row.valor} className="border-t border-stone-300">
              <td className="border-r border-stone-300 px-4 py-2 font-medium text-stone-900">
                {row.valor}
              </td>
              <td className="px-4 py-2">{row.selos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const faqItems: FaqItem[] = [
  {
    question: 'Qual o período de realização da campanha?',
    answer: (
      <ul className="space-y-3">
        <li>
          <span className="font-medium text-stone-900">PERÍODO DA AÇÃO:</span>{' '}
          21/09/2026 A 20/12/2026 OU ENQUANTO DURAREM OS ESTOQUES;
        </li>
        <li>
          <span className="font-medium text-stone-900">
            PERÍODO DA ENTREGA DE SELOS DE DESCONTO:
          </span>{' '}
          21/09/2026 A 13/12/2026 OU ENQUANTO DURAREM OS ESTOQUES. A PARTIR DE
          14/12/2026, NÃO HAVERÁ MAIS DISTRIBUIÇÃO DE SELOS;
        </li>
        <li>
          <span className="font-medium text-stone-900">
            PERÍODO DO RESGATE DE PRODUTOS COM DESCONTO:
          </span>{' '}
          21/09/2026 A 20/12/2026 OU ENQUANTO DURAREM OS ESTOQUES.
        </li>
      </ul>
    ),
  },
  {
    question: 'Qualquer pessoa pode participar da campanha de descontos?',
    answer: (
      <div className="space-y-3">
        <p>
          A AÇÃO DE DESCONTO É VÁLIDA APENAS PARA PESSOAS FÍSICAS, CAPAZES E MAIORES DE (18) DEZOITO ANOS, DOMICILIADAS NO BRASIL E CADASTRADAS NO PROGRAMA “CÍRCULO SANTA MARIA”.
        </p>
        <p>
          A COMPRA SEM DESCONTO PODERÁ SER REALIZADA POR CLIENTES PARTICIPANTES OU NÃO DO PROGRAMA “CÍRCULO SANTA MARIA”, CONFORME DISPONIBILIDADE DE ESTOQUE. NÃO PARTICIPAM DESTA CAMPANHA COMPRAS REALIZADAS COM CNPJ.
        </p>
      </div>
    ),
  },
  {
    question: 'Como o cliente pode participar da campanha e acumular selos de desconto?',
    answer: (
      <div className="space-y-4">
        <p>
          A CADA R$40,00 (QUARENTA REAIS) EM COMPRAS, EM UMA ÚNICA NOTA/CUPOM FISCAL, REALIZADAS NAS LOJA FÍSICA PARTICIPANTE DO EMPÓRIO SANTA MARIA, DISPONÍVEIS NO SITE:{' '}
          <Link href="https://emporiosantamaria.com.br" target="_blank" className="underline">
            https://emporiosantamaria.com.br
          </Link>{' '}
          BEM COMO WHATSAPP, NO PERÍODO DE PARTICIPAÇÃO DE 21/09/2026 A 13/12/2026), O CLIENTE CÍRCULO SANTA MARIA RECEBERÁ 01 (UM) SELO DE DESCONTO, PARA ACUMULAR E COMPRAR COM O DESCONTO QUE FIZER JUS, OS PRODUTOS LE CORDON BLEU® PARTICIPANTES, CONFORME CONDIÇÕES ESTABELECIDAS NAS REGRAS DE PARTICIPAÇÃO.
        </p>
        <p>
          NO CASO DE COMPRAS PARCELADAS SERÁ SEMPRE CONSIDERADO O TOTAL DO COMPROVANTE E NÃO O VALOR DA PARCELA. OS VALORES RESIDUAIS DOS COMPROVANTES FISCAIS NÃO SERÃO REAPROVEITADOS, OU SEJA, HAVENDO SALDOS RESIDUAIS, ESTES SERÃO DESCONSIDERADOS PARA OBTENÇÃO DE NOVOS SELOS DE DESCONTO.
        </p>
        <ExemplosTable
          rows={[
            { valor: 'R$ 40,00', selos: '1 SELO DE DESCONTO' },
            { valor: 'R$ 79,99', selos: '1 SELO DE DESCONTO' },
            { valor: 'R$ 119,00', selos: '2 SELO DE DESCONTOS' },
            { valor: 'R$ 159,00', selos: '2 SELO DE DESCONTOS' },
          ]}
        />
      </div>
    ),
  },
  {
    question: 'Não participam desta ação os seguintes produtos, caso sejam adquiridos:',
    answer: (
      <div className="space-y-3">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            MEDICAMENTOS, ARMAS E MUNIÇÕES, FOGOS DE ARTIFÍCIO OU DE ESTAMPIDO, BEBIDAS ALCOÓLICAS COM GRADUAÇÃO ACIMA DE 13º, FUMO E SEUS DERIVADOS, CONFORME DETERMINA O ARTIGO 10, DO DECRETO Nº 70.951/72.
          </li>
          <li>
            FÓRMULAS INFANTIS PARA LACTENTES E DE SEGUIMENTO PARA LACTENTES (0-12 MESES DE IDADE), CONFORME A LEI (LEI Nº 11.265, DE 3 DE JANEIRO DE 2006, E REGULAMENTAÇÕES SUBSEQUENTES “LEGISLAÇÃO LOCAL”) QUE VISA PROTEGER O ALEITAMENTO MATERNO E QUE REGULAMENTA A COMERCIALIZAÇÃO DOS PRODUTOS DESTINADOS À ALIMENTAÇÃO DE LACTENTES E CRIANÇAS DE PRIMEIRA INFÂNCIA.
          </li>

          <li>
            CASO CONSTEM PRODUTOS MENSURADOS NOS ITENS 6.1.1. E 6.1.2. NO COMPROVANTE FISCAL, OS VALORES DESTES, SERÃO DESCONTADOS DA COMPRA E CONSIDERADOS APENAS OS DEMAIS PRODUTOS VÁLIDOS.
          </li>

          <li>
            AS COMPRAS REALIZADAS POR MEIO DO APLICATIVO RAPPI E IFOOD, OUTROS APLICATIVOS DE ENTREGA OU SITE QUE VENHA A COMERCIALIZAR PRODUTOS DA LOJA EMPÓRIO SANTA MARIA, QUE NÃO O PRÓPRIO EMPÓRIO SANTA MARIA, NOS FORMATOS AQUI DESCRITOS.
          </li>

          <li>
            SERVIÇOS COMO, POR EXEMPLO, PAGAMENTO DE CONTAS, TICKETS DE ESTACIONAMENTO, TAXAS DE ENTREGA DE SITES/DELIVERY, CONVÊNIOS, PEDIDOS FEITOS DIRETAMENTE NO TOTEM DO CAFÉ DO SANTA MARIA EMPÓRIO. NESTE CASO, O CLIENTE DO CÍRCULO SANTA MARIA, DEVERÁ DIRIGIR-SE AO CAIXA, PARA PAGAMENTO DA SUA COMANDA E OBTENÇÃO DOS SELOS DE DESCONTO.
          </li>

          <li>
            TOTEM DO SANTA MARIA EMPÓRIO NÃO PARTICIPARÁ DESTA CAMPANHA COM A AÇÃO DE ENTREGA DE SELOS PARA OS CLIENTES DO CÍRCULO SANTA MARIA
          </li>

          <li>
            NENHUMA OFERTA DE VOUCHER OU DESCONTO, INDEPENDENTEMENTE DA SUA FORMA OU ORIGEM, SERÁ CONSIDERADA ELEGÍVEL PARA A GERAÇÃO DE SELOS NESTA CAMPANHA.
          </li>

          <li>
            A COMPRA COM DESCONTO DAS CAÇAROLAS, FRIGIDEIRA E WOK DE FERRO DA MARCA LE CORDON BLEU®. OU SEJA, O VALOR A SER PAGO NA AQUISIÇÃO DO ITEM NÃO SERÁ REVERTIDO EM SELO, UMA VEZ QUE, SE DESTINA A COMPLEMENTAR O VALOR DO PRODUTO, JÁ COM DESCONTO DECORRENTE DA QUANTIDADE DE SELOS APRESENTADOS.
          </li>

          <li>
            NOS CASOS DE DEVOLUÇÃO OU TROCA DE PRODUTOS ADQUIRIDOS, OS CONSUMIDORES TAMBÉM NÃO TERÃO DIREITO A RECEBER SELOS DE DESCONTO, EXCETO SE FOR DESEMBOLSADO VALOR EXCEDENTE AO QUE ULTRAPASSE R$ 40,00 (QUARENTA REAIS), RESSALVADAS AS HIPÓTESES DO ITEM 6 DO REGULAMENTO. NESTA CAMPANHA, SERÁ ENTREGUE A QUANTIDADE MÁXIMA DE 500 (QUINHENTOS) SELOS POR TRANSAÇÃO/COMPRA, INDEPENDENTEMENTE DO VALOR TOTAL PAGO PELO CLIENTE DO CÍRCULO SANTA MARIA.
          </li>
        </ul>

        <p className="text-bold">NESTA CAMPANHA, SERÁ ENTREGUE A QUANTIDADE MÁXIMA DE 500 (QUINHENTOS) SELOS POR TRANSAÇÃO/COMPRA, INDEPENDENTEMENTE DO VALOR TOTAL PAGO PELO CLIENTE CÍRCULO SANTA MARIA.</p>

      </div>
    ),
  },
  {
    question: 'Como receberei os selos de desconto?',
    answer: (
      <div className="space-y-3">
        <p>
          PARA AS COMPRAS REALIZADAS NA LOJA FÍSICA PARTICIPANTE, BEM COMO NO WHATSAPP, OS SELOS DE DESCONTO CORRESPONDENTES AO VALOR TOTAL DA COMPRA EFETIVAMENTE PAGA CONFORME CONDIÇÕES DESCRITAS NO REGULAMENTO, SERÃO ENTREGUES IMEDIATAMENTE E DIRETAMENTE AO PARTICIPANTE PELO OPERADOR DE CAIXA RESPONSÁVEL PELO ATENDIMENTO, MEDIANTE:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            CONFIRMAÇÃO DO CLIENTE “CÍRCULO SANTA MARIA” NA TECLA VERDE DO PINPAD DO CAIXA, COMO FORMA DE REGISTRO DE SEU ACEITE E RECEBIMENTO DE SEUS SELOS DE DESCONTO E;
          </li>
          <li>REALIZAÇÃO DO PAGAMENTO DE SUAS COMPRAS.</li>
        </ol>
        <p>
          PARA AS COMPRAS REALIZADAS NOS SELF-CHECKOUTS DAS LOJAS PARTICIPANTES, O CLIENTE DE CÍRCULO SANTA MARIA DEVERÁ RETIRAR SEUS SELOS IMEDIATAMENTE APÓS O ACEITE NO PINPAD E PAGAMENTO DE SUAS COMPRAS, COM OS OPERADORES AUXILIARES PRESENTES NOS SELF-CHECKOUTS, NÃO SENDO ESTES ENTREGUES POSTERIORMENTE, SOB NENHUMA HIPÓTESE.
        </p>
        <p>
          IMPORTANTE: OS SELOS DE DESCONTO DEVERÃO SER RETIRADOS, OBRIGATORIAMENTE, NO ATO DA COMPRA E NA MESMA LOJA EM QUE A COMPRA FOR EFETUADA. SE NO MOMENTO DA COMPRA O CLIENTE DO CÍRCULO SANTA MARIA NÃO OU MANIFESTAR RECUSA PELOS SELOS DE DESCONTO (SELECIONANDO A TECLA VERMELHA DO PIN PAD), PERDERÁ O DIREITO DE REIVINDICÁ-LOS POSTERIORMENTE, POR QUALQUER HIPÓTESE.
        </p>
        <p>
          EM TODOS OS CASOS, O CLIENTE DO CÍRCULO SANTA MARIA DEVERÁ CONFERIR A QUANTIDADE DE SELOS DE DESCONTO A QUE FAZ JUS NO EXATO MOMENTO EM QUE RECEBÊ-LOS DA EMPRESA REALIZADORA DA AÇÃO, NÃO SENDO ACEITAS RECLAMAÇÕES POSTERIORES AO RECEBIMENTO.
        </p>
      </div>
    ),
  },
  {
    question: 'Quais produtos dão direito a selos de desconto?',
    answer: (
      <p>
        PARTICIPAM DESTA CAMPANHA TODOS OS PRODUTOS COMERCIALIZADOS NA LOJA EMPÓRIO SANTA MARIA, BEM COMO NO WHATSAPP, EXCETO OS ITENS LISTADOS NO ITEM 3 DO REGULAMENTO.
      </p>
    ),
  },
  {
    question: 'Em que momento o cliente do Círculo Santa Maria recebe a cartela da campanha?',
    answer: (
      <p>
        A QUALQUER MOMENTO A CARTELA PODERÁ SER RETIRADA NOS CAIXAS DAS LOJAS PARTICIPANTES.
      </p>
    ),
  },
  {
    question:
      'Como faço para usar os selos de desconto para comprar caçarolas, frigideira e wok Éternité Le Cordon Bleu® com desconto?',
    answer: (
      <div className="space-y-4">
        <p>
          A TROCA DA CARTELA COM SELOS DE DESCONTO PARA AQUISIÇÃO DO PRODUTO ESCOLHIDO PELO CLIENTE CÍRCULO SANTA MARIA, DEVERÁ SER EFETIVADA SOMENTE NOS CAIXAS DA LOJA FÍSICAS EMPÓRIO SANTA MARIA, ATÉ O DIA 20/12/2026 OU ENQUANTO DURAREM OS ESTOQUES, DENTRO DO HORÁRIO DE FUNCIONAMENTO DAS UNIDADES.
        </p>
        <p>
          OS PRODUTOS COLECIONÁVEIS PODERÃO SER ADQUIRIDOS PELOS PARTICIPANTES NO VALOR REGULAR DE VENDA (SEM DESCONTO) OU PELOS CLIENTES CÍRCULO SANTA MARIA COM O DESCONTO CONCEDIDO PELOS SELOS OBTIDOS.
        </p>
        <p>
          NÃO SERÃO EFETUADAS VENDAS COM OU SEM DESCONTO, DOS PRODUTOS PARTICIPANTES, NOS SELF-CHECKOUTS DAS LOJAS, APENAS NOS CAIXAS CONVENCIONAIS.
        </p>
        <div>
          <p className="font-bold text-stone-900">01 - COMPRA SEM DESCONTO</p>
          <p>
            QUALQUER CLIENTE QUE DESEJAR ADQUIRIR AS CAÇAROLAS, FRIGIDEIRA E WOK ÉTERNITÉ LE CORDON BLEU® PODERÁ COMPRAR PELO VALOR DE VENDA SEM DESCONTO, SEM A NECESSIDADE DE APRESENTAR A CARTELA PREENCHIDA.
          </p>
          <p>
            A AQUISIÇÃO DOS PRODUTOS COLECIONÁVEIS NO VALOR REGULAR DE VENDA (SEM DESCONTO) SERÁ REALIZADO NO PERÍODO REGULAR DA CAMPANHA OU ENQUANTO DURAREM OS ESTOQUES.
          </p>
        </div>
        <div>
          <p className="font-bold text-stone-900">02 - COMPRA COM DESCONTO</p>
          <p>
            PARA A AQUISIÇÃO DO PRODUTO DESEJADO COM DESCONTO, O CLIENTE CÍRCULO SANTA MARIA APRESENTAR APENAS A PÁGINA COM OS SELOS DE DESCONTO COLADOS (SEM A NECESSIDADE DE QUALQUER OUTRA PÁGINA QUE COMPÕE A CARTELA), PORÉM, TODOS OS SELOS DE DESCONTO DEVERÃO ESTAR EM BOAS CONDIÇÕES DE LEGIBILIDADE E VERIFICAÇÃO DE SUA AUTENTICIDADE, SEM MANCHAS, RASURAS OU RASGOS QUE DIFICULTEM SUA VERIFICAÇÃO. OS SELOS DE DESCONTO DEVERÃO SER COLADOS NA CARTELA DA AÇÃO (DISPONÍVEL NAS LOJAS PARTICIPANTES) ATÉ QUE SEJAM ALCANÇADAS AS QUANTIDADES INDICADAS NA PRÓPRIA CARTELA COMO CONDICIONANTE PARA OBTENÇÃO DOS PRODUTOS.
          </p>
          <p>NÃO HÁ DESCONTO DE 100% NO VALOR DOS PRODUTOS.</p>
          <p>
            APÓS O PROCESSO DE TROCA DA CARTELA E AQUISIÇÃO DO PRODUTO DESEJADO, ESTA FICARÁ RETIDA PELA REALIZADORA E ANULADA PARA EFEITO DE NOVA PARTICIPAÇÃO NESTA AÇÃO, INDEPENDENTEMENTE SE NELA ESTIVEREM COLADOS SELOS DE DESCONTO EXCEDENTES À QUANTIDADE NECESSÁRIA.
          </p>
        </div>
      </div>
    ),
  },
  {
    question:
      'Se eu completar toda a cartela com selos de desconto, terei direito de utilizá-la para comprar todas as caçarolas, frigideira e wok Éternité Le Cordon Bleu®?',
    answer: (
      <div className="space-y-3">
        <p>
          NÃO. CADA CARTELA DARÁ DIREITO A COMPRA COM DESCONTO DE APENAS 01 (UM) PRODUTO ÉTERNITÉ LE CORDON BLEU®. O CLIENTE DEVERÁ APRESENTAR A CARTELA COM A QUANTIDADE DE SELOS DE DESCONTO RESPECTIVO AO PRODUTO ESCOLHIDO PARA EFETUAR CADA COMPRA COM DESCONTO, SENDO QUE:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>CADA CARTELA CORRESPONDERÁ A 01 (UMA) TROCA PELO PRODUTO DESEJADO;</li>
          <li>
            NÃO SERÁ ACEITO, EM HIPÓTESE ALGUMA, DIVISÃO DE SELOS COLADOS EM CARTELAS DIFERENTES PARA AQUISIÇÃO DE UM PRODUTO, DE MODO QUE CADA CARTELA CORRESPONDERÁ, PORTANTO, A UMA ÚNICA AQUISIÇÃO, SEM DESMEMBRAMENTO E/OU DIVISÃO DE SELOS.
          </li>
        </ol>
      </div>
    ),
  },
  {
    question: 'Quantas vezes o cliente pode participar desta campanha de venda com desconto?',
    answer: (
      <p>
        A COMPRA DOS PRODUTOS COLECIONÁVEIS COM DESCONTO SERÁ LIMITADA AOS CLIENTES “CÍRCULO SANTA MARIA” A 16 PRODUTOS POR CPF.
      </p>
    ),
  },
  {
    question:
      'Posso efetuar a troca por outro modelo das caçarolas, frigideira e wok Éternité Le Cordon Bleu® já adquirido com ou sem desconto depois de retirado na loja?',
    answer: (
      <div className="space-y-3">
        <p>
          NÃO. UMA VEZ REALIZADA A COMPRA COM DESCONTO OU PELO VALOR REGULAR DE VENDA (SEM DESCONTO) DO PRODUTO DA CAMPANHA, O PARTICIPANTE NÃO PODERÁ SOLICITAR A TROCA DESTE POR OUTRO PRODUTO SEM QUE HAJA RAZÃO LEGAL PARA TANTO (SENDO ESTE DA CAMPANHA OU NÃO), TAMPOUCO SOLICITAR A DEVOLUÇÃO E/OU CANCELAMENTO DA OPERAÇÃO, EXCETO POR VÍCIO E/OU DEFEITO DE FABRICAÇÃO, CONFORME PREVÊ O CÓDIGO DE DEFESA DO CONSUMIDOR.
        </p>
        <p>
          SE NA OCASIÃO DO RECEBIMENTO DO PRODUTO ADQUIRIDO PELO PARTICIPANTE FOR CONSTATADA ALGUMA IRREGULARIDADE, COMO POR EXEMPLO, VÍCIO OU DEFEITO DE ORIGEM NO RESPECTIVO PRODUTO, O PARTICIPANTE DEVERÁ SOLICITAR A TROCA IMEDIATA POR OUTRO EM PERFEITAS CONDIÇÕES.
        </p>
        <p>
          SOMENTE SERÃO CONSIDERADOS DEFEITOS NESTA CAMPANHA PARA TROCA DAS CAÇAROLAS, FRIGIDEIRA E WOK DE FERRO DA MARCA LE CORDON BLEU®.
        </p>
        <p>A) DEFEITOS NA PINTURA</p>
        <p>B) DEFEITOS NA FORMA</p>
      </div>
    ),
  },
  {
    question:
      'Posso adquirir as caçarolas, frigideira e wok Éternité Le Cordon Bleu® em qualquer loja, com ou sem desconto?',
    answer: (
      <p>
        SIM. AS CAÇAROLAS, FRIGIDEIRA E WOK DE FERRO LE CORDON BLEU® PODEM SER ADQUIRIDAS NA LOJA EMPÓRIO SANTA MARIA PARTICIPANTE DA CAMPANHA, COM OU SEM DESCONTO, RESPEITANDO AS CONDIÇÕES PREVISTAS NAS REGRAS DE PARTICIPAÇÃO E DISPONIBILIDADE DE ESTOQUE DOS PRODUTOS NA LOJA FÍSICA PARTICIPANTE.
      </p>
    ),
  },
  {
    question:
      'Posso receber selos de desconto em uma loja e efetuar a retirada das caçarolas, frigideira e wok Éternité Le Cordon Bleu® em outra unidade diferente?',
    answer: (
      <p>
        SIM. OS SELOS DE DESCONTO PODERÃO SER UTILIZADOS PARA COMPRA COM DESCONTO NA LOJA EMPÓRIO SANTA MARIA PARTICIPANTE.
      </p>
    ),
  },
  {
    question: 'Como posso aumentar a quantidade de selos de desconto por compra?',
    answer: (
      <div className="space-y-4">
        <p>
          NA CAMPANHA HAVERÁ ALGUNS PRODUTOS “ACELERADORES” QUE VALEM SELOS DE DESCONTO ADICIONAIS. AO ADQUIRIR A QUANTIDADE DE “PRODUTOS ACELERADORES” NECESSÁRIA, O CLIENTE CÍRCULO SANTA MARIA RECEBERÁ SELO(S) DE DESCONTO EXTRAS.
        </p>
        <div className="rounded-lg border border-stone-300 p-4 text-center">
          <p className="font-bold uppercase text-stone-900">Exemplo</p>
          <p className="mt-2">
            01 (UM) SELO DE DESCONTOS PELA COMPRA REGULAR DE R$ 40,00 (QUARENTA REAIS)
          </p>
          <p className="font-bold">X</p>
          <p>01 (UM) SELO DE DESCONTO PELA COMPRA DO PRODUTO ACELERADOR</p>
          <p className="font-bold">=</p>
          <p className="font-bold text-stone-900">02 (DOIS) SELOS DE DESCONTO</p>
        </div>
        <p>
          IMPORTANTE: OS PRODUTOS ACELERADORES CONCEDEM SELOS DE DESCONTO ADICIONAIS DESDE QUE O VALOR FINAL PAGO PELO CLIENTE SEJA NO MÍNIMO R$40,00 EM PRODUTOS PARTICIPANTES, CONFORME REGRAS DE PARTICIPAÇÃO.
        </p>
      </div>
    ),
  },
  {
    question: 'As caçarolas, frigideira e wok Éternité Le Cordon Bleu® podem ser utilizadas na lava-louças?',
    answer: (
      <div className="space-y-3">
        <p>
          NÃO. AS CAÇAROLAS, FRIGIDEIRA E WOK DE FERRO LE CORDON BLEU® NÃO SÃO INDICADAS PARA USO NA LAVA-LOUÇAS. EMBORA ALGUMAS PANELAS DE FERRO FUNDIDO ESMALTADO POSSAM SER LAVADAS NA LAVA-LOUÇAS, A LAVAGEM À MÃO É SEMPRE RECOMENDADA PARA PRESERVAR A BELEZA E A DURABILIDADE DO ESMALTE.
        </p>
        <p>*É RECOMENDÁVEL A VERIFICAÇÃO DOS CUIDADOS DE USO NAS EMBALAGENS DE CADA PRODUTO.</p>
      </div>
    ),
  },
  {
    question: 'Se ainda restar dúvidas, qual o canal de atendimento ao cliente para a campanha?',
    answer: (
      <p>
        EM CASO DE DÚVIDAS SOBRE A AÇÃO, OS CLIENTES DEVERÃO ENTRAR EM CONTATO COM A EMPRESA REALIZADORA, POR MEIO DO TELEFONE (11) 3708-5211 / (11) 3708-5210 OU PELO E-MAIL{' '}
        <Link href="mailto:SAC@EMPORIOSANTAMARIA.COM.BR" className="underline">
          SAC@EMPORIOSANTAMARIA.COM.BR
        </Link>
        , OU PELO SITE{' '}
        <Link href="https://www.emporiosantamaria.com.br/" target="_blank" className="underline">
          https://www.emporiosantamaria.com.br/
        </Link>
        , CONTATANDO O SANTA MARIA EMPÓRIO.
      </p>
    ),
  },
]

// -----------------------------------------------------------------------
// Item de acordeão
// -----------------------------------------------------------------------

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div className="border-b border-stone-200 last:border-b-0">
      <h3 >
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-4 py-5 text-left"
        >
          <span className="text-[15px] font-bold uppercase leading-snug text-stone-900 sm:text-base">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={`mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-stone-300 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-45 border-[#B8862E] text-[#B8862E]' : ''
              }`}
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex justify-items-start pb-5 pr-9 font-medium text-[0.800rem] leading-relaxed text-[#2a2b2e]">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------
// Modal
// -----------------------------------------------------------------------

function FaqModal({ onClose }: { onClose: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = original
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div className={`${ptSans.className} fixed inset-0 z-100 flex items-end justify-center text-left sm:items-center sm:p-6`}>
      {/* backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="faq-modal-title"
        className="relative flex max-h-[89vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 bg-[#494542] px-6 py-6 sm:px-8">
          <h1 className="w-full text-5xl flex items-center justify-center">FAQ</h1>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-stone-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* body */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8">
          <div className="text-zinc-900 mb-10">
            <p className="w-full  flex justify-start">
              “EU AMO SELOS EMPÓRIO SANTA MARIA – CAÇAROLAS, FRIGIDEIRA E WOK ÉTERNITÉ LE CORDON BLEU®” Antes de participar, consulte Regulamento em: <br />
            </p>
            <Link href="https://emporiosantamaria.com.br" target="_blank">https://emporiosantamaria.com.br</Link>

          </div>
          <div>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// -----------------------------------------------------------------------
// Ponto de entrada: link que abre a FAQ
// -----------------------------------------------------------------------

export function SelosFaqLink({
  label = 'Dúvidas frequentes',
  className,
  wrapperClassName,
}: {
  label?: string
  className?: string
  wrapperClassName?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`${ptSans.className} ${wrapperClassName ?? ''}`}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ??
          'text-sm font-medium text-[#1F2A1A] underline decoration-[#C9973B] decoration-2 underline-offset-4 transition-opacity hover:opacity-70'
        }
      >
        {label}
      </button>

      {isOpen && <FaqModal onClose={() => setIsOpen(false)} />}
    </div>
  )
}

export default SelosFaqLink
