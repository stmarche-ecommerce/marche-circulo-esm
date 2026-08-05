import Image from "next/image";
import { Bell, ChartColumn, Eye, Monitor } from "lucide-react";

type PolicySection = {
  title: string;
  body: string[];
};

const ITEM_STYLES = [
  {
    icon: Eye,
    iconWrapperClassName: "bg-[#ffefad] text-[#2563eb]",
  },
  {
    icon: Bell,
    iconWrapperClassName: "bg-[#dbeafe] text-[#2563eb]",
  },
  {
    icon: ChartColumn,
    iconWrapperClassName: "bg-[#f3e8ff] text-[#9333ea]",
  },
  {
    icon: Monitor,
    iconWrapperClassName: "bg-[#dcfce7] text-[#16a34a]",
  },
] as const;

const POLICY_SECTIONS: PolicySection[] = [
  {
    title: "1. Objetivo e abrangência",
    body: [
      "Esta Política de Privacidade explica como a Hortus Comércio de Alimentos S.A. (\"Hortus\", \"Empório Santa Maria\", \"nós\" ou \"nosso\") realiza o tratamento de dados pessoais de clientes, participantes do Programa Círculo Santa Maria, visitantes do site, usuários da área do cliente e pessoas que entram em contato com nossos canais de atendimento.",
      "Esta Política abrange, entre outras atividades, o cadastro e a participação no Círculo Santa Maria, a identificação de compras por CPF nas lojas físicas do Empório Santa Maria, a disponibilização de benefícios, preços exclusivos, descontos personalizados, cupons, ofertas de parceiros, vantagens de aniversário, comunicações de relacionamento e ações de mídia personalizada.",
      "Esta Política deve ser lida em conjunto com o Regulamento do Programa Círculo Santa Maria e com outros avisos ou termos específicos apresentados em determinados canais ou campanhas.",
    ],
  },
  {
    title: "2. Quem é o controlador dos dados",
    body: [
      "A controladora dos dados pessoais tratados no contexto desta Política é a Hortus Comércio de Alimentos S.A., inscrita no CNPJ sob o nº 09.000.493/0001-31, com endereço na Avenida Cidade Jardim, 790, Jardim Paulistano, São Paulo/SP.",
      "Canal de atendimento e de privacidade: sac@emporiosantamaria.com.br.",
    ],
  },
  {
    title: "3. Quais dados pessoais podemos coletar",
    body: [
      "3.1. Dados fornecidos diretamente por você",
      "Dados de identificação e cadastro, como nome completo, CPF, data de nascimento e informações necessárias para confirmação de maioridade.",
      "Dados de contato, como telefone, e-mail e endereço residencial.",
      "Dados de acesso e segurança, como credenciais de acesso, códigos de confirmação e registros de autenticação na área do cliente.",
      "Preferências de comunicação, incluindo escolhas relacionadas ao recebimento de mensagens por e-mail, SMS e WhatsApp.",
      "Dados fornecidos em atendimentos, reclamações, solicitações, pesquisas de satisfação ou outras interações com o Empório Santa Maria.",
      "3.2. Dados gerados durante o relacionamento e as compras",
      "Histórico de compras identificadas pelo CPF, incluindo data, loja, produtos, categorias, quantidades, valores, descontos, cupons e benefícios utilizados.",
      "Informações sobre participação em campanhas, resposta a ofertas e uso de benefícios do Círculo Santa Maria.",
      "Dados de relacionamento, frequência de compras, preferências, categorias de interesse e outros indicadores utilizados para melhorar a experiência e personalizar benefícios.",
      "Registros de eventuais suspeitas de fraude, uso indevido de CPF, cadastros duplicados ou violações do Regulamento do Programa.",
      "3.3. Dados coletados automaticamente",
      "Dados de navegação e uso do site ou da área do cliente, como endereço IP, data e hora de acesso, tipo de dispositivo, navegador, páginas acessadas e interações realizadas.",
      "Cookies, pixels, identificadores de publicidade e tecnologias semelhantes.",
      "Registros técnicos e de segurança necessários para proteção dos ambientes digitais e prevenção de acessos não autorizados.",
      "3.4. Dados obtidos de terceiros",
      "Podemos receber dados de fornecedores de tecnologia, plataformas de comunicação, empresas de análise de dados, parceiros de mídia, empresas do mesmo grupo econômico e outros prestadores que atuem em nosso nome ou apoiem a operação do Programa, sempre observadas as finalidades informadas, os contratos aplicáveis e a legislação.",
    ],
  },
  {
    title: "4. Como utilizamos os dados pessoais",
    body: [
      "Podemos utilizar dados pessoais para as seguintes finalidades:",
      "Criar, validar, manter e atualizar o cadastro no Círculo Santa Maria.",
      "Confirmar identidade, idade e titularidade do CPF.",
      "Identificar o participante nas compras realizadas nas lojas físicas do Empório Santa Maria.",
      "Aplicar preços exclusivos, descontos, cupons e demais benefícios do Programa.",
      "Personalizar ofertas e benefícios com base no perfil e no histórico de relacionamento do participante.",
      "Disponibilizar vantagens de aniversário e outras campanhas de relacionamento.",
      "Gerenciar preferências de comunicação e enviar mensagens pelos canais autorizados.",
      "Realizar atendimento, responder solicitações, solucionar dúvidas e tratar reclamações.",
      "Prevenir, detectar e investigar fraudes, cadastros duplicados, uso indevido de CPF e outras irregularidades.",
      "Realizar análises estatísticas, estudos de comportamento e melhoria de produtos, serviços, campanhas e experiência do cliente.",
      "Cumprir obrigações legais, regulatórias, fiscais e determinações de autoridades competentes.",
      "Exercer direitos em processos judiciais, administrativos ou arbitrais.",
      "Proteger os direitos, a segurança e os interesses legítimos da Hortus, de seus clientes, colaboradores, parceiros e terceiros.",
    ],
  },
  {
    title: "5. Marketing, comunicações e preferências",
    body: [
      "A adesão ao Círculo Santa Maria é independente da autorização para recebimento de comunicações publicitárias. O participante poderá escolher separadamente se deseja receber mensagens por e-mail, SMS e WhatsApp.",
      "As preferências poderão ser alteradas ou revogadas na área do cliente no site e, quando disponível, pelos mecanismos indicados em cada comunicação. A retirada do consentimento para marketing não implica o cancelamento da participação no Programa.",
      "Mesmo quando o participante não desejar receber publicidade, poderemos enviar comunicações estritamente necessárias à operação da conta, à segurança, ao atendimento, ao cumprimento do Regulamento ou de obrigações legais.",
      "O uso de telefone para contatos comerciais e a realização de mídia personalizada em plataformas digitais observarão as preferências registradas pelo titular e a legislação aplicável.",
    ],
  },
  {
    title: "6. Personalização de ofertas e mídia",
    body: [
      "Podemos analisar dados cadastrais, histórico de compras, uso de cupons, frequência, categorias de interesse e interações com campanhas para oferecer descontos, benefícios e comunicações mais relevantes.",
      "Também poderemos utilizar identificadores protegidos, pseudonimizados ou tecnicamente transformados para criar públicos em plataformas de mídia e apresentar anúncios personalizados, quando permitido pela legislação e pelas preferências do titular.",
    ],
  },
  {
    title: "7. Cookies e tecnologias semelhantes",
    body: [
      "O site e a área do cliente poderão utilizar cookies e tecnologias semelhantes para funcionamento, segurança, autenticação, armazenamento de preferências, análise de uso, medição de campanhas e personalização de conteúdo ou publicidade.",
      "Quando aplicável, o usuário poderá gerenciar cookies por meio do banner ou painel de preferências e das configurações do navegador. A desativação de determinados cookies poderá afetar algumas funcionalidades.",
    ],
  },
  {
    title: "8. Com quem podemos compartilhar os dados",
    body: [
      "Podemos compartilhar dados pessoais, conforme necessário, com:",
      "Fornecedores de tecnologia, hospedagem, nuvem, CRM, CDP, sistemas de frente de caixa, desenvolvimento, manutenção e segurança da informação.",
      "Prestadores de serviços de comunicação por e-mail, SMS, WhatsApp, telefone e outros canais.",
      "Empresas de análise de dados, mensuração, pesquisa, consultoria, publicidade e mídia.",
      "Parceiros responsáveis por ofertas ou benefícios, quando o compartilhamento for necessário e estiver devidamente informado ao participante.",
      "Empresas integrantes do mesmo grupo econômico, para finalidades administrativas, operacionais, de segurança ou relacionamento compatíveis com esta Política.",
      "Autoridades públicas, órgãos reguladores, Poder Judiciário ou terceiros, quando necessário para cumprimento de obrigação legal, ordem válida, defesa de direitos ou prevenção de fraude.",
      "Terceiros envolvidos em reorganizações societárias, fusões, aquisições, incorporações, venda de ativos ou outras operações empresariais, observadas as medidas de proteção aplicáveis.",
      "Os parceiros e prestadores devem tratar os dados de acordo com suas atribuições, contratos, instruções e obrigações legais. Quando um parceiro atuar como controlador independente, seu próprio aviso de privacidade poderá ser aplicável.",
    ],
  },
  {
    title: "9. Transferência internacional de dados",
    body: [
      "Alguns fornecedores de tecnologia, nuvem, comunicação, análise ou mídia poderão armazenar ou tratar dados em outros países. Nesses casos, adotaremos medidas compatíveis com a legislação aplicável e mecanismos adequados de proteção.",
    ],
  },
  {
    title: "10. Bases legais",
    body: [
      "O tratamento de dados pessoais poderá estar fundamentado, conforme cada finalidade, em diferentes hipóteses legais, incluindo execução de contrato ou de procedimentos preliminares, cumprimento de obrigação legal ou regulatória, exercício regular de direitos, proteção da vida ou da integridade física, legítimo interesse, proteção do crédito e consentimento.",
      "Quando o consentimento for a base legal aplicável, ele poderá ser revogado pelos canais disponibilizados, sem afetar a legalidade dos tratamentos realizados anteriormente à revogação.",
    ],
  },
  {
    title: "11. Segurança da informação",
    body: [
      "Adotamos medidas técnicas, administrativas e organizacionais destinadas a proteger os dados pessoais contra acessos não autorizados, perda, destruição, alteração, divulgação ou tratamento inadequado. Essas medidas incluem controles de acesso, gestão de credenciais, monitoramento, procedimentos internos e requisitos contratuais aplicáveis aos fornecedores.",
      "Nenhum sistema é totalmente imune a incidentes. Caso seja identificado incidente que possa gerar risco ou dano relevante aos titulares, serão adotadas as medidas cabíveis de investigação, contenção, remediação e comunicação, conforme exigido pela legislação.",
    ],
  },
  {
    title: "12. Retenção e eliminação",
    body: [
      "Os dados pessoais serão mantidos pelo período necessário para cumprir as finalidades descritas nesta Política, operar o Programa, atender solicitações, prevenir fraudes, cumprir obrigações legais ou regulatórias, exercer direitos e manter registros exigidos pela legislação.",
      "Após o cancelamento do Círculo Santa Maria, determinados dados poderão permanecer armazenados pelo período necessário às finalidades permitidas pela legislação. Quando não houver justificativa para conservação, os dados poderão ser eliminados ou anonimizados.",
    ],
  },
  {
    title: "13. Direitos dos titulares",
    body: [
      "Nos termos da legislação aplicável, o titular poderá solicitar, conforme o caso:",
      "Confirmação da existência de tratamento.",
      "Acesso aos dados pessoais.",
      "Correção de dados incompletos, inexatos ou desatualizados.",
      "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade.",
      "Portabilidade, quando aplicável e regulamentada.",
      "Informação sobre as entidades com as quais os dados foram compartilhados.",
      "Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa.",
      "Revogação do consentimento.",
      "Eliminação dos dados tratados com base no consentimento, ressalvadas as hipóteses legais de conservação.",
      "Oposição a tratamento realizado em desconformidade com a legislação.",
      "Revisão de decisões tomadas unicamente com base em tratamento automatizado, quando aplicável.",
      "Para proteção do titular, poderemos solicitar informações adicionais ou realizar procedimentos de verificação de identidade antes de atender a uma solicitação.",
      "As solicitações poderão ser encaminhadas para sac@emporiosantamaria.com.br.",
    ],
  },
  {
    title: "14. Cancelamento do programa e exclusão da conta",
    body: [
      "O participante poderá solicitar o cancelamento do Círculo Santa Maria pela área do cliente, quando essa funcionalidade estiver disponível, ou pelo SAC.",
      "O cancelamento encerra o acesso aos benefícios, descontos e cupons do Programa, mas não implica necessariamente a eliminação imediata de todos os dados pessoais, que poderão ser conservados quando houver fundamento legal, necessidade de prevenção a fraude ou exercício de direitos.",
    ],
  },
  {
    title: "15. Dados de crianças e adolescentes",
    body: [
      "O Círculo Santa Maria é destinado exclusivamente a pessoas com 18 anos ou mais. Não buscamos cadastrar intencionalmente crianças ou adolescentes no Programa. Caso seja identificado cadastro em desacordo com essa regra, poderemos adotar medidas para bloqueio, exclusão ou regularização, conforme aplicável.",
    ],
  },
  {
    title: "16. Links e serviços de terceiros",
    body: [
      "Nossos sites, comunicações ou benefícios poderão conter links para ambientes de terceiros. Esses terceiros possuem práticas próprias de privacidade e segurança. Recomendamos que o titular leia os respectivos avisos antes de fornecer dados pessoais ou utilizar esses serviços.",
    ],
  },
  {
    title: "17. Alterações nesta política",
    body: [
      "Esta Política poderá ser atualizada para refletir mudanças nas práticas de tratamento, no Programa, nos canais, nos fornecedores ou na legislação. A versão vigente e a data da última atualização serão disponibilizadas nos canais oficiais do Empório Santa Maria.",
      "Quando a alteração for relevante, poderão ser adotados meios adicionais de comunicação. Mudanças que dependam de novo consentimento não serão consideradas aceitas apenas pelo silêncio ou pela continuidade do uso.",
    ],
  },
  {
    title: "18. Contato e reclamações",
    body: [
      "Para dúvidas sobre esta Política, solicitações relacionadas a dados pessoais ou exercício de direitos, o titular poderá utilizar os seguintes canais:",
      "E-mail: sac@emporiosantamaria.com.br.",
      "Endereço para correspondência: Avenida Cidade Jardim, 790, Jardim Paulistano, São Paulo/SP.",
      "Caso o titular entenda que sua solicitação não foi adequadamente atendida, poderá buscar os canais de defesa do consumidor ou a autoridade competente, conforme aplicável.",
    ],
  },
];

