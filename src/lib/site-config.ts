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

export type ContactInfo = {
  title: string;
  description: string;
  email?: string;
  phone?: string;
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
    template: "richText",
    hero: {
      title: "Nossos serviços",
      description:
        "Encomendas, personal shopper, eventos e cestas personalizadas: soluções sob medida com toda a solidez gastronômica do Santa Maria.",
      image: "/images/servicos.jpg",
    },
    richTextSections: [
      {
        title: "Encomendas",
        body: [
          "Todos os momentos da sua vida podem ficar melhores com um toque do Santa Maria. Nosso serviço de encomendas atende rotisserie, confeitaria, padaria e tábua de frios.",
          "Basta entrar em contato pelos telefones (11) 3706-5211 e (11) 3706-5210.",
          "A tábua de frios é totalmente personalizada: você pode levar sua própria base ou deixar toda a curadoria por nossa conta.",
        ],
      },
      {
        title: "Personal shopper",
        body: [
          "Nossa loja oferece atendimento gratuito de personal shoppers para apoiar suas compras em qualquer momento.",
          "Eles ajudam desde a escolha do vinho ideal até a montagem de uma cesta personalizada para presentear.",
        ],
      },
      {
        title: "Eventos",
        body: [
          "Seu evento pode acontecer dentro da Experiência Santa Maria.",
          "As reservas e orçamentos para o espaço do restaurante podem ser solicitados pelo e-mail reservas.restaurante@emporiosantamaria.com.br.",
        ],
      },
      {
        title: "Cestas personalizadas",
        body: [
          "Montamos cestas com carinho e atenção ao gosto de quem vai receber.",
          "Você pode incluir os itens preferidos da pessoa e contar com apoio do personal shopper para criar um presente realmente especial.",
        ],
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
    title: "Política de Privacidade",
    description: "Política de privacidade e proteção de dados.",
    template: "richText",
    hero: {
      title: "Política de privacidade",
      description:
        "Transparência, ética e cuidado com o tratamento dos dados pessoais.",
      image: "/images/loja.jpg",
    },
    richTextSections: [
      {
        title: "Privacidade e proteção de dados",
        body: [
          "O Empório Santa Maria busca garantir o mais alto nível de transparência e ética em suas atividades, e esse compromisso também se estende ao tratamento dos dados pessoais.",
          "Esta política se aplica a clientes, fornecedores, prestadores de serviços, participantes de eventos, candidatos e demais pessoas cujos dados possam ser tratados em interações com a empresa, o site e as redes sociais.",
          "A empresa declara adotar práticas de segurança e governança, políticas internas, mecanismos de supervisão e ações educativas para preservar a privacidade e mitigar riscos.",
        ],
      },
      {
        title: "Coleta, finalidades e bases legais",
        body: [
          "Os dados podem ser coletados em compras presenciais ou remotas, formulários de contato, atendimento ao consumidor, participação em eventos, processos seletivos, interações em redes sociais, uso de wi-fi, imagens de monitoramento e relações com fornecedores.",
          "Entre os dados tratados estão identificação civil, contatos, dados de pagamento, endereço, histórico de compras, preferências, dados de navegação, imagens e informações profissionais, sempre vinculados a finalidades específicas.",
          "As bases legais incluem execução de contrato, cumprimento de obrigação legal, exercício regular de direitos, consentimento e legítimo interesse, conforme a natureza da interação.",
        ],
      },
      {
        title: "Cookies, compartilhamento e retencao",
        body: [
          "O site pode utilizar cookies e tecnologias de rastreamento para personalização da experiência, análise de tráfego, segurança e melhoria dos serviços.",
          "Os dados podem ser compartilhados com terceiros envolvidos nas operações, como instituições financeiras, provedores de tecnologia, logística, marketing, auditoria, recrutamento e assessorias, sempre com objetivo operacional e nunca para comercialização de dados.",
          "A retenção ocorre pelo tempo necessário para as finalidades declaradas, cumprimento de obrigações legais, proteção de direitos e manutenção de backup e segurança.",
        ],
      },
      {
        title: "Direitos do titular",
        body: [
          "O titular pode solicitar confirmação de tratamento, acesso, correção, anonimização, bloqueio, eliminação, portabilidade, informações sobre compartilhamento e revogação de consentimento, nos termos da LGPD.",
          "Solicitações podem ser feitas por meio do encarregado pelo tratamento de dados no e-mail privacidade@marche.com.br.",
          "A política informa versões anteriores e aponta atualização em setembro de 2022.",
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
      title: "Atendimento Santa Maria",
      description: "Preencha o formulário ou fale diretamente com a nossa equipe pelos canais abaixo.",
      email: "contato@emporiosantamaria.com.br",
      phone: "(11) 3706-5211",
    },
  },
];

export const sitePagesBySlug = Object.fromEntries(
  sitePages.map((page) => [page.slug, page]),
) as Record<string, SitePage>;

export const navigationItems = sitePages.filter((page) => page.navLabel);




