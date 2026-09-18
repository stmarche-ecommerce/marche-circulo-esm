'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
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

const faqItems: FaqItem[] = [
  {
    question: 'Qual o período de realização da campanha?',
    answer: (
      <ul className="space-y-3">
        <li>
          <span className="font-medium text-stone-900">Período da ação:</span>{' '}
          21/09/2026 a 20/12/2026, ou enquanto durarem os estoques.
        </li>
        <li>
          <span className="font-medium text-stone-900">
            Entrega de selos de desconto:
          </span>{' '}
          21/09/2026 a 13/12/2026, ou enquanto durarem os estoques. A partir de
          14/12/2026 não há mais distribuição de selos.
        </li>
        <li>
          <span className="font-medium text-stone-900">
            Resgate de produtos com desconto:
          </span>{' '}
          21/09/2026 a 20/12/2026, ou enquanto durarem os estoques.
        </li>
      </ul>
    ),
  },
  {
    question: 'Qualquer pessoa pode participar da campanha de descontos?',
    answer: (
      <div className="space-y-3">
        <p>
          A ação de desconto é válida apenas para pessoas físicas, capazes e
          maiores de 18 anos, domiciliadas no Brasil e cadastradas no
          programa <span className="font-medium text-stone-900">Círculo Santa Maria</span>.
        </p>
        <p>
          A compra sem desconto pode ser feita por clientes participantes ou
          não do programa, conforme disponibilidade de estoque. Compras
          realizadas com CNPJ não participam desta campanha.
        </p>
      </div>
    ),
  },
  {
    question: 'Como acumular selos de desconto?',
    answer: (
      <div className="space-y-4">
        <p>
          A cada <span className="font-medium text-stone-900">R$ 40,00</span>{' '}
          em compras, em uma única nota ou cupom fiscal, nas lojas físicas
          participantes do Empório Santa Maria, no site ou pelo WhatsApp, o
          cliente Círculo Santa Maria recebe 1 selo de desconto — válido de
          21/09/2026 a 13/12/2026.
        </p>
        <p>
          Em compras parceladas, considera-se sempre o valor total do
          comprovante, e não o valor da parcela. Saldos residuais entre notas
          não são somados para gerar novos selos.
        </p>
        <figure className="overflow-hidden rounded-lg border border-stone-200">
          {/* TODO: adicionar a imagem da tabela de descontos por faixa de selos.
             Arquivo citado como estando "na mesma pasta" do documento original —
             salve-a em /public/campanhas/selos-le-cordon-bleu/tabela-descontos.png
             (ou ajuste o caminho abaixo) antes de publicar. */}
          <Image
            src="/images/para-colecionar/faq-tabela-exemplo.png"
            alt="Tabela de quantidade de selos por faixa de desconto"
            width={640}
            height={360}
            className="h-auto w-full"
          />
        </figure>
      </div>
    ),
  },
  {
    question: 'Quais produtos não participam desta campanha?',
    answer: (
      <div className="space-y-3">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Medicamentos, armas e munições, fogos de artifício ou de
            estampido, bebidas alcoólicas com graduação acima de 13º, fumo e
            seus derivados.
          </li>
          <li>
            Fórmulas infantis para lactentes e de seguimento para lactentes
            (0 a 12 meses de idade).
          </li>
        </ul>
        <p>
          Caso esses itens apareçam no mesmo cupom fiscal, seus valores são
          descontados do total da compra antes do cálculo dos selos.
        </p>
      </div>
    ),
  },
  {
    question: 'Compras pelo Rappi, iFood ou outros aplicativos geram selos?',
    answer: (
      <p>
        Não. Compras realizadas pelo Rappi, iFood, outros aplicativos de
        entrega ou sites terceiros que comercializem produtos do Empório
        Santa Maria não participam desta campanha.
      </p>
    ),
  },
  {
    question:
      'Pagamento de contas, estacionamento ou pedidos no totem do café geram selos?',
    answer: (
      <div className="space-y-3">
        <p>
          Serviços como pagamento de contas, tickets de estacionamento, taxas
          de entrega, convênios e pedidos feitos diretamente no totem do café
          do Santa Maria Empório não geram selos automaticamente.
        </p>
        <p>
          Para receber os selos, o cliente deve se dirigir ao caixa para
          pagar sua comanda. O totem do Santa Maria Empório não participa da
          entrega de selos.
        </p>
      </div>
    ),
  },
  {
    question: 'Vouchers ou outros descontos contam para gerar selos?',
    answer: (
      <p>
        Não. Nenhuma oferta de voucher ou desconto, independentemente da
        forma ou origem, é elegível para gerar selos nesta campanha.
      </p>
    ),
  },
  {
    question:
      'O valor pago pelas panelas Le Cordon Bleu® com desconto gera novos selos?',
    answer: (
      <p>
        Não. O valor pago na aquisição das caçarolas, frigideira e wok de
        ferro Le Cordon Bleu® com desconto não é revertido em selo — ele
        serve apenas para complementar o valor do produto, já com o desconto
        aplicado.
      </p>
    ),
  },
  {
    question: 'Em caso de devolução ou troca, o cliente recebe selos?',
    answer: (
      <p>
        Em regra, não. A exceção é quando é desembolsado valor excedente aos
        R$ 40,00 na troca, respeitadas as hipóteses previstas no item 6 do
        regulamento.
      </p>
    ),
  },
  {
    question: 'Existe um limite de selos por compra?',
    answer: (
      <p>
        Sim. O limite é de <span className="font-medium text-stone-900">500 selos por transação/compra</span>,
        independentemente do valor total pago pelo cliente Círculo Santa
        Maria.
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
    <div className={`${ptSans.className} fixed inset-0 z-50 flex items-end justify-center text-left sm:items-center sm:p-6`}>
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
