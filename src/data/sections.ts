import { Section, Procedure, Hotspot } from "@/types";

export const sections: Section[] = [
  {
    id: "sec-general",
    slug: "general",
    title: "General Information",
    titleRu: "Общая информация",
    description: "Идентификация автомобиля, технические характеристики, меры предосторожности.",
    icon: "Info",
    order: 1,
  },
  {
    id: "sec-engine",
    slug: "engine",
    title: "Engine 1.4 CR14DE",
    titleRu: "Двигатель 1.4 CR14DE",
    description: "Ремонт и обслуживание бензинового двигателя 1.4 л CR14DE.",
    icon: "Engine",
    order: 2,
    modelUrl: "/models/engine-cr14de.glb",
  },
  {
    id: "sec-transmission",
    slug: "transmission",
    title: "Transmission & Drivetrain",
    titleRu: "Трансмиссия и привод",
    description: "Механическая и автоматическая КПП, сцепление, приводные валы.",
    icon: "Cog",
    order: 3,
  },
  {
    id: "sec-chassis",
    slug: "chassis",
    title: "Chassis & Suspension",
    titleRu: "Ходовая часть",
    description: "Подвеска, рулевое управление, ступицы, амортизаторы.",
    icon: "Car",
    order: 4,
  },
  {
    id: "sec-brakes",
    slug: "brakes",
    title: "Brake System",
    titleRu: "Тормозная система",
    description: "Передние и задние тормоза, ABS, вакуумный усилитель.",
    icon: "Disc",
    order: 5,
  },
  {
    id: "sec-body",
    slug: "body",
    title: "Body & Interior",
    titleRu: "Кузов и салон",
    description: "Кузовные элементы, двери, стёкла, обшивка салона.",
    icon: "CarFront",
    order: 6,
  },
  {
    id: "sec-electrical",
    slug: "electrical",
    title: "Electrical System",
    titleRu: "Электрика",
    description: "Электрооборудование, проводка, датчики, блоки управления.",
    icon: "Zap",
    order: 7,
  },
  {
    id: "sec-maintenance",
    slug: "maintenance",
    title: "Maintenance",
    titleRu: "Техническое обслуживание",
    description: "Регламент ТО, замена масел, фильтров, свечей, жидкостей.",
    icon: "Wrench",
    order: 8,
  },
];

