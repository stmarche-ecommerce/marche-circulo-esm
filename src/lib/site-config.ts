export type HeroConfig = {
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  align?: "center" | "left";
  compact?: boolean;
};

export type AlternatingSection = {
  title: string;
  text: string[];
  image: string;
  imageLeft?: boolean;
};

export type GridItem = {
  title: string;
  description: string;
  image: string;
  href?: string;
  external?: boolean;
};

export type RichTextSection = {
  title: string;
  body: string[];
};

export type AccordionSection = {
  title: string;
  body: string[];
};

export type ContactInfo = {
  title: string;
  description: string;
  email?: string;
  phone?: string;
  cards?: Array<{
    title: string;
    email?: string;
    whatsapp?: string;
    phone?: string;
    address?: string;
    sac?: string
  }>;
};

export type PageTemplate = "feature" | "grid" | "richText" | "institutional" | "contact";

export type SitePage = {
  slug: string;
  title: string;
  description: string;
  navLabel?: string;
  hero: HeroConfig;
  template: PageTemplate;
  intro?: string[];
  alternatingSections?: AlternatingSection[];
  gridItems?: GridItem[];
  richTextSections?: RichTextSection[];
  accordionSections?: AccordionSection[];
  contactInfo?: ContactInfo;
};

export const primaryNavigationItems = [
  { label: "Empório", href: "/emporio" },
  { label: "Sushi", href: "/sushi" },
  { label: "Café", href: "/cafe" },
  // { label: "Brunch", href: "/brunch" },
  // { label: "Delivery", href: "/delivery" },
  // { label: "Produtos", href: "/produtos" },
  { label: "Serviços", href: "/servicos" },
] as const;