function getItemStyle(index: number) {
  return ITEM_STYLES[index % ITEM_STYLES.length];
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isSubtitle(paragraph: string) {
  return /^\d+\.\d+\./.test(paragraph);
}

function isHighlightedContact(sectionTitle: string, paragraph: string) {
  return sectionTitle === "18. Contato e reclama??es" && /^(E-mail:|Endere?o para correspond?ncia:)/.test(paragraph);
}

function PolicyTimeline() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:items-start lg:gap-9 xl:grid-cols-[200px_minmax(0,1fr)]">
      <div className="lg:hidden">
        <p className="mb-3 px-2 text-base text-[var(--color-brown)]">Índice</p>
        <div className="flex gap-2 overflow-x-auto px-2 pb-2 snap-x snap-mandatory">
          {POLICY_SECTIONS.map((section) => (
            <a
              key={section.title}
              href={`#${slugify(section.title)}`}
              className="block min-w-[220px] shrink-0 snap-start rounded-[0.9rem] border border-[rgba(104,64,49,0.12)] px-3 py-2 text-left text-[0.98rem] leading-6 text-[var(--color-brown)] transition hover:bg-white/70 hover:text-[var(--color-brown-dark)]"
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>

      <aside className="hidden lg:block lg:sticky lg:top-28">
        <div className="rounded-[1.4rem] bg-transparent px-2 py-2">
          <p className="mb-3 text-base text-[var(--color-brown)]">Índice</p>
          <div className="space-y-1.5">
            {POLICY_SECTIONS.map((section) => (
              <a
                key={section.title}
                href={`#${slugify(section.title)}`}
                className="block w-full rounded-[0.9rem] px-3 py-2 text-left text-[1.02rem] leading-6 text-[var(--color-brown)] transition hover:bg-white/70 hover:text-[var(--color-brown-dark)]"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </aside>

      <div className="relative space-y-6 pl-0 lg:pl-[4.6rem]">
        <div className="absolute bottom-1 left-[2.4rem] top-1 hidden w-px bg-[#e6c98f] lg:block" />

        {POLICY_SECTIONS.map((section, index) => {
          const { icon: Icon, iconWrapperClassName } = getItemStyle(index);

          return (
            <section
              key={section.title}
              id={slugify(section.title)}
              className="relative scroll-mt-28"
            >
              <span
                className={`absolute left-[-3.58rem] top-5 z-10 hidden h-11 w-11 items-center justify-center rounded-[1rem] border border-white/60 shadow-[0_10px_22px_rgba(71,42,35,0.08)] lg:flex ${iconWrapperClassName}`}
              >
                <Icon className="h-5 w-5" />
              </span>

              <article className="rounded-[1.4rem] border border-[rgba(104,64,49,0.12)] bg-white px-6 py-5 shadow-[0_10px_24px_rgba(71,42,35,0.06)] sm:px-7">
                <div className="flex items-start gap-4 lg:hidden">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] ${iconWrapperClassName}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[1.25rem] font-semibold leading-8 text-[var(--color-brown-dark)]">{section.title}</h2>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <h2 className="text-[1.25rem] font-semibold leading-8 text-[var(--color-brown-dark)]">{section.title}</h2>
                </div>

                <div className="rich-text mt-4 border-t border-[rgba(104,64,49,0.08)] pt-4 text-[var(--color-muted)]">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className={isSubtitle(paragraph) || isHighlightedContact(section.title, paragraph) ? "font-semibold text-[var(--color-brown-dark)]" : undefined}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default function PoliticaPage() {
  return (
    <>
      <section className="hero-shell">
        <Image src="/images/loja.jpg" alt="" aria-hidden="true" fill priority sizes="100vw" className="hero-shell__image" />
        <div className="hero-shell__overlay" />
        <div className="hero-shell__content text-center">
          <h1 className="hero-shell__title">Política de privacidade</h1>
          <p className="hero-shell__description">
            Transparência, ética e cuidado com o tratamento dos dados pessoais.
          </p>
        </div>
      </section>

      <section className="section-shell bg-[var(--color-surface)] pt-0">
        <div className="content-grid">
          <PolicyTimeline />
        </div>
      </section>
    </>
  );
}