export const sampleProcedure: Procedure = {
  id: "proc-timing-belt",
  sectionId: "sec-engine",
  slug: "timing-belt-water-pump",
  title: "Timing Belt & Water Pump Replacement",
  titleRu: "Замена ремня ГРМ и водяного насоса",
  difficulty: "medium",
  estimatedTime: "3,5–4,5 ч",
  description:
    "Процедура замены ремня привода газораспределительного механизма и водяного насоса на двигателе CR14DE. Рекомендуемый интервал — 90 000 км или 6 лет.",
  tools: [
    "Набор головок 10–19 мм",
    "Динамометрический ключ 5–50 Н·м",
    "Специальный фиксатор коленвала (или приспособление)",
    "Съёмник шкива коленвала",
    "Отвёртки плоская и крестовая",
    "Съёмник стопорных колец",
    "Ёмкость для охлаждающей жидкости",
  ],
  torqueSpecs: [
    {
      id: "tq-1",
      part: "Болт шкива коленвала",
      value: "148 ± 15 Н·м",
      notes: "После затяжки довернуть на 60–65°",
    },
    {
      id: "tq-2",
      part: "Болты водяного насоса",
      value: "7 ± 1 Н·м",
    },
    {
      id: "tq-3",
      part: "Болты натяжного ролика",
      value: "28 ± 3 Н·м",
    },
    {
      id: "tq-4",
      part: "Болты крышки ГРМ (верхняя)",
      value: "7 ± 1 Н·м",
    },
  ],
  steps: [
    {
      id: "step-1",
      order: 1,
      title: "Подготовка",
      content:
        "Установите автомобиль на ровной площадке. Отсоедините отрицательную клемму аккумулятора. Слейте охлаждающую жидкость в чистую ёмкость. Снимите верхнюю декоративную крышку двигателя и воздушный фильтр в сборе.",
      warning: "Работайте только на остывшем двигателе.",
    },
    {
      id: "step-2",
      order: 2,
      title: "Снятие приводных ремней",
      content:
        "Ослабьте натяжение и снимите ремень генератора и ремень кондиционера. Зафиксируйте положение шкивов.",
    },
    {
      id: "step-3",
      order: 3,
      title: "Установка поршня 1-го цилиндра в ВМТ",
      content:
        "Поверните коленчатый вал по часовой стрелке до совмещения метки на шкиве коленвала с меткой на нижней крышке ГРМ. Проверьте совпадение меток на распределительных валах.",
      warning:
        "Никогда не проворачивайте коленвал против часовой стрелки при снятом ремне ГРМ.",
    },
    {
      id: "step-4",
      order: 4,
      title: "Снятие шкива коленвала и крышек ГРМ",
      content:
        "С помощью специального приспособления зафиксируйте коленвал и отверните болт шкива. Снимите шкив. Открутите болты верхней и нижней крышек ГРМ и снимите их.",
      torqueId: "tq-1",
    },
    {
      id: "step-5",
      order: 5,
      title: "Снятие старого ремня и водяного насоса",
      content:
        "Ослабьте натяжной ролик и снимите ремень ГРМ. Открутите болты водяного насоса и снимите его вместе с прокладкой. Очистите привалочную поверхность.",
    },
    {
      id: "step-6",
      order: 6,
      title: "Установка нового водяного насоса и ремня",
      content:
        "Установите новый водяной насос с новой прокладкой. Затяните болты требуемым моментом. Установите новый ремень ГРМ, соблюдая направление и метки. Натяните ремень согласно спецификации.",
      torqueId: "tq-2",
    },
    {
      id: "step-7",
      order: 7,
      title: "Сборка и проверка",
      content:
        "Установите крышки ГРМ, шкив коленвала, приводные ремни. Залейте охлаждающую жидкость. Подключите аккумулятор. Прокрутите двигатель вручную на 2 полных оборота и проверьте совпадение меток. Запустите двигатель и убедитесь в отсутствии посторонних шумов.",
    },
  ],
  images: [
    {
      id: "img-1",
      url: "https://i.ibb.co/example1.jpg",
      caption: "Метки ВМТ на шкиве коленвала",
      type: "photo",
      order: 1,
    },
    {
      id: "img-2",
      url: "https://i.ibb.co/example2.jpg",
      caption: "Метки на распределительных валах",
      type: "scheme",
      order: 2,
    },
  ],
  videos: [
    {
      id: "vid-1",
      youtubeId: "dQw4w9WgXcQ",
      title: "Общий обзор процедуры (пример)",
      order: 1,
    },
  ],
  relatedProcedures: [],
  checklist: [
    { id: "cl-1", text: "Метки ГРМ совпадают после двух оборотов коленвала", order: 1 },
    { id: "cl-2", text: "Нет подтеканий охлаждающей жидкости", order: 2 },
    { id: "cl-3", text: "Двигатель работает ровно, без посторонних шумов", order: 3 },
    { id: "cl-4", text: "Все болты затянуты требуемым моментом", order: 4 },
    { id: "cl-5", text: "Уровень ОЖ в норме после прогрева", order: 5 },
  ],
  modelUrl: "/models/engine-cr14de.glb",
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-11-10T14:30:00Z",
};

export const carHotspots: Hotspot[] = [
  {
    id: "hs-engine",
    label: "Двигатель CR14DE",
    sectionSlug: "engine",
    position: [0.3, 0.4, 1.2],
  },
  {
    id: "hs-front-suspension",
    label: "Передняя подвеска",
    sectionSlug: "chassis",
    position: [0.9, -0.3, 1.0],
  },
  {
    id: "hs-brakes",
    label: "Тормозная система",
    sectionSlug: "brakes",
    position: [0.95, -0.4, 0.9],
  },
  {
    id: "hs-transmission",
    label: "Трансмиссия",
    sectionSlug: "transmission",
    position: [0.1, -0.2, 0.6],
  },
];