export const sitePages: SitePage[] = [
  // {
  //   slug: "brunch",
  //   title: "Brunch",
  //   description: "Conheça o novo espaço de brunch do Santa Maria Empório.",
  //   navLabel: "Brunch",
  //   template: "feature",
  //   hero: {
  //     title: "Um novo espaço para celebrar a manhã",
  //     description:
  //       "Bebidas quentes e frias, refeições leves ou mais elaborados - com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
  //     image: "/images/branch.png",
  //   },
  //   alternatingSections: [
  //     {
  //       title: "Um convite para desacelerar",
  //       text: [
  //         "No coração do nosso empório, criamos um espaço onde o tempo parece desacelerar.",
  //         "Ali, entre aromas convidativos e luz suave, os dias começam com mais leveza.",
  //       ],
  //       image: "/images/branch1.jpg",
  //     },
  //     {
  //       title: "Sabores para qualquer humor matinal",
  //       text: [
  //         "Servimos pães artesanais, ovos preparados na hora, frutas frescas, panquecas douradas e uma seleção especial de bebidas quentes e frias.",
  //         "Tudo com aquele toque de afeto e sofisticação que já faz parte da Experiência Santa Maria.",
  //       ],
  //       image: "/images/branch2.jpg",
  //       imageLeft: true,
  //     },
  //     {
  //       title: "Brunch, pausa e reencontro",
  //       text: [
  //         "É brunch, mas também é pausa. É reencontro, é descobrir um novo favorito no cardápio.",
  //         "Um começo de dia comum vira momento de celebração.",
  //       ],
  //       image: "/images/branch3.jpg",
  //     },
  //   ],
  //   intro: [
  //     "O Santa Maria é referência em gastronomia em São Paulo e conta com padaria, rotisserie, confeitaria, sushi, café e fábrica de massas. ",
  //     "Tudo feito com os melhores ingredientes, qualidade e atendimento únicos!",
  //   ],
  // },
  {
    slug: "emporio",
    title: "Empório",
    description: "Descubra os ambientes e categorias do Santa Maria Empório.",
    navLabel: "Empório",
    template: "grid",
    hero: {
      eyebrow: "Santa Maria",
      title: "Empório",
      description:
        "Referência em curadoria e gastronomia em São Paulo, com padaria, rotisserie, confeitaria, hortifrúti, adega, mercearia e produtos importados selecionados com atenção e afeto.",
      image: "/images/bg1.jpg",
    },
    gridItems: [
      {
        title: "Rotisserie",
        description:
          "Mais de 40 pratos artesanais preparados diariamente, entre saladas, carnes, massas, tortas e acompanhamentos.",
        image: "/images/area01.jpg",
      },
      {
        title: "Hortifrúti",
        description:
          "Frutas, legumes e verduras selecionados todos os dias, com uma curadoria especial de orgânicos.",
        image: "/images/area07.jpg",
      },
      {
        title: "Adega",
        description:
          "Mais de mil rótulos de vinhos do mundo todo, além de destilados e cervejas artesanais.",
        image: "/images/vinhos.jpg",
        href: "/bebidas.pdf",
        external: true,
      },
      {
        title: "Bebidas",
        description:
          "Kombuchas, energéticos naturais, refrigerantes orgânicos, chás, águas saborizadas e muito mais.",
        image: "/images/drinks.jpg",
      },
      {
        title: "Santa Maria Casa",
        description:
          "Itens de decoração e utensílios para presentear e levar mais charme para a rotina.",
        image: "/images/casa.jpg",
      },
      {
        title: "Fábrica de massas",
        description:
          "Massas frescas feitas ao vivo, com ingredientes selecionados e sabor artesanal italiano.",
        image: "/images/floricultura.jpg",
      },
      {
        title: "Saudáveis",
        description:
          "Produtos para dietas restritivas, suplementos e opções que conciliam bem-estar e sabor.",
        image: "/images/saudavel.jpg",
      },
      {
        title: "Frios e laticínios",
        description:
          "Queijos, embutidos, opções veganas e tábuas personalizadas para momentos especiais.",
        image: "/images/frios.jpg",
      },
      {
        title: "Mercearia",
        description:
          "Do essencial ao inesperado, com molhos, conservas, massas, azeites e importados escolhidos com critério.",
        image: "/images/area05.jpg",
      },
      {
        title: "Padaria",
        description:
          "Pães e doces com farinha 100% orgânica, fermentação natural e receitas próprias que já viraram clássicos.",
        image: "/images/paes.jpg",
      },
      {
        title: "Confeitaria",
        description:
          "Sobremesas artesanais elaboradas com ingredientes selecionados e acabamento refinado.",
        image: "/images/bolos.jpg",
      },
      {
        title: "Importados",
        description:
          "Uma seleção de sabores do mundo inteiro, com doces, bolachas, chás, temperos e vinhos.",
        image: "/images/importados.jpg",
      },
    ],
  },
  // {
  //   slug: "produtos",
  //   title: "Nossos Produtos",
  //   description: "Padaria, rotisserie e confeitaria do Santa Maria Empório.",
  //   navLabel: "Nossos Produtos",
  //   template: "feature",
  //   hero: {
  //     title: "Nossos produtos",
  //     description:
  //       "Bebidas quentes e frias, refeições leves ou mais elaborados - com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
  //     image: "/images/padaria.jpg",
  //   },
  //   alternatingSections: [
  //     {
  //       title: "Padaria",
  //       text: [
  //         "A padaria do Santa Maria reúne pães e doces produzidos com ingredientes altamente selecionados.",
  //         "Entre os mais pedidos estão pão de cranberry com nozes, pão de granola com pistache, baguete italiana e os famosos cruffins.",
  //       ],
  //       image: "/images/padaria.jpg",
  //     },
  //     {
  //       title: "Rotisserie",
  //       text: [
  //         "Praticidade sem abrir mão da qualidade. Os pratos são feitos artesanalmente todos os dias.",
  //         "Saladas, legumes, tortas, quiches, carnes, massas, acompanhamentos, antepastos e salgados fazem parte da seleção.",
  //       ],
  //       image: "/images/rotisseri.jpg",
  //       imageLeft: true,
  //     },
  //     {
  //       title: "Confeitaria",
  //       text: [
  //         "Doces artesanais elaborados para celebrar a vida, com alto padrao de qualidade e muito sabor.",
  //         "Entre os destaques estão Fraise de Morango, Bolo Mousse de Pistache, Naked Frutas e Tiramisu.",
  //       ],
  //       image: "/images/confeitaria.jpg",
  //     },
  //   ],
  // },
  {
    slug: "servicos",
    title: "Nossos Serviços",
    description: "Conheça os serviços e encomendas do Santa Maria Empório.",
    navLabel: "Nossos Serviços",
    template: "feature",
    hero: {
      title: "Nossos serviços",
      description:
        "Encomendas, personal shopper, eventos e cestas personalizadas: soluções sob medida com toda a solidez gastronômica do Santa Maria.",
      image: "/images/servicos.jpg",
    },
    alternatingSections: [
      {
        title: "Encomendas",
        text: [
          "Todos os momentos da sua vida podem ficar melhores com um toque do Santa Maria. Nosso servi?o de encomendas atende rotisserie, confeitaria, padaria e tábua de frios.",
          "Basta entrar em contato pelos telefones (11) 3706-5211 e (11) 3706-5210.",
          "A tábua de frios é totalmente personalizada: você pode levar sua própria base ou deixar toda a curadoria por nossa conta.",
        ],
        image: "/images/rotisseri.jpg",
      },
      {
        title: "Personal shopper",
        text: [
          "Nossa loja oferece atendimento gratuito de personal shoppers para apoiar suas compras em qualquer momento.",
          "Eles ajudam desde a escolha do vinho ideal até a montagem de uma cesta personalizada para presentear.",
        ],
        image: "/images/casa.jpg",
        imageLeft: true,
      },
      {
        title: "Eventos",
        text: [
          "Seu evento pode acontecer dentro da Experiência Santa Maria.",
          "As reservas e orçamentos para o espaço do restaurante podem ser solicitados pelo e-mail reservas.restaurante@emporiosantamaria.com.br.",
        ],
        image: "/images/nossa-loja.jpg",
      },
      {
        title: "Cestas personalizadas",
        text: [
          "Montamos cestas com carinho e atenção ao gosto de quem vai receber.",
          "Voc? pode incluir os itens preferidos da pessoa e contar com apoio do personal shopper para criar um presente realmente especial.",
        ],
        image: "/images/importados.jpg",
        imageLeft: true,
      },
    ],
  },
  {
    slug: "curadoria",
    title: "Curadoria",
    description: "Conteúdos e experiências especiais da curadoria Santa Maria.",
    navLabel: "Curadoria",
    template: "feature",
    hero: {
      title: "Curadoria",
      description:
        "Conteúdos, histórias e referências que ampliam o repertório gastronômico e celebram pequenos prazeres.",
      image: "/images/curadoria1.png",
    },
    alternatingSections: [
      {
        title: "Curadoria Santa Maria",
        text: [
          "Conheça as histórias por trás de iguarias, mergulhe no universo dos vinhos Premier Cru e descubra curiosidades sobre receitas e ingredientes.",
          "Tudo isso você encontra no blog do Empório Santa Maria, em um convite para sentar conosco e conversar sobre alta gastronomia e indulgências do dia a dia.",
        ],
        image: "/images/curadoria1.png",
      },
      {
        title: "Especial: azeite",
        text: [
          "Uma introdução ao universo do azeite, com notas sobre origem, rótulos, usos e harmonização.",
          "Um conteúdo pensado para aprofundar o olhar sobre ingredientes, origens e pequenos detalhes que transformam a experiência à mesa.",
        ],
        image: "/images/azeite.jpg",
        imageLeft: true,
      },
    ],
  },
  {
    slug: "azeite",
    title: "Azeite",
    description: "Pagina especial de curadoria sobre azeites.",
    template: "richText",
    hero: {
      title: "Azeite",
      description: "Tudo o que você precisa saber sobre azeite.",
      image: "/images/azeitebg.jpg",
    },
    richTextSections: [
      {
        title: "Um ingrediente milenar",
        body: [
          "Antes da própria escrita existir, o azeite já estava presente no cotidiano da humanidade como alimento, perfume, tratamento medicinal e fonte de iluminação.",
          "Registros arqueológicos apontam sua origem há mais de seis mil anos, com papel central na prosperidade de Creta e na disseminação pelo Mediterrâneo.",
          "A popularidade não tira seu status de iguaria: o segredo está em encontrar exemplares de alta qualidade, capazes de transformar uma refeição com poucas gotas.",
        ],
      },
      {
        title: "Sabores do azeite pelo mundo",
        body: [
          "Italia: Toscana com perfil complexo e final apimentado; Riviera Italiana com notas sutis e delicadas.",
          "Norte da África: azeites dourados, limpos e equilibrados.",
          "Franca: leves e florais. Grécia: intensos, perfumados e ricos. Espanha: frutados e aromaticos, com destaque para a Catalunha e suas notas de amendoas frescas.",
          "Sua versatilidade vai do pão banhado em azeite ao acabamento final de pratos, saladas e molhos.",
        ],
      },
      {
        title: "Lendo o rotulo",
        body: [
          "Azeite de oliva ou tipo único indica um produto refinado e misturado, mais indicado para altas temperaturas.",
          "Azeite virgem possui acidez maior e costuma ser indicado para cozinhar.",
          "Azeite extravirgem e o de mais alta qualidade, sem refinamento e com acidez de ate 0,8%.",
          "Azeite não filtrado, conhecido como flor do azeite, traz rusticidade e intensidade aromatica, sendo recomendado em uso moderado.",
          "Prefira garrafas escuras e opacas e consuma o produto apos aberto para preservar aromas e frescor.",
        ],
      },
      {
        title: "O azeite e divino",
        body: [
          "Na mitologia grega, a oliveira simboliza paz e prosperidade e surge como presente de Athena.",
          "No islamismo, o azeite aparece associado ao cuidado com o corpo e a boa saude.",
          "No catolicismo e no judaismo, tanto a oliveira quanto o azeite ocupam passagens sagradas ligadas a consagração, alianca e transcendencia.",
        ],
      },
    ],
  },
  {
    slug: "sushi",
    title: "Sushi",
    description: "Conheça o sushi bar do Santa Maria Empório.",
    template: "feature",
    hero: {
      eyebrow: "Santa Maria",
      title: "Sushi",
      description:
        "Um dos melhores sushi bars de São Paulo, comandado pelo Chef Marcelo Kunigami, com peixes frescos de alta qualidade e ingredientes selecionados a dedo.",
      image: "/images/foto1.jpg",
    },
    alternatingSections: [
      {
        title: "Sushi Santa Maria",
        text: [
          "O sushi bar do Santa Maria é comandado pelo Chef Marcelo Kunigami, reunindo técnica, frescor e um cuidado rigoroso com cada ingrediente.",
          "Peixes frescos de alta qualidade e ingredientes selecionados a dedo definem uma experiência que valoriza precisão e sensibilidade em cada preparo.",
        ],
        image: "/images/foto1.jpg",
      },
      {
        title: "Alta gastronomia japonesa",
        text: [
          "Entre cortes selecionados, combinações delicadas e preparos precisos, cada visita vira uma experiência de alta gastronomia japonesa em São Paulo.",
        ],
        image: "/images/foto2.png",
        imageLeft: true,
      },
    ],
  },
  {
    slug: "cafe",
    title: "Café",
    description: "Conheça a cafeteria especial do Santa Maria Empório.",
    template: "feature",
    hero: {
      eyebrow: "Santa Maria",
      title: "Café",
      description:
        "Bebidas quentes e frias, refeições leves ou mais elaborados - com o toque de afeto do Santa Maria para transformar qualquer pausa em um momento especial.",
      image: "/images/foto3.jpg",
    },
    alternatingSections: [
      {
        title: "Cafeteria especial",
        text: [
          "No café do Santa Maria, cada pausa pode virar um momento especial, com bebidas quentes e frias, doces, salgados e refeições leves.",
          "O ambiente convida para encontros, conversas tranquilas e respiros ao longo do dia com o cuidado que já faz parte da experiência da casa.",
        ],
        image: "/images/foto3.jpg",
      },
      {
        title: "Pausa com sabor e afeto",
        text: [
          "Tudo é preparado com o mesmo cuidado que marca a experiência da casa, para acompanhar encontros, conversas e pequenos respiros ao longo do dia.",
        ],
        image: "/images/branch2.jpg",
        imageLeft: true,
      },
    ],
  },
  {
    slug: "delivery",
    title: "Delivery",
    description: "Canais de delivery do Santa Maria Empório.",
    template: "grid",
    hero: {
      eyebrow: "Santa Maria",
      title: "Delivery",
      description:
        "Escolha o canal que faz mais sentido para você e receba a Experiência Santa Maria onde estiver.",
      image: "/images/adega.jpg",
    },
    gridItems: [
      {
        title: "Rappi",
        description: "Compre pelo app da Rappi com a curadoria Santa Maria.",
        image: "/images/emporio.jpg",
        href: "https://www.rappi.com.br/lojas/900631375-santa-maria-super-nc",
        external: true,
      },
      {
        title: "iFood",
        description: "Encontre o Santa Maria no iFood e faca seu pedido online.",
        image: "/images/rotisseri.jpg",
        href: "https://www.ifood.com.br",
        external: true,
      },
      {
        title: "WhatsApp",
        description: "Fale direto com a equipe pelo WhatsApp para apoio no atendimento.",
        image: "/images/foto2.png",
        href: "https://wa.me/5511958187139",
        external: true,
      },
    ],
  },
  {
    slug: "historia",
    title: "Nossa História",
    description: "Conheça a história do Santa Maria Empório.",
    template: "institutional",
    hero: {
      title: "Nossa história",
      description:
        "O Santa Maria ajudou a consolidar o conceito de mercado gourmet em São Paulo.",
      image: "/images/nossa-loja.jpg",
    },
    richTextSections: [
      {
        title: "Nossa História",
        body: [
          "O Santa Maria Empório trouxe o conceito de mercado gourmet para a cidade de São Paulo, reunindo um portfólio de itens premium que iam desde selecionadas hortaliças a ingredientes importados, como pães, vinhos, queijos, azeites e peças de decoração. Não demorou para o Santa Maria tornar-se referência de sofisticação entre os mercados da cidade e destino certo para os amantes da boa gastronomia. Em 2007, o mercado foi adquirido pelo grupo St Marche, que comanda a gestão até hoje.",
          "Ao completar 25 anos, no ano de 2018, o Empório passou por uma grande reforma. Agora é possível encontrar um espaço amplo para as compras, com corredores mais largos, uma grande parede de geladeiras com 100 novos cortes de carnes, novidades em rótulos de vinhos e destilados, uma seção dedicada aos vegetais orgânicos e uma padaria ainda mais completa.",
          "O cardápio da rotisserie também tem novidades e ganha pratos como frango assado recheado com manteiga de trufas, camarões cozidos no vapor para finalizar em casa, legumes grelhados, massas secas e frescas de fabricação própria e pratos libaneses.",
          "Na padaria, repleta de novidades, destaque para os Cruffins, bolinhos folhados que misturam massa de croissant e muffin, recheados com creme pâtissier de limão, e uma deliciosa receita autoral de pão de calabresa. No centro do nosso empório, há um corner de Orfeu Cafés Especiais que oferece grãos moídos na hora, uma lembrança da velha tradição de comprar café fresquinho.",
          "O restaurante, instalado no piso superior do empório, também mudou. Com um novo acesso, o espaço ganhou uma adega climatizada que permite a escolha de vinhos em taça para acompanhar as refeições feitas ali. É nesta área que são servidos almoço com buffet variado todos os dias, café da manhã aos finais de semana e também o menu japonês, no almoço e jantar, um clássico do Santa Maria há muitos anos.",
        ],
      },
    ],
  },
  {
    slug: "manifesto",
    title: "Manifesto",
    description: "Manifesto institucional do Santa Maria Empório.",
    template: "institutional",
    hero: {
      title: "Manifesto",
      description:
        "Celebrar a vida todos os dias, com atenção aos detalhes que transformam o cotidiano.",
      image: "/images/foto5.png",
    },
    richTextSections: [
      {
        title: "Celebre a vida todo santo dia",
        body: [
          "Nós somos o Santa Maria Empório. Abrimos a loja todos os dias para quem acredita que a vida não merece ser sem graça.",
          "Celebrar é uma demonstração de afeto a quem está perto de você, inclusive a você mesmo. É manter um amor vivo, uma amizade próxima, o gosto pela vida renovado.",
          "Corremos atrás das pequenas surpresas e prazeres que mudam o seu dia: sabores, aromas, texturas, atenção, conforto, praticidade e carinho.",
          "Santa Maria Empório. Celebre a vida todo santo dia.",
        ],
      },
    ],
  },
  {
    slug: "politica",
    title: "Política de privacidade",
    description: "Política de privacidade e proteção de dados.",
    template: "richText",
    hero: {
      title: "Política de privacidade",
      description:
        "Transparência, ética e cuidado com o tratamento dos dados pessoais.",
      image: "/images/loja.jpg",
    },
    accordionSections: [
      {
        title: "1. Objetivo e abrangência",
        body: [
          "Esta Política de privacidade explica como a Hortus Comércio de Alimentos S.A. (Hortus, Empório Santa Maria, nós ou nosso) realiza o tratamento de dados pessoais de clientes, participantes do Programa Círculo Santa Maria, visitantes do site, usuários da área do cliente e pessoas que entram em contato com nossos canais de atendimento.",
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
          "3.1. Dados fornecidos diretamente por você: dados de identificação e cadastro, como nome completo, CPF, data de nascimento e informações necessárias para confirmação de maioridade.",
          "3.1. Também podemos coletar dados de contato, como telefone, e-mail e endereço residencial; dados de acesso e segurança, como credenciais de acesso, códigos de confirmação e registros de autenticação na área do cliente; preferências de comunicação e dados fornecidos em atendimentos, reclamações, solicitações, pesquisas de satisfação ou outras interações com o Empório Santa Maria.",
          "3.2. Dados gerados durante o relacionamento e as compras: histórico de compras identificadas pelo CPF, incluindo data, loja, produtos, categorias, quantidades, valores, descontos, cupons e benefícios utilizados.",
          "3.2. Também podemos tratar informações sobre participação em campanhas, resposta a ofertas e uso de benefícios do Círculo Santa Maria, além de dados de relacionamento, frequência de compras, preferências, categorias de interesse e outros indicadores utilizados para melhorar a experiência e personalizar benefícios.",
          "3.2. Registros de eventuais suspeitas de fraude, uso indevido de CPF, cadastros duplicados ou violações do Regulamento do Programa também podem ser tratados.",
          "3.3. Dados coletados automaticamente: dados de navegação e uso do site ou da área do cliente, como endereço IP, data e hora de acesso, tipo de dispositivo, navegador, páginas acessadas e interações realizadas.",
          "3.3. Também utilizamos cookies, pixels, identificadores de publicidade e tecnologias semelhantes, além de registros técnicos e de segurança necessários para proteção dos ambientes digitais e prevenção de acessos não autorizados.",
          "3.4. Dados obtidos de terceiros: podemos receber dados de fornecedores de tecnologia, plataformas de comunicação, empresas de análise de dados, parceiros de mídia, empresas do mesmo grupo econômico e outros prestadores que atuem em nosso nome ou apoiem a operação do Programa, sempre observadas as finalidades informadas, os contratos aplicáveis e a legislação.",
        ],
      },
      {
        title: "4. Como utilizamos os dados pessoais",
        body: [
          "Podemos utilizar dados pessoais para criar, validar, manter e atualizar o cadastro no Círculo Santa Maria.",
          "Também utilizamos os dados para confirmar identidade, idade e titularidade do CPF e identificar o participante nas compras realizadas nas lojas físicas do Empório Santa Maria.",
          "Os dados podem ser usados para aplicar preços exclusivos, descontos, cupons e demais benefícios do Programa, personalizar ofertas e benefícios com base no perfil e no histórico de relacionamento do participante e disponibilizar vantagens de aniversário e outras campanhas de relacionamento.",
          "Ainda podemos tratar os dados para gerenciar preferências de comunicação, enviar mensagens pelos canais autorizados, realizar atendimento, responder solicitações, solucionar dúvidas e tratar reclamações.",
          "Os dados também podem ser utilizados para prevenir, detectar e investigar fraudes, cadastros duplicados, uso indevido de CPF e outras irregularidades, além de realizar análises estatísticas, estudos de comportamento e melhoria de produtos, serviços, campanhas e experiência do cliente.",
          "Por fim, podemos tratar dados para cumprir obrigações legais, regulatórias, fiscais e determinações de autoridades competentes, exercer direitos em processos judiciais, administrativos ou arbitrais e proteger os direitos, a segurança e os interesses legítimos da Hortus, de seus clientes, colaboradores, parceiros e terceiros.",
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
          "Podemos compartilhar dados pessoais, conforme necessário, com fornecedores de tecnologia, hospedagem, nuvem, CRM, CDP, sistemas de frente de caixa, desenvolvimento, manutenção e segurança da informação.",
          "Também poderemos compartilhar informações com prestadores de serviços de comunicação por e-mail, SMS, WhatsApp, telefone e outros canais, empresas de análise de dados, mensuração, pesquisa, consultoria, publicidade e mídia.",
          "Parceiros responsáveis por ofertas ou benefícios poderão receber dados quando o compartilhamento for necessário e estiver devidamente informado ao participante.",
          "Empresas integrantes do mesmo grupo econômico podem tratar dados para finalidades administrativas, operacionais, de segurança ou relacionamento compatíveis com esta Política.",
          "Os dados também podem ser compartilhados com autoridades públicas, órgãos reguladores, Poder Judiciário ou terceiros, quando necessário para cumprimento de obrigação legal, ordem válida, defesa de direitos ou prevenção de fraude.",
          "Terceiros envolvidos em reorganizações societárias, fusões, aquisições, incorporações, venda de ativos ou outras operações empresariais também podem participar, observadas as medidas de proteção aplicáveis.",
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
          "Nos termos da legislação aplicável, o titular poderá solicitar, conforme o caso, confirmação da existência de tratamento, acesso aos dados pessoais, correção de dados incompletos, inexatos ou desatualizados, anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade, portabilidade, informação sobre compartilhamento e revisão de decisões tomadas unicamente com base em tratamento automatizado, quando aplicável.",
          "O titular também pode solicitar informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa, revogação do consentimento, eliminação dos dados tratados com base no consentimento, ressalvadas as hipóteses legais de conservação, e oposição a tratamento realizado em desconformidade com a legislação.",
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
          "Para dúvidas sobre esta Política, solicitações relacionadas a dados pessoais ou exercício de direitos, o titular poderá utilizar os seguintes canais.",
          "E-mail: sac@emporiosantamaria.com.br.",
          "Endereço para correspondência: Avenida Cidade Jardim, 790, Jardim Paulistano, São Paulo/SP.",
          "Caso o titular entenda que sua solicitação não foi adequadamente atendida, poderá buscar os canais de defesa do consumidor ou a autoridade competente, conforme aplicável.",
        ],
      },
    ],
  },
  {
    slug: "trabalhe",
    title: "Trabalhe Conosco",
    description: "Informações institucionais sobre oportunidades no Santa Maria Empório.",
    template: "contact",
    hero: {
      title: "Trabalhe conosco",
      description: "Faca parte do nosso time.",
      image: "/images/foto2.png",
    },
    contactInfo: {
      title: "Envie seu currículo",
      description: "Encaminhe seu currículo para o e-mail abaixo e conte um pouco sobre sua experiência.",
      email: "seleção@marche.com.br",
    },
  },
  {
    slug: "contato",
    title: "Contato",
    description: "Fale com o Santa Maria Empório.",
    template: "contact",
    hero: {
      title: "Contato",
      description: "Fale conosco para mais informações, encomendas e atendimento.",
      image: "/images/adega2.jpg",
    },
    contactInfo: {
      title: "Quadro Atendimento",
      description: "Preencha o formulario ou fale diretamente com a nossa equipe pelos canais abaixo.",
      email: "contato@emporiosantamaria.com.br",
      phone: "(11) 3706-5211",
      cards: [
        {
          title: "Pedidos e delivery loja",
          whatsapp: "(11) 95818-7139",
          phone: "(11) 3706-5211 / (11) 3706-5210",
        },
        {
          title: "Restaurante do Empório (Sushi Bar)",
          whatsapp: "(11) 98217-0531",
          phone: "(11) 98217-0531",
        },
        {
          title: "EndereÇO",
          address: "Av. Cidade Jardim, 790 - Jd. Paulistano, São Paulo",
        },

        {
          title: "SAC (dúvidas, sugestões e reclamações)",
          sac: "sac@emporiosantamaria.com.br",
        },
      ],
    },
  },
];

export const sitePagesBySlug = Object.fromEntries(
  sitePages.map((page) => [page.slug, page]),
) as Record<string, SitePage>;

export const navigationItems = sitePages.filter((page) => page.navLabel);




